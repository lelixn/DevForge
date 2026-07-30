import { Response } from 'express';
import { Snippet } from '../models/Snippet';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ApiResponse } from '../utils/apiResponse';

export const getSnippets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const snippets = await Snippet.find({ userId }).sort({ isFavorite: -1, updatedAt: -1 });
    ApiResponse.success(res, 200, snippets);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to fetch snippets');
  }
};

export const createSnippet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { title, command, description, category, tags, isFavorite } = req.body;
    if (!title || !command) {
      ApiResponse.error(res, 400, 'Title and Command are required');
      return;
    }

    const snippet = new Snippet({
      userId,
      title,
      command,
      description,
      category: category || 'other',
      tags: tags || [],
      isFavorite: isFavorite || false,
    });

    await snippet.save();
    ApiResponse.created(res, snippet);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to create snippet');
  }
};

export const updateSnippet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const snippet = await Snippet.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true }
    );

    if (!snippet) {
      ApiResponse.error(res, 404, 'Snippet not found');
      return;
    }

    ApiResponse.success(res, 200, snippet);
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to update snippet');
  }
};

export const deleteSnippet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const snippet = await Snippet.findOneAndDelete({ _id: id, userId });

    if (!snippet) {
      ApiResponse.error(res, 404, 'Snippet not found');
      return;
    }

    ApiResponse.success(res, 200, { id }, 'Snippet deleted successfully');
  } catch (error: any) {
    ApiResponse.error(res, 500, error.message || 'Failed to delete snippet');
  }
};
