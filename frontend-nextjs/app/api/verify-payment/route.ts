import { NextRequest, NextResponse } from 'next/server';
import { createWorker, Worker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';

/**
 * Force Node.js runtime (not Edge) — Tesseract needs Node APIs + WASM.
 * maxDuration tells Vercel to allow up to 60 s for this function.
 * (Requires Vercel Pro plan; Hobby is capped at 10 s)
 */
export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Resolve the langPath for Tesseract at runtime.
 *
 * Strategy (most-reliable → least-reliable):
 *  1. Copy eng.traineddata from the bundled project files to /tmp (writable
 *     on Vercel) and point Tesseract there.  This avoids any network call and
 *     is fast on every invocation after the first copy.
 *  2. Fall back to the projectnaptha CDN if the bundled file is not found
 *     (keeps the function working in other environments like Railway / Render).
 */
function resolveLangPath(): string {
  const CDN = 'https://tessdata.projectnaptha.com/4.0.0';
  try {
    const src = path.join(process.cwd(), 'eng.traineddata');
    if (!fs.existsSync(src)) return CDN;
    const dst = '/tmp/eng.traineddata';
    // Copy once per cold start; reuse on warm invocations.
    if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
    }
    return '/tmp';
  } catch {
    // /tmp may not be writable in some environments — fall back to CDN.
    return CDN;
  }
}

/** The exact account holder name that must appear in the payment screenshot. */
const REQUIRED_ACCOUNT_NAME = 'RAJAGOPAL RAMARAO';

// ── Cached Tesseract worker ─────────────────────────────────────────────────
// Re-use a single worker across warm Vercel invocations to avoid the ~2-4 s
// WASM/model-load overhead on every request.
let cachedWorker: Worker | null = null;
let workerInitPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (cachedWorker) return cachedWorker;
  // Deduplicate concurrent cold-start calls
  if (!workerInitPromise) {
    workerInitPromise = (async () => {
      const langPath = resolveLangPath();
      const w = await createWorker('eng', 1, {
        langPath,
        // cachePath keeps model files in /tmp so they survive warm-container
        // reuse on Vercel without being re-copied from the bundle each time.
        cachePath: '/tmp',
        logger: () => {},
        errorHandler: () => {},
      });
      cachedWorker = w;
      return w;
    })().catch((err) => {
      // Reset so the next request retries initialisation
      workerInitPromise = null;
      throw err;
    });
  }
  return workerInitPromise;
}
// ────────────────────────────────────────────────────────────────────────────


/** Candidate pattern: alphanumeric runs of 8–30 chars that commonly appear as
 *  Transaction IDs / UTR numbers / reference numbers in Indian payment screenshots. */
const TX_PATTERN = /[A-Z0-9]{8,30}/gi;

/**
 * Known label keywords that appear *before* a transaction ID in payment UIs.
 * We extract the first large alphanumeric token after each label.
 */
const LABEL_REGEXES = [
  /transaction\s*id[:\s#]*([\w\-]{6,30})/i,
  /utr\s*(no|number|#)?[:\s]*([\w\-]{6,30})/i,
  /reference\s*(id|no|number)?[:\s#]*([\w\-]{6,30})/i,
  /ref\s*(id|no|number)?[:\s#]*([\w\-]{6,30})/i,
  /order\s*(id|no)?[:\s#]*([\w\-]{6,30})/i,
  /txn\s*(id|no)?[:\s#]*([\w\-]{6,30})/i,
  /payment\s*(ref|reference)[:\s#]*([\w\-]{6,30})/i,
];

/**
 * Given raw OCR text, return an array of candidate transaction IDs, ranked
 * with label-adjacent matches first.
 */
function extractCandidates(text: string): string[] {
  const seen = new Set<string>();
  const results: string[] = [];

  const add = (v: string) => {
    const n = v.toUpperCase().trim();
    if (n && !seen.has(n)) { seen.add(n); results.push(n); }
  };

  // Priority 1 — value immediately following a known label
  for (const re of LABEL_REGEXES) {
    const m = re.exec(text);
    if (m) {
      add(m[m.length - 1]);
    }
  }

  // Priority 2 — all alphanumeric tokens ≥ 8 chars that look like IDs
  const allMatches = text.matchAll(TX_PATTERN);
  for (const m of allMatches) add(m[0]);

  return results;
}

/**
 * Check whether the required account holder name appears in the OCR text.
 * Normalises whitespace and does a case-insensitive check to tolerate minor
 * OCR artefacts (extra spaces, line breaks between words, etc.).
 */
function checkAccountName(text: string): boolean {
  const normalised = text.replace(/\s+/g, ' ').toUpperCase();
  // Exact match after normalisation
  if (normalised.includes(REQUIRED_ACCOUNT_NAME)) return true;
  // Fuzzy: allow each word to appear anywhere (handles line-split OCR output)
  const parts = REQUIRED_ACCOUNT_NAME.split(' ');
  return parts.every((p) => normalised.includes(p));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, transactionId } = body as {
      imageBase64?: string;
      transactionId?: string;
    };

    if (!imageBase64 || !transactionId) {
      return NextResponse.json(
        { success: false, message: 'imageBase64 and transactionId are required' },
        { status: 400 }
      );
    }

    // Strip the data-URL header if present (data:image/png;base64,<data>)
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/i, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Run OCR
    // Use the cached worker (warm invocations skip the ~2-4 s WASM init).
    // resolveLangPath() copies eng.traineddata from the bundled project file
    // to /tmp on the first cold start, then reuses the /tmp copy on subsequent
    // warm invocations — no network round-trip needed on Vercel.
    let worker: Worker;
    try {
      worker = await getWorker();
    } catch {
      // If worker init itself fails, reset so next request retries fresh
      cachedWorker = null;
      workerInitPromise = null;
      return NextResponse.json(
        { success: false, message: 'OCR engine failed to initialise. Please try again.' },
        { status: 500 }
      );
    }

    const { data: { text } } = await worker.recognize(imageBuffer);
    // Do NOT terminate — keep the worker alive for reuse across warm invocations.

    // ── Account name check ──────────────────────────────────────────────────
    const accountNameFound = checkAccountName(text);

    if (!accountNameFound) {
      return NextResponse.json({
        success: true,
        verified: false,
        accountNameMissing: true,
        message: `The account holder name "RAJAGOPAL RAMARAO" was not detected in your screenshot. Please upload a screenshot from the correct UPI account.`,
        candidates: [],
        ocrText: text,
      });
    }

    // ── Transaction ID check ────────────────────────────────────────────────
    // '__PREFLIGHT__' is a sentinel value sent when the screenshot is uploaded
    // before the user has finished typing the Transaction ID. In this case we
    // skip the ID match and just confirm the account name is correct so the
    // Tesseract worker is already warm when the real verification runs.
    const candidates = extractCandidates(text);
    const normalise = (s: string) => s.toUpperCase().trim();
    const entered = normalise(transactionId!);

    if (entered === '__PREFLIGHT__') {
      return NextResponse.json({
        success: true,
        verified: false,
        preflight: true,
        accountNameFound: true,
        accountNameMissing: false,
        candidates,
        ocrText: text,
        message: 'Account holder name verified. Enter your Transaction ID to complete verification.',
      });
    }

    const matched = candidates.some((c) => normalise(c) === entered);

    return NextResponse.json({
      success: true,
      verified: matched,
      accountNameFound: true,
      accountNameMissing: false,
      candidates,
      ocrText: text,
      message: matched
        ? 'Transaction ID matches the screenshot.'
        : 'Transaction ID does not match what was found in the screenshot. Please double-check.',
    });
  } catch (error) {
    // If the error came from worker.recognize(), invalidate the cached worker
    // so the next request gets a fresh one instead of a broken instance.
    cachedWorker = null;
    workerInitPromise = null;
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
