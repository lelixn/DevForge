import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Todo } from '../models/Todo';
import { ApiResponse } from '../utils/apiResponse';

export class TodoController {
  static async getTodos(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const todos = await Todo.find({ userId }).sort({ order: 1, createdAt: -1 });
      return ApiResponse.success(res, 200, todos);
    } catch (error) {
      next(error);
    }
  }

  static async createTodo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const todo = await Todo.create({
        ...req.body,
        userId,
      });
      return ApiResponse.created(res, todo);
    } catch (error) {
      next(error);
    }
  }

  static async updateTodo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      const todo = await Todo.findOneAndUpdate({ _id: id, userId }, req.body, {
        new: true,
        runValidators: true,
      });

      if (!todo) {
        return ApiResponse.error(res, 404, 'Todo item not found');
      }

      return ApiResponse.success(res, 200, todo, 'Todo updated');
    } catch (error) {
      next(error);
    }
  }

  static async deleteTodo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      const todo = await Todo.findOneAndDelete({ _id: id, userId });
      if (!todo) {
        return ApiResponse.error(res, 404, 'Todo item not found');
      }

      return ApiResponse.success(res, 200, { id }, 'Todo deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async syncTodos(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { items } = req.body; // Array of client todos

      if (!Array.isArray(items)) {
        return ApiResponse.error(res, 400, 'Invalid sync payload');
      }

      // Upsert client items for current user
      const operations = items.map((item: any) => ({
        updateOne: {
          filter: { _id: item._id || item.id, userId },
          update: { $set: { ...item, userId } },
          upsert: true,
        },
      }));

      if (operations.length > 0) {
        await Todo.bulkWrite(operations);
      }

      const allTodos = await Todo.find({ userId }).sort({ order: 1, createdAt: -1 });
      return ApiResponse.success(res, 200, allTodos, 'Todos synced successfully');
    } catch (error) {
      next(error);
    }
  }
}
