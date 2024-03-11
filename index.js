import dotenv from 'dotenv'
import connectDB from './src/db/db.js'
import { app } from './app.js'
import { deleteCron } from './src/utils/deleteAccounts.js'
dotenv.config()

await deleteCron()

connectDB()
  .then(() => {
    app.listen(process.env.PORT, async () => {
      console.log(`Server is running at ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log('Connection Failed: ', err)
  })
