import { categorySchema } from '../schema/index.js'
import validateResponse from '../utils/validation.js'

export const createCategoryValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    categorySchema?.createCategorySchema
  )
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const deleteCategoryValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.params,
    categorySchema?.deleteCategorySchema
  )
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const updateCategoryValidation = (req, res, next) => {
  const validationError1 = validateResponse(
    req.params,
    categorySchema?.updateCategoryParamsSchema
  )
  if (validationError1) {
    return new Error(validationError1)
  }

  const validationError2 = validateResponse(
    req.body,
    categorySchema?.createCategorySchema
  )
  if (validationError2) {
    return new Error(validationError2)
  }
  next()
}

export const followUnfollowCategoryValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    categorySchema?.followUnfollowCategorySchema
  )
  if (validationError) {
    return new Error(validationError)
  }
  next()
}
