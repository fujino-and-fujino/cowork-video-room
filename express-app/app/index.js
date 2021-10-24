var os = require('os');
const http = require("http")
var express = require('express');
const cors = require('cors');
const app = express()
const server = http.createServer(app)
// socket-io
const { Server } = require("socket.io");
const { send } = require('process');
const io = new Server(server)
//const app = http.createServer().listen(8000)
server.listen(8000, () => {
    console.log(`listening on *:8000`)
  })
  
console.log('listen 8000...')

//const io = Server.listen(app)
io.sockets.on('connection', socket => {
  console.log('complete connection')
  // convenience function to log server messages on the client
  function log(text) {
    socket.emit('log', `Message from server: ${text}`)
  }

  socket.on('message', message => {
    log(`Client said: ${message}`)
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message)
  })

  socket.on('create or join', room => {
    log('Received request to create or join room ' + room)

    const clientsInRoom = io.sockets.adapter.rooms[room]
    const numClients = clientsInRoom ? clientsInRoom.length : 0
    log('Room ' + room + ' now has ' + numClients + ' client(s)')

    if (numClients === 0) {
      socket.join(room)
      log('Client ID ' + socket.id + ' created room ' + room)
      socket.emit('created', room, socket.id)
    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room)
      io.sockets.in(room).emit('join', room)
      socket.join(room)
      socket.emit('joined', room, socket.id)
      io.sockets.in(room).emit('ready')
    } else {
      // max two clients
      socket.emit('full', room)
    }
  })

  socket.on('ipaddr', () => {
    const ifaces = os.networkInterfaces()
    for (const dev in ifaces) {
      ifaces[dev].forEach(details => {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address)
        }
      })
    }
  })

  socket.on('bye', () => {
    console.log('received bye')
  })

  socket.on('connect', () => {
    console.log('connect')
  })

  socket.on('disconnect', () => {
    console.log(`[disconnect] ${socket.id}`)
    console.log(Object.keys(io.sockets.connected))
  })
})

io.sockets.on('connect', socket => {
  console.log(`[connect] ${socket.id}`)
  console.log(Object.keys(io.sockets.connected))
})

// app.use(cors({
//     //origin: 'http://localhost:3000', //アクセス許可するオリジン
//     origin: '*', //アクセス許可するオリジン
//     credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//     optionsSuccessStatus: 200 //レスポンスstatusを200に設定
// }))
app.get('/', (req, res, next) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
});