const { getUserId } = require('../../utils')

const comment = {
    async addComment(parent, { id, text }, context) {
        const userId = getUserId(context);
        const postExists = await context.prisma.$exists.imagePost({
            id
        })
        if (!postExists) {
            throw new Error(`Post not found`)
        }
        return context.prisma.createComment({
            text,
            imagePost: { connect: { id: id } },
            user: { connect: { id: userId } },
        })
    },
}
module.exports = { comment }
