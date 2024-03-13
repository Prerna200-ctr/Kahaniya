import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { models } from './src/models/index.js'
import { routes } from './src/routes/index.js'

const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use((req, res, next) => {
  req.Context = {
    models,
  }
  next()
})

app.use('/', routes.userRouter)
app.use('/post', routes.postRouter)
app.use('/category', routes.categoryRouter)

export { app }
