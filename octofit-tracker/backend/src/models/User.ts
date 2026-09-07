import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
    profile: {
      age: { type: Number, required: true },
      location: { type: String, required: true },
      fitnessGoal: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);