import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    teamSlug: { type: String, required: true, lowercase: true, trim: true },
    weeklyPoints: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);