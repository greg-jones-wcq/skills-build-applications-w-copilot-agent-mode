import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    loggedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);