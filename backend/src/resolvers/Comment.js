const { getUserId } = require('../utils')


const Comment = {
  user: (parent, args, context) => {
      // return context.prisma.post({ id })
      const id = getUserId(context)
      return context.prisma.user({ id })
  },
  imagePost: (parent, { id }, context) => {
    return context.prisma.imagePost({ id })
  },
}

module.exports = {
  Comment,
}
