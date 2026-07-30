import { Router } from 'express';
import { getSnippets, createSnippet, updateSnippet, deleteSnippet } from '../controllers/snippetController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.route('/')
  .get(getSnippets as any)
  .post(createSnippet as any);

router.route('/:id')
  .put(updateSnippet as any)
  .delete(deleteSnippet as any);

export default router;
