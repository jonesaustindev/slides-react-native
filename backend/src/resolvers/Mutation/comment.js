const { getUserId } = require('../../utils')

const comment = {
    async addComment(parent, { id, text }, context) {
        const userId = getUserId(context);
        console.log(id)
        console.log(userId)
        // const postExists = await context.prisma.imagePost({
        //     where: { id: imagePost }
        // })
        // if (!postExists) {
        //     throw new Error(`Post not found`)
        // }
        return context.prisma.createComment({
            text,
            imagePost: { connect: { id } },
            user: { connect: { id: userId } },
        })
    },
}
module.exports = { comment }
