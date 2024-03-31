import validateResponse from '../utils/validation.js'
import { requestHistorySchema } from '../schema/index.js'

export const followRequestValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    requestHistorySchema?.followRequestSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const acceptFollowRequestValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    requestHistorySchema?.acceptFollowRequestSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const rejectFollowRequestValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    requestHistorySchema?.rejectFollowRequestSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const removeFollowerValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    requestHistorySchema?.removeFollowerSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}

export const unfollowRequestValidation = (req, res, next) => {
  const validationError = validateResponse(
    req.body,
    requestHistorySchema?.unfollowRequestSchema
  )
  if (validationError) {
    return res.status(404).send(validationError)
  }
  next()
}
