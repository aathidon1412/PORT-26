import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

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
      // capture group index: some have 2 groups (label word + value), some 1
      add(m[m.length - 1]);
    }
  }

  // Priority 2 — all alphanumeric tokens ≥ 8 chars that look like IDs
  const allMatches = text.matchAll(TX_PATTERN);
  for (const m of allMatches) add(m[0]);

  return results;
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
    const worker = await createWorker('eng', 1, {
      // Suppress verbose logging
      logger: () => {},
      errorHandler: () => {},
    });

    const { data: { text } } = await worker.recognize(imageBuffer);
    await worker.terminate();

    const candidates = extractCandidates(text);
    const normalise = (s: string) => s.toUpperCase().trim();
    const entered = normalise(transactionId);

    const matched = candidates.some((c) => normalise(c) === entered);

    return NextResponse.json({
      success: true,
      verified: matched,
      candidates, // useful for debugging / UI hints
      ocrText: text,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
