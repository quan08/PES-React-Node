import { Router } from 'express';
import { register, login } from '../controllers/auth';
import { getOne, listStaff, removeStaff } from '../controllers/staff';
import { checkAuth, isAdmin, isAuth, requiredSigin } from '../middlewares/checkAuth';
import { userById } from '../controllers/staff';
const router = Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/staff', listStaff);
router.delete('/staff/:id/:userId',requiredSigin , isAdmin, isAuth, removeStaff);
router.get('/staff/:id', getOne);

router.param('userId', userById)
export default router;