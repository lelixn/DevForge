import { Router } from 'express';
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark, reorderBookmarks } from '../controllers/bookmarkController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.route('/')
  .get(getBookmarks as any)
  .post(createBookmark as any);

router.post('/reorder', reorderBookmarks as any);

router.route('/:id')
  .put(updateBookmark as any)
  .delete(deleteBookmark as any);

export default router;
