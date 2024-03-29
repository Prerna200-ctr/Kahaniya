import { postActivitySchema } from '../schema/index.js'
import validateResponse from '../utils/validation.js'

export const likeDislikePostsValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    postActivitySchema?.likeDislikePostsSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const getLikesAndCommentsValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    postActivitySchema?.getLikesAndCommentsSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const commentPostsValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    postActivitySchema?.commentPostSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const deleteCommentValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    postActivitySchema?.deleteCommentSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const editCommentValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    postActivitySchema?.updateCommentSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}
