import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

/**
 * Force Node.js runtime (not Edge) — Tesseract needs Node APIs + WASM.
 * maxDuration tells Vercel to allow up to 60 s for this function.
 * (Requires Vercel Pro plan; Hobby is capped at 10 s)
 */
export const runtime = 'nodejs';
export const maxDuration = 60;

/** The exact account holder name that must appear in the payment screenshot. */
const REQUIRED_ACCOUNT_NAME = 'RAJAGOPAL RAMARAO';

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
    // ⚠️  On Vercel the filesystem is read-only and the default local path for
    // traineddata does not exist.  Pointing langPath at the projectnaptha CDN
    // makes Tesseract fetch the data over HTTPS instead, which works in every
    // serverless environment including Vercel and Railway.
    const worker = await createWorker('eng', 1, {
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      logger: () => {},
      errorHandler: () => {},
    });

    const { data: { text } } = await worker.recognize(imageBuffer);
    await worker.terminate();

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
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
