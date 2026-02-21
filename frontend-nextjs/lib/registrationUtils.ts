import connectToDatabase from '@/lib/mongodb';
import {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
  PortPassRegistration,
} from '@/models/Registration';

// All Day 1 workshop models
const DAY1_MODELS = [
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
];

// All models (Day 1 + Day 2)
const ALL_MODELS = [...DAY1_MODELS, PortPassRegistration];

/**
 * Check if email or phone is already registered in a SINGLE collection.
 * Used for port-pass (Day 2) — same email/phone allowed if only in Day 1.
 */
export async function checkDuplicateRegistration(
  email: string,
  contactNumber: string,
  model: any
) {
  try {
    await connectToDatabase();

    const existing = await model.findOne({
      $or: [{ email }, { contactNumber }],
    });

    if (existing) {
      const duplicateField =
        existing.email === email ? 'email' : 'phone number';
      return {
        isDuplicate: true,
        field: duplicateField,
        message: `This ${duplicateField} is already registered for this event.`,
      };
    }

    return { isDuplicate: false };
  } catch (error) {
    console.error('Error checking duplicate:', error);
    throw error;
  }
}

/**
 * Check if email or phone already exists in ANY Day 1 workshop collection.
 * A person can only attend one Day 1 workshop.
 */
export async function checkDay1Duplicate(
  email: string,
  contactNumber: string
) {
  try {
    await connectToDatabase();

    for (const model of DAY1_MODELS) {
      const existing = await model.findOne({
        $or: [{ email }, { contactNumber }],
      });

      if (existing) {
        const duplicateField =
          existing.email === email ? 'email' : 'phone number';
        return {
          isDuplicate: true,
          field: duplicateField,
          message: `This ${duplicateField} is already registered for a Day 1 workshop. Only one workshop per person is allowed.`,
        };
      }
    }

    return { isDuplicate: false };
  } catch (error) {
    console.error('Error checking Day 1 duplicate:', error);
    throw error;
  }
}

/**
 * Check if a transaction ID is already used in ANY collection (all 5).
 * Transaction IDs must be globally unique.
 */
export async function checkTransactionIdGlobalUnique(transactionId: string) {
  try {
    await connectToDatabase();

    for (const model of ALL_MODELS) {
      const existing = await model.findOne({ transactionId });
      if (existing) {
        return {
          isDuplicate: true,
          field: 'transactionId',
          message: 'This transaction ID has already been used. Please check your transaction ID.',
        };
      }
    }

    return { isDuplicate: false };
  } catch (error) {
    console.error('Error checking transaction ID uniqueness:', error);
    throw error;
  }
}

/**
 * Save a registration to the database.
 */
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
      const friendlyField =
        field === 'email' ? 'email' :
          field === 'contactNumber' ? 'phone number' :
            field === 'transactionId' ? 'transaction ID' : field;
      return {
        success: false,
        message: `This ${friendlyField} is already registered for this event.`,
        error: field,
      };
    }

    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
}
