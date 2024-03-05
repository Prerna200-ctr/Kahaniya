import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  password: Joi.string()
    .trim()
    .min(8)
    .max(10)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  email: Joi.string().email().trim().lowercase().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(10)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base": `Password should be between 3 to 10 characters and must conatain at least one letter (lowercase and uppercase both) and one digit and one special chacacter`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
});