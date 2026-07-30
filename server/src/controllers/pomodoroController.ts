import { Response } from 'express';
import { PomodoroSession } from '../models/PomodoroSession';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ApiResponse } from '../utils/apiResponse';
import mongoose from 'mongoose';

export const logSession = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { mode, duration, taskTitle, ambientSound, focusScore } = req.body;
    if (!mode || !duration) {
      ApiResponse.error(res, 400, 'Mode and duration are required');
      return;
    }

    const session = new PomodoroSession({
      userId,
      mode,
      duration,
      taskTitle,
      ambientSound: ambientSound || 'none',
      focusScore: focusScore || 100,
    });

    await session.save();
    ApiResponse.created(res, session);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to log focus session');
  }
};

export const getStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      ApiResponse.error(res, 401, 'Unauthorized');
      return;
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const totalSessions = await PomodoroSession.countDocuments({ userId: userObjectId, mode: 'focus' });

    const totalDurationResult = await PomodoroSession.aggregate([
      { $match: { userId: userObjectId, mode: 'focus' } },
      { $group: { _id: null, total: { $sum: '$duration' } } },
    ]);

    const totalSeconds = totalDurationResult.length > 0 ? totalDurationResult[0].total : 0;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todaySessions = await PomodoroSession.countDocuments({
      userId: userObjectId,
      mode: 'focus',
      completedAt: { $gte: startOfToday },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyBreakdown = await PomodoroSession.aggregate([
      {
        $match: {
          userId: userObjectId,
          mode: 'focus',
          completedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
          count: { $sum: 1 },
          seconds: { $sum: '$duration' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    ApiResponse.success(res, 200, {
      totalFocusSessions: totalSessions,
      totalFocusTime: totalSeconds,
      todaySessions,
      dailyBreakdown,
    });
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to aggregate focus stats');
  }
};
