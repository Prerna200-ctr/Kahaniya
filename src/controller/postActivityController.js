import { postActivitySchema } from "../schema/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import validateObject from "../utils/validation.js";

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
      req.body,
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

export const getLikesAndComments = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { postId, flag },
    } = req;

    const validationError = validateObject(
      req.body,
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
    } else if (flag == "like") {
      postActivity = await PostActivity.findOne({ postId }).populate("likedBy");
      res.status(201).json(new ApiResponse(200, postActivity.likedBy));
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

// *done : joi validation
// todo : algo + testing
export const commentPosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { newComment, postId },
      user,
    } = req;

    const validationError = validateObject(
      req.body,
      postActivitySchema?.commentPostSchema
    );
    if (validationError) {
      return res.status(400).send({ validationError });
    }

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

    console.log(postActivity, "**********postActivity");

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

// *done : algo + testing, joi validation
export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { comment, postId },
      user,
    } = req;

    const validationError = validateObject(
      req.body,
      postActivitySchema?.deleteCommentSchema
    );
    if (validationError) {
      return res.status(400).send({ validationError });
    }

    let postActivity = await PostActivity.findById({ postId });
    if (!postActivity) {
      throw new ApiError(400, "Post not exist");
    }

    let where;
    if (comment.length) {
      where = {
        $pull: { "comment.$.comments": { $in: comment } },
      };
    } else {
      where = {
        $pull: { comment: { commentBy: user?._id } },
      };
    }

    await PostActivity.updateOne(
      { "comment.commentBy": user?._id, postId: postId },
      where,
      { multi: true }
    );

    res.status(201).send("Comment deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
