import { categorySchema } from '../schema/index.js'
import validateResponse from '../utils/validation.js'

export const createCategoryValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    categorySchema?.createCategorySchema
  )

  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const deleteCategoryValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.params,
    categorySchema?.deleteCategorySchema
  )

  console.log(validationError)

  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const updateCategoryValidation = (req, res, next) => {
  const validationError1 = validateResponse(
    req.params,
    categorySchema?.updateCategoryParamsSchema
  )

  const validationError2 = validateResponse(
    req.body,
    categorySchema?.updateCategoryBodySchema
  )

  if (validationError1!==null || validationError2!==null) {
    return res.status(404).send({ validationError1, validationError2 })
  }
  next()
}

export const followUnfollowCategoryValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    categorySchema?.followUnfollowCategorySchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}
