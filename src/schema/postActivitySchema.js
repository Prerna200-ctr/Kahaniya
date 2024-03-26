import Joi from "joi";
import { ObjectId } from "mongodb";

export const likeDislikePostsSchema = Joi.object({
  postId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "MongoDB ObjectID"),

  isLike: Joi.boolean(),
});

export const getLikesAndCommentsSchema = Joi.object({
  postId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "MongoDB ObjectID"),

  flag: Joi.string().required(),
});

export const commentPostSchema = Joi.object({
  postId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "MongoDB ObjectID"),

  newComment: Joi.string().required(),
});

export const deleteCommentSchema = Joi.object({
  postId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "MongoDB ObjectID"),

  comment: Joi.array().items(Joi.string()).required(),
});