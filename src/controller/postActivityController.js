import { postActivitySchema } from "../schema/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import validateObject from "../utils/validation.js";

// todo : joi validation
export const likeDislikePosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { isLike, postId },
      user,
    } = req;

    const validationError = validateObject(
      body,
      postActivitySchema?.likeDislikePostsSchema
    );

    if (validationError) {
      return res.status(400).send({ validationError });
    }

    let postActivity = await PostActivity.findOne({ postId });

    if (isLike) {
      if (!postActivity.likedBy.includes(user?._id)) {
        postActivity.likedBy.push(user?._id);
        postActivity.like += 1;
      }
    } else if (postActivity.likedBy.includes(user?._id)) {
      await PostActivity.findOneAndUpdate(
        { _id: postActivity?._id },
        { $pull: { likedBy: user?._id } }
      );
      postActivity.like -= 1;
    }
    await postActivity.save();

    res.status(201).json(new ApiResponse(200, postActivity.like));
  } catch (error) {
    res.status(404).send(error);
  }
});

// todo; joi validation
// *done : get all comment
export const getLikesAndComments = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { postId, flag },
    } = req;

    const { body } = req;
    const validationError = validateObject(
      body,
      postActivitySchema?.getLikesAndCommentsSchema
    );
    if (validationError) {
      return res.status(400).send({ validationError });
    }

    let postActivity;
    if (flag == "comment") {
      postActivity = await PostActivity.findOne({
        postId: postId,
      }).populate("comment.commentBy");
      res.status(201).json(new ApiResponse(200, postActivity.comment));
    } else {
      postActivity = await PostActivity.findOne({ postId }).populate("likedBy");
      res.status(201).json(new ApiResponse(200, postActivity.likedBy));
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// todo : joi validation
// *done : algo + testing
export const commentPosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { newComment, postId },
      user,
    } = req;

    let postActivity = await PostActivity.findOneAndUpdate(
      {
        "comment.commentBy": user?._id,
        postId: postId,
      },
      {
        $push: { "comment.$.comments": newComment },
      },
      { new: true }
    );

    if (!postActivity) {
      postActivity = await PostActivity.findOneAndUpdate(
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
      );
    }
    res.status(201).send(postActivity);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

//  todo : joi validation
// *done : algo + testing
export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { comment, postId },
      user,
    } = req;

    if (comment == "all") {
      const postActivity = await PostActivity.findOne({
        "comment.commentBy": user?._id,
        postId: postId,
      });
      postActivity.comment = {
        $pull: { comment: { "comment.commentBy": user?._id } },
      };
      postActivity.save();
    } else {
      await PostActivity.findOneAndUpdate(
        {
          "comment.commentBy": user?._id,
          postId: postId,
        },
        {
          $pull: { "comment.$.comments": comment },
        },
        { new: true }
      );
    }

    res.status(201).send("Comment deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
