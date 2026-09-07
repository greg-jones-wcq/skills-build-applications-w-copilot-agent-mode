import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    coachEmail: { type: String, required: true, lowercase: true, trim: true },
    memberEmails: [{ type: String, lowercase: true, trim: true }],
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);