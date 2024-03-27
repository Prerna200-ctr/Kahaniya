import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { followingAndUnfollowing } from '../controller/followingController.js'
const followingRouter = express.Router()
followingRouter.put('/following', authMiddleware, followingAndUnfollowing)
export default followingRouter
