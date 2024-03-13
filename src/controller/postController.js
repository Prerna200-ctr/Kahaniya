import { postSchema } from '../schema/index.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import validateObject from '../utils/validation.js'

export const createPost = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Post, Category },
        user,
      },
    } = req
    const { body } = req
    const validationError = validateObject(body, postSchema?.createPostSchema)
    if (validationError) {
      return res.status(400).send({ validationError })
    }

    const existingCategory = await Category.findOne({
      categories: body?.category,
    })

    if (!existingCategory) {
      throw new ApiError(400, 'Category not exists')
    }

    const post = await Post.create({
      ...body,
      category: existingCategory?._id,
      userId: user?._id,
    })
    res.status(201).json(new ApiResponse(200, post, 'Post created'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const deletePost = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Post },
      },
      params,
    } = req

    const { id } = params
    const checkDelete = await Post.findByIdAndDelete(id)
    if (!checkDelete) {
      throw new ApiError(400, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, 'Post Deleted'))
  } catch (error) {
    res.status(404).send(error)
  }
})
