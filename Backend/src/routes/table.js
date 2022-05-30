import { Router } from 'express';
import { create, fillter, get, list, remove, update } from '../controllers/table';
import { userById } from '../controllers/staff';
import { checkAuth, isAdmin, isAuth, requiredSigin } from '../middlewares/checkAuth';

const router = Router();

router.get('/table', list);
router.post('/table/:userId', requiredSigin, isAdmin, isAuth, create);
router.get('/table/:id', get);
router.delete('/table/:id/:userId', requiredSigin, isAdmin, isAuth, remove);
router.put('/table/:id', update);
router.get('/tables/fillter/', fillter);
router.patch('/table/:id', update);

router.param('userId', userById)
export default router;