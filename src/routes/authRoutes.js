import { register } from "../controller/authController.js";

import express from "express";

//router object
const userRouter = express.Router();

userRouter.post("/register", register);

export default userRouter;