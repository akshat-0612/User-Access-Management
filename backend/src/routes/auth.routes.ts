import { Router } from 'express';
import { signup, login, createUser } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/create-user', authenticateJWT, authorizeRoles('Admin'), createUser);

export default router;
