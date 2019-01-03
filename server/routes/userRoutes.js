import { Router } from 'express';

import { signUpValidations, signInValidations } from '../middlewares/validations/user';
import { userSignUp, userSignIn } from '../controllers/userController';

const router = Router();

/** User SignUp Route */
router.post('/account/signup', signUpValidations, userSignUp);

/** User SignIn Route */
router.post('/account/signin', signInValidations, userSignIn);

export default router;
