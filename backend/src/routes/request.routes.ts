import { Router } from 'express';
import { submitRequest, updateRequestStatus, getAllRequests, getMyRequests } from '../controllers/request.controller';
import { authorizeRoles } from '../middlewares/role.middleware';
import { authenticateJWT } from '../middlewares/auth.middleware';


const router = Router();
router.get('/my', authenticateJWT, authorizeRoles('Employee'), getMyRequests);
router.get('/', authenticateJWT, authorizeRoles('Admin', 'Manager'), getAllRequests);
router.post('/', authenticateJWT, authorizeRoles('Employee'), submitRequest);
router.patch('/:id', authenticateJWT, authorizeRoles('Manager'), updateRequestStatus);
export default router;