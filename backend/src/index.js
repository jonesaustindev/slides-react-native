const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')
const express = require('express')
const path = require('path')
const multer = require('multer')

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

// Serve static files
server.express.use('/images', express.static(path.join(__dirname, '../images')))
// Serve other routes to index...typical for Angular frontend app
// server.express.get('*', (req, res, next) => {
//    // Handle graphql-yoga specific routes
//    if(req.url == options.playground ||
//     req.url == options.subscriptions ||
//     req.url == options.endpoint) {
//       // Return next() so that the GraphQLServer will handle it
//       return next();
//     }
//    res.sendFile(path.join(__dirname, '../images'))
// });

server.start(() => console.log('Server is running on http://localhost:4000'))
