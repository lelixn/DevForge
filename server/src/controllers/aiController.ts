import { Request, Response, NextFunction } from 'express';
import { AIService } from '../services/aiService';
import { ApiResponse } from '../utils/apiResponse';

export class AIController {
  static async processAIRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { action, prompt, context, apiKey, provider } = req.body;

      if (!action || !prompt) {
        return ApiResponse.error(res, 400, 'Action and prompt are required');
      }

      const result = await AIService.processAIRequest({
        action,
        prompt,
        context,
        apiKey,
        provider,
      });

      return ApiResponse.success(res, 200, { result });
    } catch (error) {
      next(error);
    }
  }
}
