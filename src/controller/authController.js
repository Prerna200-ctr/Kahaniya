import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/generateResetToken.js";
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

    const existingUser = await User.findOne({
      email: body?.email,
      // isDeletionDate: [{ $lte: Date.now }, null],
    });

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

    const passwordCorrect = await user.isPasswordCorrect(body?.oldPassword);
    if (!passwordCorrect) {
      throw new ApiError(409, "incorrect password");
    }
    await User.findByIdAndUpdate(
      user?._id,
      { password: await bcrypt.hash(body?.newPassword, 10) },
      { new: true }
    );
    res.status(201).json(new ApiResponse(200, "Password updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const forgetPassword = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req;
    const { body } = req;

    const existingUser = await User.findOne({
      email: body?.email,
      isActive: true,
    });
    if (!existingUser) {
      throw new ApiError(409, "Please register");
    }

    const resetToken = generateAccessToken();

    const resetTokenExpiry = new Date().setHours(new Date().getHours() + 1);

    // await sendMail([user.email], process.env.RESET_PASSWORD_TEMPLATE_ID, {
    //   UserName: user.lastName,
    //   link: `${process.env.FRONTEND_URL}reset-password/${token}`,
    // })

    const update = await User.findByIdAndUpdate(
      existingUser?._id,
      { resetToken, expiryToken: resetTokenExpiry },
      {
        new: true,
      }
    );

    if (!update) {
      throw new ApiError(409, "Something went wrong");
    }
    res.status(201).json(new ApiResponse(200, true));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req;
    const { body } = req;

    const { resetToken, newPassword } = body;
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now },
    });
    if (!user) {
      throw new ApiError(409, "Please register");
    }

    user.password = newPassword;
    user.resetToken = null;
    user.expiryToken = null;

    await user.save();
    res.status(201).json(new ApiResponse(200, "Password updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const currentUser = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    res.status(201).json(new ApiResponse(200, user));
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
      user,
    } = req;

    await User.findByIdAndUpdate(user?._id, {
      isActive: false,
      isDeletion: new Date().getDate() + 10,
    });

    res
      .status(201)
      .json(new ApiResponse(200, "Account scheduled for deletion"));
  } catch (error) {
    res.status(404).send(error);
  }
});

