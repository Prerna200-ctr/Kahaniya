import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  commentPosts,
  likeDislikePosts,
} from "../controller/postActivityController.js";

const postActivityRouter = express.Router();
postActivityRouter.post("/like-dislike-post", authMiddleware, likeDislikePosts);
postActivityRouter.post("/comment-post", authMiddleware, commentPosts);

export default postActivityRouter;
