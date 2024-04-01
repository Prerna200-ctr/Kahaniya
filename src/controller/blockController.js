import { asyncHandler } from '../utils/asyncHandler.js'

export const block = asyncHandler(async (req, res) => {
  try {

  } catch (error) {
    res.status(404).send(error)

  }
})

export const unblock = asyncHandler(async (req, res) => {
  try {
    
  } catch (error) {
    res.status(404).send(error)
  }
})


