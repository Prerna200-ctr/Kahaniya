import express from "express";
import { createPost, getFeeds } from "../controller/postController.js";

const postRouter = express.Router();
postRouter.get("/:category", getFeeds);
postRouter.post("/create", createPost);

export default postRouter;
