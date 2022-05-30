import { Router } from 'express';
import { create, get, list, remove, search , update } from '../controllers/menu';
import { userById } from '../controllers/staff';
import { checkAuth, isAdmin, isAuth, requiredSigin } from '../middlewares/checkAuth';

const router = Router();

router.get('/menu', list);
router.post('/menu/:userId', requiredSigin, isAdmin, isAuth, create);
router.get('/menu/:id/', get);
router.delete('/menu/:id/:userId',requiredSigin, isAdmin, isAuth, remove);
router.put('/menu/:id/:userId',requiredSigin, isAdmin, isAuth, update);
router.get('/menus/search',search)

router.param('userId', userById)
export default router;