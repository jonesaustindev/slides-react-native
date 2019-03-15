const { getUserId } = require('../utils')


const ImagePost = {
  user: (parent, args, context) => {
    // return context.prisma.post({ id })
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  comments: (parent, { id }, context) => {
    return context.prisma.imagePost({ id }).comments()
  },
}

module.exports = {
  ImagePost,
}
