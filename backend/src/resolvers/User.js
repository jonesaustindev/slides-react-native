const User = {
  posts: ({ id }, args, context) => {
    return context.prisma.user({ id }).imagePosts()
  },
  comments: ({ id }, args, context) => {
    return context.prisma.user({ id }).comments()
  }
}

module.exports = {
  User,
}