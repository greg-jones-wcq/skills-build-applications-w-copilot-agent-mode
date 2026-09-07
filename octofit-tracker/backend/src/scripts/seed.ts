import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        name: 'Mona Patel',
        email: 'mona.patel@example.com',
        passwordHash: 'sample-hash-mona',
        role: 'athlete',
        profile: { age: 31, location: 'Seattle, WA', fitnessGoal: 'Improve 10K pace' },
      },
      {
        name: 'Diego Ramos',
        email: 'diego.ramos@example.com',
        passwordHash: 'sample-hash-diego',
        role: 'coach',
        profile: { age: 38, location: 'Austin, TX', fitnessGoal: 'Coach balanced strength plans' },
      },
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        passwordHash: 'sample-hash-avery',
        role: 'athlete',
        profile: { age: 27, location: 'Portland, OR', fitnessGoal: 'Build cycling endurance' },
      },
    ]);

    await Team.insertMany([
      {
        name: 'Octo Striders',
        slug: 'octo-striders',
        description: 'A running-focused group training for faster race splits.',
        coachEmail: 'diego.ramos@example.com',
        memberEmails: ['mona.patel@example.com', 'avery.chen@example.com'],
      },
      {
        name: 'Core Builders',
        slug: 'core-builders',
        description: 'Strength and mobility sessions for all-around fitness.',
        coachEmail: 'diego.ramos@example.com',
        memberEmails: ['diego.ramos@example.com', 'mona.patel@example.com'],
      },
    ]);

    await Activity.insertMany([
      {
        userEmail: 'mona.patel@example.com',
        type: 'Run',
        durationMinutes: 42,
        distanceMiles: 4.8,
        caloriesBurned: 430,
        loggedAt: new Date('2026-09-02T13:30:00.000Z'),
      },
      {
        userEmail: 'avery.chen@example.com',
        type: 'Cycling',
        durationMinutes: 75,
        distanceMiles: 18.4,
        caloriesBurned: 610,
        loggedAt: new Date('2026-09-03T22:15:00.000Z'),
      },
      {
        userEmail: 'diego.ramos@example.com',
        type: 'Strength Training',
        durationMinutes: 50,
        caloriesBurned: 380,
        loggedAt: new Date('2026-09-04T12:00:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userEmail: 'avery.chen@example.com',
        displayName: 'Avery Chen',
        teamSlug: 'octo-striders',
        weeklyPoints: 1280,
        rank: 1,
      },
      {
        userEmail: 'mona.patel@example.com',
        displayName: 'Mona Patel',
        teamSlug: 'octo-striders',
        weeklyPoints: 1165,
        rank: 2,
      },
      {
        userEmail: 'diego.ramos@example.com',
        displayName: 'Diego Ramos',
        teamSlug: 'core-builders',
        weeklyPoints: 990,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Builder Run',
        focus: 'Speed endurance',
        level: 'intermediate',
        durationMinutes: 45,
        exercises: ['10-minute warmup jog', '4 x 6-minute tempo intervals', '5-minute cooldown'],
        recommendedForGoals: ['Improve 10K pace', 'Build aerobic capacity'],
      },
      {
        title: 'Balanced Strength Circuit',
        focus: 'Full-body strength',
        level: 'beginner',
        durationMinutes: 35,
        exercises: ['Goblet squats', 'Pushups', 'Dumbbell rows', 'Plank holds'],
        recommendedForGoals: ['Build functional strength', 'Coach balanced strength plans'],
      },
      {
        title: 'Endurance Ride Progression',
        focus: 'Cycling stamina',
        level: 'advanced',
        durationMinutes: 90,
        exercises: ['Zone 2 ride', 'Hill cadence repeats', 'Progressive final 20 minutes'],
        recommendedForGoals: ['Build cycling endurance', 'Improve sustained power'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
