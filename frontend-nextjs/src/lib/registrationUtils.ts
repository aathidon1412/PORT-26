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

const WORKSHOP_MODEL_NAMES = new Set([
  'HackproofingRegistration',
  'PromptToProductRegistration',
  'FullStackFusionRegistration',
  'LearnHowToThinkRegistration',
]);

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
  let reserved = false;
  let seatKey: string | undefined;
  try {
    await connectToDatabase();
    // Enforce seat limit for workshop models (atomic reserve using a counter collection)
    const isWorkshop = WORKSHOP_MODEL_NAMES.has(model.modelName);
    seatKey = model.modelName; // use model name as key for seat counter
    const seatCollection = (await import('mongoose')).default.connection.collection('seat_counters');

    if (isWorkshop) {
      // try to atomically increment reserved if below capacity (120)
      const res = await seatCollection.findOneAndUpdate(
        { key: seatKey, $or: [{ reserved: { $lt: 120 } }, { reserved: { $exists: false } }] },
        { $inc: { reserved: 1 }, $setOnInsert: { key: seatKey, capacity: 120, reserved: 0 } },
        { upsert: true, returnDocument: 'after' }
      );

      if (!res || !res.value) {
        return { success: false, message: 'Workshop registration closed. Seats are full.' };
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

    // If we reserved a seat but saving failed, release the seat (best-effort)
    try {
      if (reserved && seatKey) {
        const mongoose = (await import('mongoose')).default;
        const seatCollection = mongoose.connection.collection('seat_counters');
        await seatCollection.updateOne({ key: seatKey }, { $inc: { reserved: -1 } });
      }
    } catch (e) {
      // ignore release errors
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
      return {
        success: false,
        message: `This ${field} is already registered for this event`,
        error: field,
      };
    }

    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
}

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
