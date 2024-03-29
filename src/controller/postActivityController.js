import { postActivitySchema } from '../schema/index.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import validateObject from '../utils/validation.js'
import { ApiError } from '../utils/ApiError.js'

// todo : joi validation
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

// todo : joi validation
export const getLikesAndComments = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { postId, flag },
    } = req

    let postActivity
    if (flag === 'comment') {
      postActivity = await PostActivity.findOne({
        postId: postId,
      }).populate('comments.commentBy')
      console.log(postActivity)
      return res.status(201).json(new ApiResponse(200, postActivity))
    } else if (flag === 'like') {
      postActivity = await PostActivity.findOne({ postId }).populate('likedBy')
      res.status(201).json(new ApiResponse(200, postActivity.likedBy))
    }
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

// todo : joi validation
export const commentPosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { newComment, postId, commentId },
      user,
    } = req

    let postActivity = await PostActivity.findOneAndUpdate(
      {
        'comment.commentBy': user?._id,
        postId: postId,
      },
      {
        $push: { 'comment.$.comments': newComment },
      },
      { new: true }
    )

    if (!postActivity) {
      throw new ApiError(400, 'Post not exist')
    }

    // adding a new comment (consider, parent comment)
    let where,
      response = ''
    if (!commentId) {
      where = {
        commentBy: user?._id,
        text: newComment,
        parentId: null,
      }
      response = 'Comment added successfully'
    } else {
      // adding a new comment (consider, reply on a comment)
      where = {
        commentBy: user?._id,
        text: newComment,
        parentId: commentId,
      }
      response = 'Replied to post'
    }
    postActivity.comments.push(where)
    await postActivity.save()

    res.status(201).send(response)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

export const editComment = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { commentId, postId, newComment },
      user,
    } = req

    let postActivity = await PostActivity.findOneAndUpdate(
      {
        postId: postId,
        'comments._id': commentId,
        userId: user?._id,
      },
      {
        $set: {
          'comments.$.text': newComment,
        },
      },
      {
        new: true,
      }
    )

    if (!postActivity) {
      throw new ApiError(400, 'Post not exist')
    }

    res.status(201).send('Comment edited successfully')
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

// *todo : joi validation, deletion pending algo  --> r&d
export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { commentId, postId },
    } = req

    let postActivity = await PostActivity.findById({ postId })
    if (!postActivity) {
      throw new ApiError(400, 'Post not exist')
    }

    const result = await PostActivity.aggregate([
      {
        $match: { postId: postId },
      },
      {
        $graphLookup: {
          from: 'PostActivity',
          startWith: '$comments._id',
          connectFromField: 'comments._id',
          connectToField: 'comments.parentId',
          as: 'commentHierarchy',
        },
      },
      {
        $match: {
          $or: [
            { 'comments._id': commentId },
            { 'commentHierarchy._id': commentId },
          ],
        },
      },
    ])

    console.log(result)

    // const result = await PostActivity.aggregate([
    //   {
    //     $match: { postId: postId },
    //   },
    //   {
    //     $graphLookup: {
    //       from: "PostActivity",
    //       startWith: "$comments._id",
    //       connectFromField: "comments._id",
    //       connectToField: "comments.parentId",
    //       as: "commentHierarchy",
    //     },
    //   },
    //   {
    //     $match: {
    //       $or: [
    //         { "comments._id": commentId },
    //         { "commentHierarchy._id": commentId },
    //       ],
    //     },
    //   },
    // ]);

    // console.log(result, "*******************************");

    // let postActivity = await PostActivity.findOneAndUpdate(
    //   { postId },
    //   { $pull: { comments: { _id: commentId } } }
    // );

    // if (!postActivity) {
    //   throw new ApiError(400, "Post not exist");
    // }

    res.status(201).send('Comment deleted successfully')
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})


