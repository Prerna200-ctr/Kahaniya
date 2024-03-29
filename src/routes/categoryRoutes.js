import express from 'express'
import {
  createCategory,
  deleteCategory,
  followUnfollowCategory,
  updateCategory,
} from '../controller/categoryController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import {
  createCategoryValidation,
  deleteCategoryValidation,
  followUnfollowCategoryValidation,
  updateCategoryValidation,
} from '../validation/categoryValidation.js'

const categoryRouter = express.Router()

categoryRouter.post('/create', createCategoryValidation, createCategory)
categoryRouter.delete(
  '/delete-category/:id',
  authMiddleware,
  deleteCategoryValidation,
  deleteCategory
)
categoryRouter.post(
  '/follow-unfollow-category',
  authMiddleware,
  followUnfollowCategoryValidation,
  followUnfollowCategory
)
categoryRouter.post(
  '/update-categoty/:id',
  authMiddleware,
  updateCategoryValidation,
  updateCategory
)
export default categoryRouter
