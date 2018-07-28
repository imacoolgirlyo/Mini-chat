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

    const handlemessage = (message) => {
        console.log(message);
    }

    // socket handler
    const handleSocketConnect = (socket) => {
        console.log(socket.id);
       socket.on('message', handlemessage);
    
    }
    server.listen(PORT, handleListening);
    app.use(logger("dev"));
    app.use(express.static(path.join(__dirname, "public")));
    io.on('connection', handleSocketConnect); // socket 연결
