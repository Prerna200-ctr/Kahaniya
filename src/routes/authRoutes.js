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
import { registerValidation, loginValidation, updateUserValidation, changePasswordValidation, forgetPasswordValidation, resetPasswordValidation } from '../validation/userValidation.js'

//router object

const userRouter = express.Router()

userRouter.post('/register', registerValidation, register)
userRouter.post('/login',loginValidation, login)
userRouter.put('/update', authMiddleware, updateUserValidation,updateUser)
userRouter.put('/change-password', authMiddleware,changePasswordValidation, changePassword)
userRouter.put('/change-password', authMiddleware,changePasswordValidation, changePassword)
userRouter.put('/change-password', authMiddleware,changePasswordValidation, changePassword)
userRouter.post('/forgot-password',forgetPasswordValidation, forgetPassword)
userRouter.post('/reset-password', resetPasswordValidation, resetPassword)
userRouter.get('/current-user', authMiddleware, currentUser)

export default userRouter
