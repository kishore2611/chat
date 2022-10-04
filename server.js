const express = require("express");
const app = express();
const http = require("http").createServer(app);
const env = require("dotenv");
env.config()

const PORT = process.env.PORT;


http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    try {
        res.sendFile(__dirname  + '/index.html');
    } catch (error) {
        res.send(error.message)
    }
})


// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})