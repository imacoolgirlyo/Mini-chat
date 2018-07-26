const express = require("express"),
    socketIO = require("socket.io"),
    http = require("http"),
    path = require("path"),
    app = express(),
    server = http.createServer(app),
    io = socketIO(server);



    const PORT = 4000;

    const handleListening = () => 
        console.log(`✅ Server Running on : http://localhost:${PORT}`);

    server.listen(PORT, handleListening);
    app.use(express.static(path.join(__dirname, "pubilc")))