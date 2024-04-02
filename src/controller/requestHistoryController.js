import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import Block from '../models/Block.js'

export const followRequest = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { RequestHistory },
      },
      body,
      user,
    } = req

    const { requestedUserId, status } = body

    let block = await Block.findOne({
      userId: { $in: [requestedUserId, user?._id] },
      blockedUser: { $in: [requestedUserId, user?._id] },
    })

    if (block) {
      return res.status(500).json(new ApiResponse(200, 'Something went wrong'))
    }
    let sendFollowRequest = await RequestHistory.findOne({
      userId: user?._id,
      requestedUser: requestedUserId,
    })

    if (!sendFollowRequest) {
      sendFollowRequest = await RequestHistory.create({
        userId: user?._id,
        requestStatus: status,
        requestedUser: requestedUserId,
      })
    } else {
      sendFollowRequest.requestStatus = status
      sendFollowRequest.save()
    }

    if (!sendFollowRequest) {
      throw new ApiError(500, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, 'Requested'))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

export const acceptFollowRequest = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { RequestHistory, Following },
      },
      user,
      body,
    } = req

    const { status, followerRequestId } = body

    const acceptRequest = await RequestHistory.findOneAndUpdate(
      {
        requestedUser: user?._id,
        userId: followerRequestId,
      },
      {
        responseByUser: true,
        requestStatus: status,
      }
    )

    if (!acceptRequest) {
      throw new ApiError(500, 'Something went wrong')
    }

    await Following.findOneAndUpdate(
      { userId: user?._id },
      {
        $addToSet: { followers: followerRequestId },
      }
    )

    await Following.findOneAndUpdate(
      { userId: followerRequestId },
      {
        $addToSet: { following: user?._id },
      }
    )

    res.status(201).json(new ApiResponse(200, 'Accepted'))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

export const rejectRequests = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { RequestHistory },
      },
      body: { followerRequestId },
      user,
    } = req

    const rejectRequest = await RequestHistory.findOneAndUpdate(
      {
        requestedUser: user?._id,
        userId: followerRequestId,
      },
      {
        requestStatus: null,
        responseByUser: null,
        requestedUser: null,
      }
    )

    if (!rejectRequest) {
      throw new ApiError(500, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, 'Rejected'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const getFollowRequests = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { RequestHistory },
      },
      user,
    } = req

    let requests = await RequestHistory.find({
      requestedUser: user?._id,
    })
    if (!requests || requests.length === 0) {
      res.status(404).json(new ApiResponse(200, 'No requested'))
    }
    res.status(201).json(new ApiResponse(200, requests))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const removeFollower = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Following },
      },
      user,
      body: { followerId },
    } = req

    const removedFollower = await Following.findOneAndUpdate(
      {
        userId: user?._id,
      },
      {
        $pull: { followers: followerId },
      }
    )

    if (!removedFollower) {
      throw new ApiError(500, 'Something went wrong')
    }

    await Following.findOneAndUpdate(
      {
        userId: followerId,
      },
      {
        $pull: { following: user?._id },
      }
    )

    res.status(201).json(new ApiResponse(200, 'Removed follower'))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const unfollowRequest = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Following },
      },
      body: { followerId },
      user,
    } = req

    const unFollow = await Following.findOneAndUpdate(
      {
        userId: user?._id,
      },
      {
        $pull: { following: followerId },
      }
    )

    if (!unFollow) {
      throw new ApiError(500, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, 'Unfollowed'))
  } catch (error) {
    res.status(404).send(error)
  }
})
