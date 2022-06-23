const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const socketIo = require("socket.io")(server, {
    cors: {
        origin: process.env.FRONT_URL,
        credentials: true,
    },
});
const socket = require("./src/socket");

app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
socket(socketIo);

server.listen(process.env.PORT, () => {
    console.log('Server is running');
})