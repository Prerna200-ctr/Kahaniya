import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

export const createPost = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Post, Category, PostActivity },
      },
      user,
    } = req
    const { body } = req

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

    if (!post) {
      throw new ApiError(400, 'Something went wrong')
    }

    res.status(201).json(new ApiResponse(200, post, 'Post created'))
  } catch (error) {
    console.log(error)
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
      user,
    } = req

    const { id } = params
    const checkDelete = await Post.findOneAndDelete({
      _id: id,
      userId: user?._id,
    })
    if (!checkDelete) {
      throw new ApiError(400, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, 'Post Deleted'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const getFeeds = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Post, Category, Block },
      },
      params,
      user,
    } = req
    const { category } = params

    const existingCategory = await Category.findOne({ categories: category })

    let where
    if (existingCategory) {
      where = { category: existingCategory?._id }
    } else if (category === 'All') {
      where = {}
    } else {
      where = { category: null }
    }

    let block = await Block.findOne({ userId: user?._id })
    if (block) {
      block = block.blockedUser
    }

    const posts = await Post.find({ ...where, userId: { $nin: block } }).select(
      '-category'
    )

    if (!posts || posts.length === 0) {
      throw new ApiError(400, 'Nothing to show')
    }

    res.status(201).json(new ApiResponse(200, posts))
  } catch (error) {
    res.status(404).send(error)
  }
})
