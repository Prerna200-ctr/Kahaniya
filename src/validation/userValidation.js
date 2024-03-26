import { userSchema } from "../schema/index.js";
import validateResponse from "../utils/validation.js"

export const registerValidation = (req, res, next) => {
  const validationError = validateObject(req.body, userSchema?.registerSchema);
  if (validationError) {
    return new Error(validationError)
  }
  next()
}
