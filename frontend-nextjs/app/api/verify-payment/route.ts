import { NextRequest, NextResponse } from 'next/server';

/**
 * Payment verification API — text matching only.
 *
 * OCR is performed entirely in the browser (Tesseract.js Web Worker) before
 * this route is called, so there is no WASM/model overhead here.
 * The route receives the OCR text + transaction ID and does a fast string
 * match — well within Vercel Hobby's 10 s function limit.
 */
export const runtime = 'nodejs';
export const maxDuration = 10; // free-plan compatible — pure text matching
export const dynamic = 'force-dynamic';

/** The exact account holder name that must appear in the payment screenshot. */
const REQUIRED_ACCOUNT_NAME = 'RAJAGOPAL RAMARAO';

/** Candidate pattern: alphanumeric runs of 8–30 chars that commonly appear as
 *  Transaction IDs / UTR numbers / reference numbers in Indian payment screenshots. */
const TX_PATTERN = /[A-Z0-9]{8,30}/gi;

/** UTR number on PhonePe screenshots — typically 12 decimal digits. */
const PHONEPE_UTR_PATTERN = /(?:utr|utr\s*no\.?|utr\s*number)[:\s#]*([\d]{10,15})/i;

/** Detect whether the OCR text originated from a PhonePe screenshot. */
function isPhonePeScreenshot(text: string): boolean {
  return /phonepe|phone\s*pe/i.test(text);
}

/**
 * Known label keywords that appear *before* a transaction ID in payment UIs.
 * We extract the first large alphanumeric token after each label.
 */
const LABEL_REGEXES = [
  /transaction\s*id[:\s#]*([\w\-]{6,30})/i,
  /utr\s*(no\.?|number|#)?[:\s]*([\w\-]{6,30})/i,
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

  // Priority 0 — PhonePe UTR number: pull this out first so it ranks highest
  if (isPhonePeScreenshot(text)) {
    const utrMatch = PHONEPE_UTR_PATTERN.exec(text);
    if (utrMatch) add(utrMatch[1]);
  }

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
    // ocrText is the raw text extracted by Tesseract.js running in the browser.
    const body = await request.json();
    const { ocrText, transactionId } = body as {
      ocrText?: string;
      transactionId?: string;
    };

    if (!ocrText || !transactionId) {
      return NextResponse.json(
        { success: false, message: 'ocrText and transactionId are required' },
        { status: 400 }
      );
    }

    // ── Account name check ──────────────────────────────────────────────────
    const accountNameFound = checkAccountName(ocrText);

    if (!accountNameFound) {
      return NextResponse.json({
        success: true,
        verified: false,
        accountNameMissing: true,
        message: `The account holder name "RAJAGOPAL RAMARAO" was not detected in your screenshot. Please upload a screenshot from the correct UPI account.`,
        candidates: [],
      });
    }

    // ── Transaction ID check ────────────────────────────────────────────────
    // '__PREFLIGHT__' is a sentinel sent when the screenshot is uploaded before
    // the user has finished typing — confirms account name only.
    const candidates = extractCandidates(ocrText);
    const normalise = (s: string) => s.toUpperCase().trim();
    const entered = normalise(transactionId);

    const phonePe = isPhonePeScreenshot(ocrText);

    if (entered === '__PREFLIGHT__') {
      return NextResponse.json({
        success: true,
        verified: false,
        preflight: true,
        accountNameFound: true,
        accountNameMissing: false,
        isPhonePe: phonePe,
        candidates,
        message: phonePe
          ? 'PhonePe screenshot detected. Enter your UTR number as the Transaction ID.'
          : 'Account holder name verified. Enter your Transaction ID to complete verification.',
      });
    }

    const matched = candidates.some((c) => normalise(c) === entered);

    const idLabel = phonePe ? 'UTR number' : 'Transaction ID';

    return NextResponse.json({
      success: true,
      verified: matched,
      accountNameFound: true,
      accountNameMissing: false,
      isPhonePe: phonePe,
      candidates,
      message: matched
        ? `${idLabel} matches the screenshot.`
        : `${idLabel} does not match what was found in the screenshot. Please double-check.`,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
