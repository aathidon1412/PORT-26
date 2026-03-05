import mongoose from 'mongoose';

// Common registration schema fields
const registrationSchemaDefaults = {
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'Online'],
    default: 'Online',
    required: true,
  },
  transactionId: { type: String, trim: true, required: function(this: any) { return this.paymentMode === 'Online'; } },
  paymentScreenshot: { type: String, trim: true, required: function(this: any) { return this.paymentMode === 'Online'; } },
  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  yearOfStudy: {
    type: String,
    enum: ['1', '2', '3', '4'],
    required: true,
  },
  collegeRegisterNumber: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
};

// Hackproofing Registration Schema
const hackproofingSchema = new mongoose.Schema({
  ...registrationSchemaDefaults,
  workshopName: {
    type: String,
    default: 'Hackproofing the Future',
  },
});

// Add compound index to prevent duplicate registrations
hackproofingSchema.index({ email: 1, contactNumber: 1 }, { unique: true });

// Prompt to Product Registration Schema
const promptToProductSchema = new mongoose.Schema({
  ...registrationSchemaDefaults,
  workshopName: {
    type: String,
    default: 'Prompt to Product',
  },
});

promptToProductSchema.index({ email: 1, contactNumber: 1 }, { unique: true });

// Full Stack Fusion Registration Schema
const fullStackFusionSchema = new mongoose.Schema({
  ...registrationSchemaDefaults,
  workshopName: {
    type: String,
    default: 'Full Stack Fusion',
  },
});

fullStackFusionSchema.index({ email: 1, contactNumber: 1 }, { unique: true });

// Learn How to Think Registration Schema
const learnHowToThinkSchema = new mongoose.Schema({
  ...registrationSchemaDefaults,
  workshopName: {
    type: String,
    default: 'Learn How to Think',
  },
});

learnHowToThinkSchema.index({ email: 1, contactNumber: 1 }, { unique: true });

// Port Pass Registration Schema
const portPassSchema = new mongoose.Schema({
  ...registrationSchemaDefaults,
  eventType: {
    type: String,
    default: 'Port Pass',
  },
});

portPassSchema.index({ email: 1, contactNumber: 1 }, { unique: true });
// Partial unique indexes: only enforce uniqueness of transactionId for Online payments
hackproofingSchema.index({ transactionId: 1 }, { unique: true, partialFilterExpression: { paymentMode: 'Online' } });
promptToProductSchema.index({ transactionId: 1 }, { unique: true, partialFilterExpression: { paymentMode: 'Online' } });
fullStackFusionSchema.index({ transactionId: 1 }, { unique: true, partialFilterExpression: { paymentMode: 'Online' } });
learnHowToThinkSchema.index({ transactionId: 1 }, { unique: true, partialFilterExpression: { paymentMode: 'Online' } });
portPassSchema.index({ transactionId: 1 }, { unique: true, partialFilterExpression: { paymentMode: 'Online' } });

// Export models - check if already exists before creating
const HackproofingRegistration =
  mongoose.models.HackproofingRegistration ||
  mongoose.model('HackproofingRegistration', hackproofingSchema);

const PromptToProductRegistration =
  mongoose.models.PromptToProductRegistration ||
  mongoose.model('PromptToProductRegistration', promptToProductSchema);

const FullStackFusionRegistration =
  mongoose.models.FullStackFusionRegistration ||
  mongoose.model('FullStackFusionRegistration', fullStackFusionSchema);

const LearnHowToThinkRegistration =
  mongoose.models.LearnHowToThinkRegistration ||
  mongoose.model('LearnHowToThinkRegistration', learnHowToThinkSchema);

const PortPassRegistration =
  mongoose.models.PortPassRegistration ||
  mongoose.model('PortPassRegistration', portPassSchema);

export {
  HackproofingRegistration,
  PromptToProductRegistration,
  FullStackFusionRegistration,
  LearnHowToThinkRegistration,
  PortPassRegistration,
};
