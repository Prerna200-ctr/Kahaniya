import { register, login } from "../controller/authController.js";

import express from "express";

//router object

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;
