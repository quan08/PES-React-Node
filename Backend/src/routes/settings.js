import { Router } from 'express';
import { create, get, list, readImgtable, remove, update } from '../controllers/settings';
import { userById } from '../controllers/staff';
import { checkAuth, isAdmin, isAuth, requiredSigin } from '../middlewares/checkAuth';

const router = Router();

router.get('/generalSettings', list);
router.post('/generalSettings/:userId',requiredSigin, isAdmin, isAuth, create);
router.get('/generalSettings/:id', get);
router.delete('/generalSettings/:id/:userId',requiredSigin, isAdmin, isAuth, remove);
router.put('/generalSettings/:id/:userId',requiredSigin, isAdmin, isAuth, update);

router.param('userId', userById)
export default router;