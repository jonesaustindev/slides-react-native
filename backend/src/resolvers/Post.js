const Post = {
  user: ({ id }, args, context) => {
    return context.prisma.post({ id }).user()
  },
}

module.exports = {
  Post,
}
