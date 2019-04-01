const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { imagepost } = require('./Mutation/imagepost')
const { videopost } = require('./Mutation/videopost')
const { comment } = require('./Mutation/comment')
const { Subscription } = require('./Subscription')
const { User } = require('./User')
const { Post } = require('./Post')
const { ImagePost } = require('./ImagePost')
const { VideoPost } = require('./VideoPost')
const { Comment } = require('./Comment')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...imagepost,
    ...videopost,
    ...comment,
  },
  Subscription,
  User,
  Post,
  ImagePost,
  VideoPost,
  Comment,
}
