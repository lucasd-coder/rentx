import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const autheticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

autheticateRoutes.post('/sessions', authenticateUserController.handle);

export { autheticateRoutes };
