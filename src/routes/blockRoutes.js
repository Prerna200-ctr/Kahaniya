import express from 'express'
import { block, unblock } from '../controller/blockController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const blockRouter = express.Router()
blockRouter.post('/block-user', authMiddleware, block)
blockRouter.put('/unblock-user', authMiddleware, unblock)

export default blockRouter
