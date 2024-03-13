import {
  registerSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
} from "./userSchema.js";

import { createPostSchema } from "./postSchema.js";
import { createCategorySchema } from "./categorySchema.js";
export const userSchema = {
  registerSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
};

export const postSchema = {
  createPostSchema
}

export const categorySchema = {
  createCategorySchema
}
