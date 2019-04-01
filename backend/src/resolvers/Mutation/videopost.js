const { getUserId } = require('../../utils')
const shortid = require('shortid')
const { createWriteStream } = require('fs')

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

const videopost = {
    async uploadVideoPost(parent, { caption, video, title }, context) {
        const userId = getUserId(context);
        const videoUrl = await processUpload(video);
        return context.prisma.createVideoPost({
            caption,
            title,
            video: videoUrl,
            user: { connect: { id: userId } },
        })
    },
    async deleteVideoPost(parent, { id }, context) {
        const userId = getUserId(context)
        const postExists = await context.prisma.$exists.videoPost({
          id,
          user: { id: userId },
        })
        if (!postExists) {
          throw new Error(`Post not found or you're not the author`)
        }
    
        return context.prisma.deleteVideoPost({ id })
      },
}
module.exports = { videopost }
