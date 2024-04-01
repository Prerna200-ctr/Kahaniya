import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

export const block = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Block, Following },
      },
      body: { blockedUserId },
      user,
    } = req

    const blocked = await Block.findOneAndUpdate(
      { userId: user?._id },
      {
        $addToSet: {
          blockedUser: blockedUserId,
        },
      },
      { upsert: true }
    )

    if (!blocked) {
      throw new ApiError(500, 'Something went wrong')
    }

    await Following.updateMany(
      { userId: { $in: [user?._id, blockedUserId] } },
      {
        $pull: {
          following: { $in: [blockedUserId, user?._id] },
          followers: { $in: [blockedUserId, user?._id] },
        },
      }
    )

    res.status(201).json(new ApiResponse(200, 'User blocked'))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

export const unblock = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Block },
      },
      body: { unblockedUserId },
      user,
    } = req

    const unblocked = await Block.findOneAndUpdate(
      { userId: user?._id },
      {
        $pull: {
          blockedUser: unblockedUserId,
        },
      }
    )

    if (!unblocked) {
      throw new ApiError(500, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, 'User unblocked'))
  } catch (error) {
    res.status(404).send(error)
  }
})
