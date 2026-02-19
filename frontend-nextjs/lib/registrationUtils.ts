import connectToDatabase from '@/lib/mongodb';
import {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
  PortPassRegistration,
} from '@/models/Registration';

const WORKSHOP_COLLECTIONS = [
  { model: HackproofingRegistration,     eventName: 'Hackproofing the Future' },
  { model: PromptToProductRegistration,  eventName: 'Prompt to Product' },
  { model: FullStackFusionRegistration,  eventName: 'Full Stack Fusion' },
  { model: LearnHowToThinkRegistration,  eventName: 'Learn How to Think' },
];

const ALL_COLLECTIONS = [
  ...WORKSHOP_COLLECTIONS,
  { model: PortPassRegistration,         eventName: 'Port Pass' },
];

export async function checkDuplicateRegistration(
  email: string,
  contactNumber: string,
  model: any
) {
  try {
    await connectToDatabase();

    // Determine if this is a workshop or PortPass registration
    const isWorkshopRegistration = WORKSHOP_COLLECTIONS.some(c => c.model === model);
    
    if (isWorkshopRegistration) {
      // For workshops: Check only OTHER workshop collections (not the current one, not PortPass)
      for (const { model: m, eventName } of WORKSHOP_COLLECTIONS) {
        if (m === model) continue; // Skip the current workshop
        
        const existing = await m.findOne({
          $or: [{ email }, { contactNumber }],
        });

        if (existing) {
          const duplicateField = existing.email === email ? 'email' : 'contactNumber';
          const fieldLabel = duplicateField === 'email' ? 'Email' : 'Contact number';
          return {
            isDuplicate: true,
            field: duplicateField,
            message: `${fieldLabel} is already registered for "${eventName}". You can only register for one workshop.`,
          };
        }
      }
    } else {
      // For PortPass: Only check within PortPass collection
      const existing = await PortPassRegistration.findOne({
        $or: [{ email }, { contactNumber }],
      });

      if (existing) {
        const duplicateField = existing.email === email ? 'email' : 'contactNumber';
        const fieldLabel = duplicateField === 'email' ? 'Email' : 'Contact number';
        return {
          isDuplicate: true,
          field: duplicateField,
          message: `${fieldLabel} is already registered for "Port Pass". Please contact support if this is an error.`,
        };
      }
    }

    return { isDuplicate: false };
  } catch (error) {
    console.error('Error checking duplicate:', error);
    throw error;
  }
}

/**
 * Check if a transaction ID already exists in ANY of the 5 collections
 * Transaction ID must be strictly unique across all collections
 */
export async function checkTransactionIdAcrossAllCollections(
  transactionId: string
): Promise<{ isUsed: boolean; eventName?: string }> {
  try {
    await connectToDatabase();

    for (const { model, eventName } of ALL_COLLECTIONS) {
      const existing = await model.findOne({ transactionId });
      if (existing) {
        return { isUsed: true, eventName };
      }
    }

    return { isUsed: false };
  } catch (error) {
    console.error('Error checking transaction ID:', error);
    throw error;
  }
}

export async function saveRegistration(data: any, model: any) {
  try {
    await connectToDatabase();

    // Check if transaction ID already exists across ALL collections
    const transactionCheck = await checkTransactionIdAcrossAllCollections(data.transactionId);
    if (transactionCheck.isUsed) {
      return {
        success: false,
        message: `Transaction ID is already used for "${transactionCheck.eventName}". Each transaction ID can only be used once.`,
        error: 'transactionId',
      };
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

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      let message = `${field} already registered for this event`;
      
      // Provide more specific error messages
      if (field === 'email') {
        message = 'Email is already registered for this event';
      } else if (field === 'contactNumber') {
        message = 'Contact number is already registered for this event';
      } else if (field === 'transactionId') {
        message = 'Transaction ID is already used. Each transaction ID can only be used once.';
      }
      
      return {
        success: false,
        message,
        error: field,
      };
    }

    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
}
