require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start(server => {
    console.log(`Server is now running on port ${server.port}`);
})