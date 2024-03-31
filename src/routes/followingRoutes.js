import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getFollowers } from '../controller/followingController.js'
const followingRouter = express.Router()

followingRouter.get('/all-followers', authMiddleware, getFollowers)

export default followingRouter
