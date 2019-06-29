import express from 'express';
import UserController from '../controllers/userContoller';
import Auth from '../middleware/auth';

const { signUp } = UserController;
const { validate } = Auth;

const userRouter = express.Router();

userRouter.post('/signup', validate, signUp);

export default userRouter;
