import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import {
  commentPosts,
  deleteComment,
  getLikesAndComments,
  likeDislikePosts,
} from '../controller/postActivityController.js'
import {
  commentPostsValidation,
  deleteCommentValidation,
  getLikesAndCommentsValidation,
  likeDislikePostsValidation,
} from '../validation/postActivityControllerValidation.js'

const postActivityRouter = express.Router()
postActivityRouter.post(
  '/like-dislike-post',
  authMiddleware,
  likeDislikePostsValidation,
  likeDislikePosts
)
postActivityRouter.get(
  '/getLikesAndCommentsUser',
  authMiddleware,
  getLikesAndCommentsValidation,
  getLikesAndComments
)
postActivityRouter.post('/comment-post', authMiddleware, commentPostsValidation, commentPosts)
postActivityRouter.delete('/delete-comment', authMiddleware, deleteCommentValidation, deleteComment)

export default postActivityRouter
