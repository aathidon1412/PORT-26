import { NextRequest, NextResponse } from 'next/server';
import {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
} from '@/models/Registration';
import { checkDuplicateRegistration, saveRegistration, getRegistrationCount } from '@/lib/registrationUtils';

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
    if (!body.transactionId || !body.paymentScreenshot) {
      return NextResponse.json(
        { message: 'Transaction ID and payment screenshot are required', success: false },
        { status: 400 }
      );
    }

    const duplicateCheck = await checkDuplicateRegistration(body.email, body.contactNumber, model);
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(duplicateCheck, { status: 409 });
    }

    const result = await saveRegistration({ ...body, paymentMode: 'UPI' }, model);
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Failed to register', success: false }, { status: 500 });
  }
}
