import mongoose, { Schema, Document } from 'mongoose';

export interface IFocusStat extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  focusMinutes: number;
  sessionsCompleted: number;
  streak: number;
}

const FocusStatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
    },
    focusMinutes: {
      type: Number,
      default: 0,
    },
    sessionsCompleted: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

FocusStatSchema.index({ userId: 1, date: 1 }, { unique: true });

export const FocusStat = mongoose.model<IFocusStat>('FocusStat', FocusStatSchema);
