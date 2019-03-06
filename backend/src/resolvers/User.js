const User = {
  posts: ({ id }, args, context) => {
    return context.prisma.user({ id }).imagePosts()
  },
}

module.exports = {
  User,
}