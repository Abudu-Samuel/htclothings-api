import { Router } from 'express';

import { signUpValidations } from '../middlewares/validations/user';
import { userSignUp } from '../controllers/userController';

const router = Router();

/** User SignUp Route */
router.post('/account/signup', signUpValidations, userSignUp);

export default router;
