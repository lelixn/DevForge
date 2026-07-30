import mongoose, { Schema, Document } from 'mongoose';

export interface ISubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITodo extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'learning' | 'health' | 'other';
  deadline?: Date;
  tags: string[];
  subtasks: ISubTask[];
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubTaskSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TodoSchema = new Schema(
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
    description: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: {
      type: String,
      enum: ['work', 'personal', 'learning', 'health', 'other'],
      default: 'work',
    },
    deadline: {
      type: Date,
    },
    tags: [
      {
        type: String,
      },
    ],
    subtasks: [SubTaskSchema],
    recurring: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly'],
      default: 'none',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
