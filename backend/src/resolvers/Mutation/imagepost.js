const { getUserId } = require('../../utils')

const imagepost = {
    async uploadImagePost(parent, { caption, image, largeImage }, context) {
        const userId = getUserId(context);
        return context.prisma.createImagePost({
            caption,
            image,
            largeImage,
            user: { connect: { id: userId } },
        })
    },
    async editImagePost(parent, args, context) {
        const updates = {...args};
        delete updates.id;
        return context.prisma.updateImagePost({
            data: updates,
            where: {
                id: args.id
            }
        })
    },
    async deleteImagePost(parent, { id }, context) {
        const userId = getUserId(context)
        const postExists = await context.prisma.$exists.imagePost({
          id,
          user: { id: userId },
        })
        if (!postExists) {
          throw new Error(`Post not found or you're not the author`)
        }
    
        return context.prisma.deleteImagePost({ id })
      },
}
module.exports = { imagepost }
