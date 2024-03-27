import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  commentPosts,
  deleteComment,
  editComment,
  getLikesAndComments,
  likeDislikePosts,
} from "../controller/postActivityController.js";

const postActivityRouter = express.Router();
postActivityRouter.post("/like-dislike-post", authMiddleware, likeDislikePosts);
postActivityRouter.post("/comment-post", authMiddleware, commentPosts);
postActivityRouter.get(
  "/getLikesAndCommentsUser",
  authMiddleware,
  getLikesAndComments
);
postActivityRouter.delete("/delete-comment", authMiddleware, deleteComment);
postActivityRouter.put("/edit-comment", authMiddleware, editComment);

export default postActivityRouter;
