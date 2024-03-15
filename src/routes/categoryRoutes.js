import express from "express";
import {
  createCategory,
  followUnfollowCategory,
} from "../controller/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const categoryRouter = express.Router();

categoryRouter.post("/follow-unfollow-category", authMiddleware, followUnfollowCategory);
categoryRouter.post("/create", createCategory);
export default categoryRouter;
