const { getUserId } = require('../../utils')
const shortid = require('shortid')
const { createWriteStream } = require('fs')
// const Clarifai = require('clarifai')

// const app = new Clarifai.App({
//   apiKey: process.env.CLARIFAI_KEY
// })

const storeUpload = async ({ stream, filename }) => {
    const id = shortid.generate()
    const path = `images/${id}-${filename}`
  
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on('finish', () => resolve({ path }))
        .on('error', reject),
    )
  }

  

const processUpload = async upload => {
    const { createReadStream, filename, mimetype, encoding } = await upload
    const stream = createReadStream()
    const { path } = await storeUpload({ stream, filename })
    return path
  }

const imagepost = {
    async uploadImagePost(parent, { caption, image, title }, context) {
        const userId = getUserId(context);
        const imageUrl = await processUpload(image);
        // const imageFile = imageUrl.split('images/').pop()
        // console.log(imageFile)
        return context.prisma.createImagePost({
            caption,
            title,
            image: imageUrl,
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
