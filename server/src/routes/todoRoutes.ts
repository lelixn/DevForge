import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateMiddleware';
import { createTodoSchema, updateTodoSchema } from '../validators/todoValidator';

const router = Router();

router.use(authenticateJWT);

router.get('/', TodoController.getTodos as any);
router.post('/', validateRequest(createTodoSchema), TodoController.createTodo as any);
router.put('/:id', validateRequest(updateTodoSchema), TodoController.updateTodo as any);
router.delete('/:id', TodoController.deleteTodo as any);
router.post('/sync', TodoController.syncTodos as any);

export default router;
