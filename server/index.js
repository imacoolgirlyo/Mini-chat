const express = require("express"),
    socketIO = require("socket.io"),
    http = require("http"),
    path = require("path"),
    logger = require("morgan"),
    app = express(),
    server = http.createServer(app),
    io = socketIO(server),
    db = require('./db'),
    Message = require('./models');
    
    console.log(db);

    const PORT = 4000;

    const handleListening = () => {
        console.log(`✅ Server Running on : http://localhost:${PORT}`);
    }
    // socket handler
    const handleSocketConnect = (socket) => {
       socket.on('new message sent', data => {
           const {message , creator} = data;
           Message.create({
               message,
               creator
           });
            socket.broadcast.emit('notification', data);
       });
    }

    const handleGetMessages = (req, res) => {
        console.log("this is server")
        Message.find().then(messages => res.json({messages}));
    }

    app.get("/messages", handleGetMessages);

    server.listen(PORT, handleListening);
    app.use(logger("dev"));
    app.use(express.static(path.join(__dirname, "public")));
    io.on('connection', handleSocketConnect); // socket 연결
