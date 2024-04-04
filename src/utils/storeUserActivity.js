import Activity from '../models/Activity.js'

export const storeUserActivity = async (...args) => {
  // let userId, postId, categoryId, action

  // Extracting parameters based on number of arguments
  // userId = args[0]
  // postId = args[1]
  // categoryId = args[2]
  // action = args[3]

  await Activity.create({
    userId: args[0],
    postId: args[1],
    categoryId: args[2],
    description: args[3],
  })
}

// storeUserActivity(userId, postId, null, 'User created Post');
// storeUserActivity(userId, postId, null, 'User liked Post');
// storeUserActivity(userId, postId, null, 'User comment on Post');
// storeUserActivity(userId, null, categoryId, 'User followed category');
