import connectToDatabase from '@/lib/mongodb';
import {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
  PortPassRegistration,
} from '@/models/Registration';

const ALL_COLLECTIONS = [
  { model: HackproofingRegistration,     eventName: 'Hackproofing the Future' },
  { model: PromptToProductRegistration,  eventName: 'Prompt to Product' },
  { model: FullStackFusionRegistration,  eventName: 'Full Stack Fusion' },
  { model: LearnHowToThinkRegistration,  eventName: 'Learn How to Think' },
  { model: PortPassRegistration,         eventName: 'Port Pass' },
];

export async function checkDuplicateRegistration(
  email: string,
  contactNumber: string,
  model: any
) {
  try {
    await connectToDatabase();

    // Check across ALL collections so user knows which event they already registered for
    for (const { model: m, eventName } of ALL_COLLECTIONS) {
      const existing = await m.findOne({
        $or: [{ email }, { contactNumber }],
      });

      if (existing) {
        const duplicateField = existing.email === email ? 'email' : 'contactNumber';
        const fieldLabel = duplicateField === 'email' ? 'Email' : 'Contact number';
        return {
          isDuplicate: true,
          field: duplicateField,
          message: `${fieldLabel} is already registered for "${eventName}". Please contact support if this is an error.`,
        };
      }
    }

    return { isDuplicate: false };
  } catch (error) {
    console.error('Error checking duplicate:', error);
    throw error;
  }
}

export async function saveRegistration(data: any, model: any) {
  try {
    await connectToDatabase();

    const registration = new model(data);
    await registration.save();

    return {
      success: true,
      data: registration,
      message: 'Registration successful',
    };
  } catch (error: any) {
    console.error('Error saving registration:', error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return {
        success: false,
        message: `\ already registered for this event`,
        error: field,
      };
    }

    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
}
