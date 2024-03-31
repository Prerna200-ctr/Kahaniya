import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'

import {
  acceptFollowRequest,
  followRequest,
  getFollowRequests,
  rejectRequests,
  removeFollower,
  unfollowRequest,
} from '../controller/requestHistoryController.js'
import {
  acceptFollowRequestValidation,
  followRequestValidation,
  rejectFollowRequestValidation,
  removeFollowerValidation,
  unfollowRequestValidation,
} from '../validation/requestHistoryValidation.js'

const requestHistoryRouter = express.Router()

requestHistoryRouter.post(
  '/follow-request',
  authMiddleware,
  followRequestValidation,
  followRequest
)
requestHistoryRouter.post(
  '/accept-request',
  authMiddleware,
  acceptFollowRequestValidation,
  acceptFollowRequest
)
requestHistoryRouter.post(
  '/reject-request',
  authMiddleware,
  rejectFollowRequestValidation,
  rejectRequests
)
requestHistoryRouter.post(
  '/remove-follower',
  authMiddleware,
  removeFollowerValidation,
  removeFollower
)
requestHistoryRouter.post(
  '/unfollow',
  authMiddleware,
  unfollowRequestValidation,
  unfollowRequest
)
requestHistoryRouter.get(
  '/all-follow-request',
  authMiddleware,
  getFollowRequests
)

export default requestHistoryRouter
