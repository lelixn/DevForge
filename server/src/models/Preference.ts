import mongoose, { Schema, Document } from 'mongoose';

export interface IPreference extends Document {
  userId: mongoose.Types.ObjectId;
  theme: string;
  accentColor: string;
  clockFormat: '12h' | '24h';
  weatherUnit: 'metric' | 'imperial';
  greetingName: string;
  showWeather: boolean;
  showQuote: boolean;
  showBackground: boolean;
  showParticles: boolean;
  reducedMotion: boolean;
  widgetLayout: Record<string, any>;
  updatedAt: Date;
}

const PreferenceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    accentColor: {
      type: String,
      default: 'purple',
    },
    clockFormat: {
      type: String,
      enum: ['12h', '24h'],
      default: '24h',
    },
    weatherUnit: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric',
    },
    greetingName: {
      type: String,
      default: 'Developer',
    },
    showWeather: {
      type: Boolean,
      default: true,
    },
    showQuote: {
      type: Boolean,
      default: true,
    },
    showBackground: {
      type: Boolean,
      default: true,
    },
    showParticles: {
      type: Boolean,
      default: true,
    },
    reducedMotion: {
      type: Boolean,
      default: false,
    },
    widgetLayout: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Preference = mongoose.model<IPreference>('Preference', PreferenceSchema);
