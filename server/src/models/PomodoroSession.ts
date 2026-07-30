import mongoose, { Schema, Document } from 'mongoose';

export interface IPomodoroSession extends Document {
  userId: mongoose.Types.ObjectId;
  mode: 'focus' | 'short_break' | 'long_break';
  duration: number; // in seconds
  taskTitle?: string;
  completedAt: Date;
  ambientSound?: string;
  focusScore?: number;
}

const PomodoroSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    mode: {
      type: String,
      enum: ['focus', 'short_break', 'long_break'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    taskTitle: {
      type: String,
      default: '',
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    ambientSound: {
      type: String,
      default: 'none',
    },
    focusScore: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const PomodoroSession = mongoose.model<IPomodoroSession>(
  'PomodoroSession',
  PomodoroSessionSchema
);
