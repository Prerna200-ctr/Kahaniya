import schedule from 'node-schedule'
import User from '../models/User.js'

export const deleteCron = async () => {
  try {
    schedule.scheduleJob('* * * * *', async () => {
      console.log('*** Cron started ***')
      const accountsForDeletion = await User.find({
        isActive: true,
        isDeletionDate: Date.now(),
      })
      const idsToDelete = accountsForDeletion.map((user) => user?._id)
      await User.deleteMany({ _id: { $in: idsToDelete } })
    })
  } catch (error) {
    return new Error(error)
  }
}
