import { NextRequest, NextResponse } from 'next/server';
import {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
} from '@/models/Registration';
import { checkDuplicateRegistration, saveRegistration, getRegistrationCount, checkTransactionIdGlobalUnique } from '@/lib/registrationUtils';

// Accept both canonical slugs and legacy ids
const SLUG_MAP: Record<string, any> = {
  'hackproofing': HackproofingRegistration,
  'prompt-to-product': PromptToProductRegistration,
  'full-stack-fusion': FullStackFusionRegistration,
  'learn-how-to-think': LearnHowToThinkRegistration,
  // legacy ids used in some components
  'ws-1': HackproofingRegistration,
  'ws-2': PromptToProductRegistration,
  'ws-3': FullStackFusionRegistration,
  'ws-4': LearnHowToThinkRegistration,
};

function resolveModel(slug: string) {
  return SLUG_MAP[slug];
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const model = resolveModel(slug);
    if (!model) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const searchParams = request.nextUrl.searchParams;

    if (searchParams.get('count') === 'true') {
      const cnt = await getRegistrationCount(model);
      return NextResponse.json(cnt);
    }

    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    if (!email || !phone) {
      return NextResponse.json({ message: 'Email and phone are required' }, { status: 400 });
    }

    const result = await checkDuplicateRegistration(email, phone, model);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to handle GET /api/workshops/[slug]', error);
    return NextResponse.json({ message: 'Failed to check registration' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const model = resolveModel(slug);
    if (!model) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const body = await request.json();
    const allowedModes = ['Cash', 'Online'];
    const paymentMode = body.paymentMode;
    if (!paymentMode || !allowedModes.includes(paymentMode)) {
      return NextResponse.json({ message: 'Invalid or missing paymentMode', success: false }, { status: 400 });
    }

    // If Online, transaction fields are required. If Cash, skip them.
    if (paymentMode === 'Online') {
      if (!body.transactionId || !body.paymentScreenshot) {
        return NextResponse.json(
          { message: 'Transaction ID and payment screenshot are required for Online payments', success: false },
          { status: 400 }
        );
      }
    } else {
      // Remove any supplied transaction fields to avoid storing empty values
      delete body.transactionId;
      delete body.paymentScreenshot;
    }

    const duplicateCheck = await checkDuplicateRegistration(body.email, body.contactNumber, model);
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(duplicateCheck, { status: 409 });
    }
    // For Online, ensure transaction ID is globally unique
    if (paymentMode === 'Online') {
      const txnCheck = await checkTransactionIdGlobalUnique(body.transactionId);
      if (txnCheck.isDuplicate) return NextResponse.json(txnCheck, { status: 409 });
    }

    const payload = { ...body };
    // ensure paymentMode is saved exactly
    payload.paymentMode = paymentMode;

    const result = await saveRegistration(payload, model);
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Failed to register', success: false }, { status: 500 });
  }
}
