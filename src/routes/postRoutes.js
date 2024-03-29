import express from 'express'
import {
  createPost,
  getFeeds,
  deletePost,
} from '../controller/postController.js'
import {
  deletePostValidation,
  createPostValidation,
  getFeedsValidation,
} from '../validation/postValidation.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const postRouter = express.Router()
postRouter.post(
  '/create-post',
  authMiddleware,
  createPostValidation,
  createPost
)
postRouter.delete(
  '/delete-post/:id',
  authMiddleware,
  deletePostValidation,
  deletePost
)
postRouter.get('/:category', getFeedsValidation, getFeeds)

export default postRouter
