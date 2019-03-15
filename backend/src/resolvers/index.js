const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { imagepost } = require('./Mutation/imagepost')
const { comment } = require('./Mutation/imagepost')
const { Subscription } = require('./Subscription')
const { User } = require('./User')
const { Post } = require('./Post')
const { ImagePost } = require('./ImagePost')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...imagepost,
    ...comment,
  },
  Subscription,
  User,
  Post,
  ImagePost,
}
