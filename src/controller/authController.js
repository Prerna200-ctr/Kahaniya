import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import validateObject from "../utils/validation.js";
import { userSchema } from "../schema/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
