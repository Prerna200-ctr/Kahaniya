import express from 'express'
import { createPost } from '../controller/postController.js'
const postRouter = express.Router()
postRouter.post('/create', createPost)
export default postRouter
