import {
  register,
  login,
  updateUser,
  changePassword,
  forgetPassword,
  resetPassword,
  currentUser,
} from '../controller/authController.js'

import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { registerValidation } from '../validation/userValidation.js'

//router object

const userRouter = express.Router()

userRouter.post('/register', registerValidation, register)
userRouter.post('/login', login)
userRouter.put('/update', authMiddleware, updateUser)
userRouter.put('/change-password', authMiddleware, changePassword)
userRouter.post('/forgot-password', forgetPassword)
userRouter.post('/reset-password', resetPassword)
userRouter.get('/current-user', authMiddleware, currentUser)

export default userRouter
