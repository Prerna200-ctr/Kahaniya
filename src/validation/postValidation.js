import { postSchema } from '../schema/index.js'
import validateResponse from '../utils/validation.js'

export const createPostValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    postSchema?.createPostSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const deletePostValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.params,
    postSchema?.deletePostSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const getFeedsValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.params,
    postSchema?.getFeedsSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}
