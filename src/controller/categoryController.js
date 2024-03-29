/**
 * TODO: Have to put in admin side
 */
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const createCategory = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Category },
      },
    } = req
    const { body } = req

    const category = await Category.create(body)
    res.status(201).json(new ApiResponse(200, category, 'Category created'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Category },
      },
    } = req

    const categories = await Category.find().select('categories')
    if (!categories) {
      throw new ApiError(400, 'Categories not found')
    }
    res.status(201).json(new ApiResponse(200, categories))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Category },
      },
      params,
    } = req

    const { id } = params
    const checkCategory = await Category.findOne({ _id: id })
    if (!checkCategory) {
      throw new ApiError(400, 'Categories not found')
    }
    await Category.findByIdAndDelete(checkCategory?._id)
    res.status(201).json(new ApiResponse(200, 'Category deleted'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Category },
      },
      params,
      body,
    } = req

    const { id } = params
    const checkCategory = await Category.findOne({ _id: id })
    if (!checkCategory) {
      throw new ApiError(400, 'Category not found')
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      checkCategory?._id,
      body,
      { new: true }
    )
    res
      .status(201)
      .json(new ApiResponse(200, updatedCategory, 'Category updated'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const followUnfollowCategory = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Category },
      },
      body: { categoryName, flag },
      user,
    } = req
    const existingCategory = await Category.findOne({
      categories: categoryName,
    })

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' })
    }

    let where, response
    if (flag === 'follow') {
      where = { $addToSet: { followers: user?._id } }
      response = 'Follow'
    } else {
      where = { $pull: { followers: user?._id } }
      response = 'Unfollow'
    }

    await Category.findOneAndUpdate({ _id: existingCategory?._id }, where)

    res.status(201).json(new ApiResponse(200, response))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})
