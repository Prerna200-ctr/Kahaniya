import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const likeDislikePosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { isLike, postId },
      user,
    } = req;

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
    res.status(201).json(new ApiResponse(200, postActivity));
  } catch (error) {
    res.status(404).send(error);
  }
});
