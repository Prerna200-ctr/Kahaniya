import { userSchema } from '../schema/index.js'
import validateResponse from '../utils/validation.js'

export const registerValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.registerSchema)
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const loginValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.loginSchema)
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const updateUserValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.updateSchema)
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const changePasswordValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.changePasswordSchema)
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const forgetPasswordValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.forgetPasswordSchema)
  if (validationError) {
    return new Error(validationError)
  }
  next()
}

export const resetPasswordValidation = (req, res, next) => {
  const validationError = validateResponse(req.body, userSchema?.resetPasswordSchema)
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
