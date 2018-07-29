const express = require("express"),
    socketIO = require("socket.io"),
    http = require("http"),
    path = require("path"),
    logger = require("morgan"),
    app = express(),
    server = http.createServer(app),
    io = socketIO(server);

    const PORT = 4000;

    const handleListening = () => {
        console.log(`✅ Server Running on : http://localhost:${PORT}`);
    }
    // socket handler
    const handleSocketConnect = (socket) => {
       socket.on('message', data => {
            socket.broadcast.emit('new message', data);
       });
    }

    server.listen(PORT, handleListening);
    app.use(logger("dev"));
    app.use(express.static(path.join(__dirname, "public")));
    io.on('connection', handleSocketConnect); // socket 연결
