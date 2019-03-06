const { getUserId } = require('../utils')


const ImagePost = {
  user: (parent, args, context) => {
    // return context.prisma.post({ id })
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

module.exports = {
  ImagePost,
}
