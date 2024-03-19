import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const likeDislikePosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { isLike, postId },
      user,
    } = req

    let postActivity = await PostActivity.findOne({ postId })

    if (isLike) {
      if (!postActivity.likedBy.includes(user?._id)) {
        postActivity.likedBy.push(user?._id)
        postActivity.like += 1
      }
    } else if (postActivity.likedBy.includes(user?._id)) {
      await PostActivity.findOneAndUpdate(
        { _id: postActivity?._id },
        { $pull: { likedBy: user?._id } }
      )
      postActivity.like -= 1
    }
    await postActivity.save()

    res.status(201).json(new ApiResponse(200, postActivity.like))
  } catch (error) {
    res.status(404).send(error)
  }
})

export const getLikesAndComments = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { postId },
    } = req

    let postActivity = await PostActivity.findOne({ postId }).populate(
      'likedBy'
    )

    res.status(201).json(new ApiResponse(200, postActivity.likedBy))
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

export const commentPosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { newComment, postId },
      user,
    } = req

    const postActivity = await PostActivity.findOne({
      postId,
      'comment.commentBy': user?._id,
    })

    let activity
    if (!postActivity) {
      activity = await PostActivity.findOneAndUpdate(
        { postId },
        {
          $push: {
            comment: {
              commentBy: user?._id,
              comments: newComment,
            },
          },
        },
        { new: true }
      )
    }
    await postActivity.comment[0].comments.push(newComment)
    await postActivity.save()
    res.status(201).send(activity)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})
