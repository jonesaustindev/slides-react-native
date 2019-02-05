require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use((req, res, next) => {
    // const { token } = req.cookies;
    // if(token) {
    //     const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //     req.userId = userId;
    // }
    console.log(JSON.stringify(req.headers.authorization));
    next();
});

server.start(server => {
    console.log(`Server is now running on port ${server.port}`);
})