import mongoose from 'mongoose';

// Common fields shared by all registration schemas.
// NOTE: email and contactNumber are NOT unique per-collection —
// uniqueness across Day 1 workshops is enforced at the application level
// (checkDay1Duplicate) to allow the same person to also register for
// Day 2 (port-pass) with the same email/phone.
// transactionId IS unique per-collection as a DB-level safety net
// (application also checks globally via checkTransactionIdGlobalUnique).
const commonFields = {
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, lowercase: true, trim: true, index: true,
  },
  contactNumber: { type: String, required: true, trim: true, index: true },
  gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true },
  paymentMode: { type: String, enum: ['UPI'], default: 'UPI', required: true },
  transactionId: { type: String, required: true, trim: true, unique: true },
  paymentScreenshot: { type: String, required: true, trim: true },
  collegeName: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  yearOfStudy: { type: String, enum: ['1', '2', '3', '4'], required: true },
  collegeRegisterNumber: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  registrationDate: { type: Date, default: Date.now },
};

const hackproofingSchema = new mongoose.Schema(
  { ...commonFields, workshopName: { type: String, default: 'Hackproofing the Future' } },
  { collection: 'hackproofingregistrations' }
);

const promptToProductSchema = new mongoose.Schema(
  { ...commonFields, workshopName: { type: String, default: 'Prompt to Product' } },
  { collection: 'prompttoproductregistrations' }
);

const fullStackFusionSchema = new mongoose.Schema(
  { ...commonFields, workshopName: { type: String, default: 'Full Stack Fusion' } },
  { collection: 'fullstackfusionregistrations' }
);

const learnHowToThinkSchema = new mongoose.Schema(
  { ...commonFields, workshopName: { type: String, default: 'Learn How to Think' } },
  { collection: 'learnhowtothinkregistrations' }
);

const portPassSchema = new mongoose.Schema(
  { ...commonFields, eventType: { type: String, default: 'Port Pass' } },
  { collection: 'portpassregistrations' }
);

export const HackproofingRegistration =
  mongoose.models.HackproofingRegistration ||
  mongoose.model('HackproofingRegistration', hackproofingSchema);

export const PromptToProductRegistration =
  mongoose.models.PromptToProductRegistration ||
  mongoose.model('PromptToProductRegistration', promptToProductSchema);

export const FullStackFusionRegistration =
  mongoose.models.FullStackFusionRegistration ||
  mongoose.model('FullStackFusionRegistration', fullStackFusionSchema);

export const LearnHowToThinkRegistration =
  mongoose.models.LearnHowToThinkRegistration ||
  mongoose.model('LearnHowToThinkRegistration', learnHowToThinkSchema);

export const PortPassRegistration =
  mongoose.models.PortPassRegistration ||
  mongoose.model('PortPassRegistration', portPassSchema);
