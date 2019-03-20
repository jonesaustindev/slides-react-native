const { getUserId } = require('../utils')


const ImagePost = {
  user: ({ id }, args, context) => {
    return context.prisma.imagePost({ id }).user()
    // const id = getUserId(context)
    // return context.prisma.user({ id })
  },
  comments: ({ id }, args, context) => {
    return context.prisma.imagePost({ id }).comments()
  },
}

module.exports = {
  ImagePost,
}
