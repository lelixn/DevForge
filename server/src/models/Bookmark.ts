import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  url: string;
  favicon?: string;
  category?: string;
  tags?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookmarkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    favicon: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
    },
    tags: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Bookmark = mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
