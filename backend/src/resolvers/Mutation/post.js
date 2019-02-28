const { getUserId } = require('../../utils')

const post = {
  async createPost(parent, { caption }, context) {
    const userId = getUserId(context)
    return context.prisma.createPost({
      caption,
      user: { connect: { id: userId } },
    })
  },

  // async publish(parent, { id }, context) {
  //   const userId = getUserId(context)
  //   const postExists = await context.prisma.$exists.post({
  //     id,
  //     author: { id: userId },
  //   })
  //   if (!postExists) {
  //     throw new Error(`Post not found or you're not the author`)
  //   }

  //   return context.prisma.updatePost(
  //     {
  //       where: { id },
  //       data: { published: true },
  //     },
  //   )
  // },

  async deletePost(parent, { id }, context) {
    const userId = getUserId(context)
    const postExists = await context.prisma.$exists.post({
      id,
      user: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return context.prisma.deletePost({ id })
  },
}

module.exports = { post }
