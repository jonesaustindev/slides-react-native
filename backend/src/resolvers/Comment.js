const { getUserId } = require('../utils')


const Comment = {
  user: (parent, args, context) => {
      const id = getUserId(context)
      return context.prisma.user({ id })
  },
  imagePost: ({ id }, args, context) => {
    return context.prisma.imagePost({ id }).comments()
  },
}

module.exports = {
  Comment,
}
