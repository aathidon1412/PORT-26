import { NextRequest, NextResponse } from 'next/server';
import { PromptToProductRegistration } from '@/models/Registration';
import {
  checkDay1Duplicate,
  checkTransactionIdGlobalUnique,
  saveRegistration,
} from '@/lib/registrationUtils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    if (!email || !phone) {
      return NextResponse.json({ message: 'Email and phone are required' }, { status: 400 });
    }
    const result = await checkDay1Duplicate(email, phone);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: 'Failed to check registration' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.transactionId || !body.paymentScreenshot) {
      return NextResponse.json(
        { message: 'Transaction ID and payment screenshot are required', success: false },
        { status: 400 }
      );
    }

    // Block if already registered for any Day 1 workshop
    const day1Check = await checkDay1Duplicate(body.email, body.contactNumber);
    if (day1Check.isDuplicate) {
      return NextResponse.json(day1Check, { status: 409 });
    }

    // Block if transaction ID already used anywhere
    const txnCheck = await checkTransactionIdGlobalUnique(body.transactionId);
    if (txnCheck.isDuplicate) {
      return NextResponse.json(txnCheck, { status: 409 });
    }

    const result = await saveRegistration({ ...body, paymentMode: 'UPI' }, PromptToProductRegistration);
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Failed to register', success: false }, { status: 500 });
  }
}
