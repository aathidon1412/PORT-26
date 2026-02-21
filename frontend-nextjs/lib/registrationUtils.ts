import connectToDatabase from '@/lib/mongodb';
import {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
  PortPassRegistration,
} from '@/models/Registration';

// Named collections for readable error messages and seat management
const WORKSHOP_COLLECTIONS = [
  { model: HackproofingRegistration, eventName: 'Hackproofing the Future' },
  { model: PromptToProductRegistration, eventName: 'Prompt to Product' },
  { model: FullStackFusionRegistration, eventName: 'Full Stack Fusion' },
  { model: LearnHowToThinkRegistration, eventName: 'Learn How to Think' },
];

const ALL_COLLECTIONS = [
  ...WORKSHOP_COLLECTIONS,
  { model: PortPassRegistration, eventName: 'Port Pass' },
];

// Flat model arrays for iteration
const DAY1_MODELS = WORKSHOP_COLLECTIONS.map(c => c.model);
const ALL_MODELS = ALL_COLLECTIONS.map(c => c.model);

/**
 * Check if email or phone is already registered in a SINGLE collection.
 * Used for port-pass (Day 2) — same email/phone is allowed if only in Day 1.
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

    for (const { model, eventName } of WORKSHOP_COLLECTIONS) {
      const existing = await model.findOne({
        $or: [{ email }, { contactNumber }],
      });

      if (existing) {
        const duplicateField =
          existing.email === email ? 'email' : 'phone number';
        const fieldLabel = duplicateField === 'email' ? 'Email' : 'Phone number';
        return {
          isDuplicate: true,
          field: duplicateField,
          message: `${fieldLabel} is already registered for "${eventName}". Only one Day 1 workshop per person is allowed.`,
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
 * Transaction IDs must be globally unique across all events.
 */
export async function checkTransactionIdGlobalUnique(transactionId: string) {
  try {
    await connectToDatabase();

    for (const { model, eventName } of ALL_COLLECTIONS) {
      const existing = await model.findOne({ transactionId });
      if (existing) {
        return {
          isDuplicate: true,
          field: 'transactionId',
          message: `This transaction ID is already used for "${eventName}". Each transaction ID can only be used once.`,
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
 * For workshops, enforces a seat limit of 120 via an atomic seat_counters collection.
 */
export async function saveRegistration(data: any, model: any) {
  let reserved = false;
  let seatKey: string | undefined;

  try {
    await connectToDatabase();

    // Enforce seat limit for workshop models
    const workshopEntry = WORKSHOP_COLLECTIONS.find(c => c.model === model);
    if (workshopEntry) {
      seatKey = model.modelName || model.collectionName || model.name;
      const mongoose = (await import('mongoose')).default;
      const seatCollection = mongoose.connection.collection('seat_counters');

      const res = await seatCollection.findOneAndUpdate(
        { key: seatKey, $or: [{ reserved: { $lt: 120 } }, { reserved: { $exists: false } }] },
        { $inc: { reserved: 1 }, $setOnInsert: { key: seatKey, capacity: 120, reserved: 0 } },
        { upsert: true, returnDocument: 'after' }
      );

      if (!res || !res.value) {
        return { success: false, message: `"${workshopEntry.eventName}" is fully booked. No seats remaining.` };
      }

      reserved = true;
    }

    const registration = new model(data);
    await registration.save();

    return {
      success: true,
      data: registration,
      message: 'Registration successful',
    };
  } catch (error: any) {
    console.error('Error saving registration:', error);

    // Best-effort seat release if save failed
    try {
      if (reserved && seatKey) {
        const mongoose = (await import('mongoose')).default;
        const seatCollection = mongoose.connection.collection('seat_counters');
        await seatCollection.updateOne({ key: seatKey }, { $inc: { reserved: -1 } });
      }
    } catch { /* ignore */ }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
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

/**
 * Get the current registration count for a given model collection.
 */
export async function getRegistrationCount(model: any) {
  try {
    await connectToDatabase();
    const count = await model.countDocuments();
    return { success: true, count };
  } catch (error) {
    console.error('Error getting registration count:', error);
    return { success: false, message: 'Failed to get count' };
  }
}
