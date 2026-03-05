import { NextRequest, NextResponse } from 'next/server';
import { PromptToProductRegistration } from '@/models/Registration';
import { checkDuplicateRegistration, saveRegistration, checkTransactionIdGlobalUnique } from '@/lib/registrationUtils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    if (!email || !phone) {
      return NextResponse.json({ message: 'Email and phone are required' }, { status: 400 });
    }
    const result = await checkDuplicateRegistration(email, phone, PromptToProductRegistration);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: 'Failed to check registration' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const allowedModes = ['Cash', 'Online'];
    const paymentMode = body.paymentMode;
    if (!paymentMode || !allowedModes.includes(paymentMode)) {
      return NextResponse.json({ message: 'Invalid or missing paymentMode', success: false }, { status: 400 });
    }
    if (paymentMode === 'Online') {
      if (!body.transactionId || !body.paymentScreenshot) {
        return NextResponse.json(
          { message: 'Transaction ID and payment screenshot are required for Online payments', success: false },
          { status: 400 }
        );
      }
    } else {
      delete body.transactionId;
      delete body.paymentScreenshot;
    }
    const duplicateCheck = await checkDuplicateRegistration(body.email, body.contactNumber, PromptToProductRegistration);
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(duplicateCheck, { status: 409 });
    }
    if (paymentMode === 'Online') {
      const txnCheck = await checkTransactionIdGlobalUnique(body.transactionId);
      if (txnCheck.isDuplicate) return NextResponse.json(txnCheck, { status: 409 });
    }

    const payload = { ...body, paymentMode };
    const result = await saveRegistration(payload, PromptToProductRegistration);
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Failed to register', success: false }, { status: 500 });
  }
}
