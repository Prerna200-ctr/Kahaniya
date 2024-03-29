import {
  registerSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
} from './userSchema.js'
import { createPostSchema, deletePostSchema, getFeedsSchema } from './postSchema.js'
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategoryParamsSchema,
  followUnfollowCategorySchema,
} from './categorySchema.js'
import {
  likeDislikePostsSchema,
  getLikesAndCommentsSchema,
  commentPostSchema,
  deleteCommentSchema,
} from './postActivitySchema.js'

export const userSchema = {
  registerSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
}

export const postSchema = {
  createPostSchema,
  deletePostSchema,
  getFeedsSchema
}

export const categorySchema = {
  createCategorySchema,
  deleteCategorySchema,
  updateCategoryParamsSchema,
  followUnfollowCategorySchema,
}

export const postActivitySchema = {
  likeDislikePostsSchema,
  getLikesAndCommentsSchema,
  commentPostSchema,
  deleteCommentSchema,
}
