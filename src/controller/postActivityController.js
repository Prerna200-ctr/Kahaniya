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
      body: { postId },
    } = req;

    let postActivity = await PostActivity.findOne({ postId }).populate(
      "likedBy"
    );

    res.status(201).json(new ApiResponse(200, postActivity.likedBy));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const commentPosts = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { PostActivity },
      },
      body: { newComment, postId },
      user,
    } = req;

    let postActivity = await PostActivity.findOne({ postId });

    const foundComment = postActivity.comment.find(
      (comment) => comment.commentBy.toString() === user?._id.toString()
    );

    if (foundComment) {
      foundComment.comments.push(newComment);
    } else {
      const newCommentObj = {
        commentBy: user?._id,
        comments: [newComment],
      };
      postActivity.comment.push(newCommentObj);
    }

    await postActivity.save();

    console.log(postActivity.comment, "*********");

    res.status(201).json(new ApiResponse(200, "Comment added successfully"));
  } catch (error) {
    res.status(404).send(error);
  }
});



// todo
// export const commentPosts = asyncHandler(async (req, res) => {
//   try {
//     const {
//       Context: {
//         models: { PostActivity },
//       },
//       body: { newComment, postId },
//       user,
//     } = req;

//     const postActivity = await PostActivity.find({postId});

//     const foundComment = await postActivity.comment.find({
//       comment: {
//         $elemMatch: {
//           commentBy: { $eq: user?._id },
//         },
//       },
//     });

    
//     console.log(foundComment);

//     res.status(201).send(foundComment);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });
