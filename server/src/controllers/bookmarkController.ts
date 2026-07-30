import { Response } from 'express';
import { Bookmark } from '../models/Bookmark';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ApiResponse } from '../utils/apiResponse';

export const getBookmarks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const bookmarks = await Bookmark.find({ userId }).sort({ order: 1 });
    ApiResponse.success(res, 200, bookmarks);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to fetch bookmarks');
  }
};

export const createBookmark = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { title, url, favicon, order, category } = req.body;
    if (!title || !url) {
      ApiResponse.error(res, 400, 'Title and URL are required');
      return;
    }

    const bookmark = new Bookmark({
      userId,
      title,
      url,
      favicon,
      category: category || 'General',
      order: order ?? 0,
    });

    await bookmark.save();
    ApiResponse.created(res, bookmark);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to create bookmark');
  }
};

export const deleteBookmark = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId });

    if (!bookmark) {
      ApiResponse.error(res, 404, 'Bookmark not found');
      return;
    }

    ApiResponse.success(res, 200, { id }, 'Bookmark deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to delete bookmark');
  }
};

export const reorderBookmarks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { orders } = req.body;
    if (!orders || !Array.isArray(orders)) {
      ApiResponse.error(res, 400, 'Orders array is required');
      return;
    }

    const bulkOps = orders.map((item: { id: string; order: number }) => ({
      updateOne: {
        filter: { _id: item.id, userId },
        update: { $set: { order: item.order } },
      },
    }));

    await Bookmark.bulkWrite(bulkOps);
    ApiResponse.success(res, 200, null, 'Bookmarks reordered successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to reorder bookmarks');
  }
};

export const updateBookmark = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true }
    );

    if (!bookmark) {
      ApiResponse.error(res, 404, 'Bookmark not found');
      return;
    }

    ApiResponse.success(res, 200, bookmark);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to update bookmark');
  }
};
