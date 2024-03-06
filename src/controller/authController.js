import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import validateObject from "../utils/validation.js";
import { userSchema } from "../schema/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req;
    const { body } = req;
    const validationError = validateObject(body, userSchema?.registerSchema);

    if (validationError) {
      console.log(validationError);
      return res.status(400).send({ validationError });
    }
    const existingUser = await User.findOne({ email: body?.email });
    if (existingUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
    const user = await User.create(body);
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
    res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req;
    const { body } = req;
    const validationError = validateObject(body, userSchema?.loginSchema);
    if (validationError) {
      console.log(validationError);
      return res.status(400).send({ validationError });
    }
    const existingUser = await User.findOne({ email: body?.email });
    if (!existingUser) {
      throw new ApiError(409, "Please register");
    }

    const passwordCorrect = await existingUser.isPasswordCorrect(
      body?.password
    );
    if (!passwordCorrect) {
      throw new ApiError(409, "incorrect password");
    }
    const token = existingUser.generateAccessToken();
    res
      .status(201)
      .json(new ApiResponse(200, token, "User logged in successfully"));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
      user,
    } = req;
    const { body } = req;
    const validationError = validateObject(body, userSchema?.updateSchema);
    if (validationError) {
      return res.status(400).send({ validationError });
    }
    const update = await User.findByIdAndUpdate(user?._id, body, { new: true });
    res
      .status(201)
      .json(new ApiResponse(200, update, "User updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
      user,
    } = req;
    const { body } = req;
    const validationError = validateObject(
      body,
      userSchema?.changePasswordSchema
    );
    if (validationError) {
      return res.status(400).send({ validationError });
    }
    const passwordCorrect = await user.isPasswordCorrect(body?.oldPassword);
    if (!passwordCorrect) {
      throw new ApiError(409, "incorrect password");
    }
    await User.findByIdAndUpdate(
      user?._id,
      { password: await bcrypt.hash(body?.newPassword, 10) },
      { new: true }
    );
    res
      .status(201)
      .json(new ApiResponse(200, "Password updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
