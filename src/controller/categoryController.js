/**
 * TODO: Have to put in admin side 
 */
import { categorySchema } from '../schema/index.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import validateObject from '../utils/validation.js'
export const createCategory = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Category },
      },
    } = req
    const { body } = req
    const validationError = validateObject(
      body,
      categorySchema?.createCategorySchema
    )
    if (validationError) {
      return res.status(400).send({ validationError })
    }
    const existingCategory = await Category.findOne({
      categories: body?.categories,
    })

    if (existingCategory) {
      throw new ApiError(400, 'Category already exists')
    }

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
    const updatedCategory = await Category.findByIdAndUpdate(checkCategory?._id, body, { new: true })
    res.status(201).json(new ApiResponse(200,  updatedCategory, 'Category updated'))
  } catch (error) {
    res.status(404).send(error)
  }
})
