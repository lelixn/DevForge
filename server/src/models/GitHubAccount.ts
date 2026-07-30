import mongoose, { Schema, Document } from 'mongoose';

export interface IGitHubAccount extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  accessToken?: string;
  pinnedRepos: string[];
  updatedAt: Date;
}

const GitHubAccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    accessToken: {
      type: String,
      default: '',
    },
    pinnedRepos: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const GitHubAccount = mongoose.model<IGitHubAccount>(
  'GitHubAccount',
  GitHubAccountSchema
);
