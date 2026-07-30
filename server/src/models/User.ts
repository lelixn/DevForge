import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  avatar?: string;
  googleId?: string;
  refreshTokens: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  githubUsername?: string;
  leetcodeUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId;
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    refreshTokens: [
      {
        type: String,
      },
    ],
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    githubUsername: {
      type: String,
      default: '',
    },
    leetcodeUsername: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
