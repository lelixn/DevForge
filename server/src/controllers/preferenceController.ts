import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Preference } from '../models/Preference';
import { ApiResponse } from '../utils/apiResponse';

export class PreferenceController {
  static async getPreferences(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      let preference = await Preference.findOne({ userId });
      if (!preference) {
        preference = await Preference.create({ userId });
      }
      return ApiResponse.success(res, 200, preference);
    } catch (error) {
      next(error);
    }
  }

  static async updatePreferences(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const preference = await Preference.findOneAndUpdate(
        { userId },
        { $set: req.body },
        { new: true, upsert: true, runValidators: true }
      );
      return ApiResponse.success(res, 200, preference, 'Preferences saved successfully');
    } catch (error) {
      next(error);
    }
  }
}
