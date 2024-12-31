import { Router } from 'express';
import { currentUser, signIn, signUp } from './auth.controller';

const authRouter = Router();

authRouter.get('/current-user', currentUser)
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)

export default authRouter;