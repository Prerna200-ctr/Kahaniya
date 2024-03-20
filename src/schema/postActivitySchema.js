import Joi from "joi";


export const likeDislikePostsSchema = Joi.object({
  postId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),

  isLike: Joi.boolean(),
});

export const getLikesAndCommentsSchema = Joi.object({
  postId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),

  flag: Joi.string(),
});
