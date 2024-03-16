import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { likeDislikePosts } from "../controller/postActivityController.js";

const postActivityRouter = express.Router();
postActivityRouter.post("/like-dislike-post", authMiddleware, likeDislikePosts);

export default postActivityRouter;
