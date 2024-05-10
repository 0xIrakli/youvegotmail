import express from 'express'

import {
	getStatus,
	registerUser,
	loginUser,
	logoutUser,
} from '../controllers/userController.js'
import { verifyAuth } from '../middleware/verifyAuth.js'
import {
	loginSchema,
	registerSchema,
	validateForm,
} from '../middleware/validateForm.js'

export const userRouter = express.Router()

// GET /user/status
// ამოწმებს მომხმარებლის loggedIn სტატუსს. თუ მომხმარებელი სისტემაში შესულია,
// აბრუნებს მომხმარებლის ძირითად ინფორმაციას(email, _id).
userRouter.get('/status', verifyAuth, getStatus)

// POST /user/register
// req.body-ში გადაეცემა email და password. არეგისტრირებს მომხმარებელს, ამატებს მონაცემთა ბაზაში.
// დარეგისტრირების შემდეგ მომხმარებელი ჩათვალეთ სისტემაში შესულად.აბრუნებს მომხმარებლის ძირითად ინფორმაციას(email, _id).
userRouter.post('/register', validateForm(registerSchema), registerUser)

// POST /user/login
// req.body-ში გადაეცემა email და password. მომხმარებელი შეყავს სისტემაში. აბრუნებს მომხმარებლის ძირითად ინფორმაციას (email, _id).
userRouter.post('/login', validateForm(loginSchema), loginUser)

// DELETE /user/logout
// მომხმარებელი გამოყავს სისტემიდან.
userRouter.delete('/logout', logoutUser)
