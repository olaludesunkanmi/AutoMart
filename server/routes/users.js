import express from 'express';
import UserController from '../controllers/userContoller';
import Auth from '../middleware/auth';

const { signUp, signIn } = UserController;
const { validate, loginValidator } = Auth;

const userRouter = express.Router();

userRouter.post('/signup', validate, signUp);
userRouter.post('/login', loginValidator, signIn);

export default userRouter;
