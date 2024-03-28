import { userSchema } from '../schema/index.js'
import validateResponse from '../utils/validation.js'
export const registerValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.registerSchema)
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

// export const registerParamsValidation = (req, res, next) => {
//   const validationError = validateObject(req.params, userSchema?.registerSchema);
//   if (validationError) {
//     return new Error(validationError)
//   }
//   next()
// }

// export const registerQueryValidation = (req, res, next) => {
//   const validationError = validateObject(req.query, userSchema?.registerSchema);
//   if (validationError) {
//     return new Error(validationError)
//   }
//   next()
// }
