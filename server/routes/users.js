import express from 'express'

import { signin, signup } from '../controllers/user.js'

const router = express.Router();

// comes from frontend controllers
router.post('/signin', signin)  //send form details to backend, then backend signs in user
router.post('/signup', signup)

export default router;
