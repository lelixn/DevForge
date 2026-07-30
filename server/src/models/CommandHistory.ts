import mongoose, { Schema, Document } from 'mongoose';

export interface ICommandHistory extends Document {
  userId: mongoose.Types.ObjectId;
  command: string;
  actionType: string;
  timestamp: Date;
}

const CommandHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    command: {
      type: String,
      required: true,
    },
    actionType: {
      type: String,
      default: 'launcher',
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

export const CommandHistory = mongoose.model<ICommandHistory>(
  'CommandHistory',
  CommandHistorySchema
);
