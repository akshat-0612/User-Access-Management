import { Router } from 'express';
import { createSoftware, getSoftwareList } from '../controllers/software.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();
router.get('/', getSoftwareList);
router.post('/', authenticateJWT, authorizeRoles('Admin'), createSoftware);
export default router;