import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

export const getFollowers = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { Following },
      },
      user,
    } = req

    const allFollowersList = await Following.findOne({
      userId: user?._id,
    }).populate({
      path: 'followers',
      select: '-password -_id -isActive -userType -createdAt -updatedAt -__v',
    })

    if (!allFollowersList) {
      throw new ApiError(500, 'Something went wrong')
    }
    res.status(201).json(new ApiResponse(200, allFollowersList.followers))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})
