import mongoose, { Schema, Document } from 'mongoose';

export interface IRecentSearch extends Document {
  userId: mongoose.Types.ObjectId;
  query: string;
  engine: string;
  timestamp: Date;
}

const RecentSearchSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
    engine: {
      type: String,
      default: 'google',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const RecentSearch = mongoose.model<IRecentSearch>(
  'RecentSearch',
  RecentSearchSchema
);
