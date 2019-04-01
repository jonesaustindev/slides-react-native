const { getUserId } = require('../utils')


const VideoPost = {
  user: ({ id }, args, context) => {
    return context.prisma.videoPost({ id }).user()
    // const id = getUserId(context)
    // return context.prisma.user({ id })
  },
}

module.exports = {
  VideoPost,
}
