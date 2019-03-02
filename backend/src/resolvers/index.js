const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { User } = require('./User')
const { Post } = require('./Post')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  User,
  Post,
}
