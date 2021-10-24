var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var p2pRouter = require('./routes/p2p');

var app = express();
app.disable('etag');

//var http = require("http").Server(app);
//var io   = require("socket.io")(http);
// var server = http.createServer(app);
// var io   = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/p2p', p2pRouter);

// io.sockets.on('connection', function(socket){
//   console.log('a user connected');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// io.sockets.on('connection', socket => {
//   console.log("clear 2nd");
//   // convenience function to log server messages on the client
//   function log(text) {
//     socket.emit('log', `Message from server: ${text}`)
//   }
//   socket.on('message', message => {
//     console.log(`Client said: ${message}`)
//     // for a real app, would be room-only (not broadcast)
//     socket.broadcast.emit('message', message)
//   })
//   socket.on('create or join', room => {
//     console.log('Received request to create or join room ' + room)
//     const clientsInRoom = io.sockets.adapter.rooms[room]
//     const numClients = clientsInRoom ? clientsInRoom.length : 0
//     console.log('Room ' + room + ' now has ' + numClients + ' client(s)')
//     if (numClients === 0) {
//       socket.join(room)
//       console.log('Client ID ' + socket.id + ' created room ' + room)
//       socket.emit('created', room, socket.id)
//     } else if (numClients === 1) {
//       console.log('Client ID ' + socket.id + ' joined room ' + room)
//       io.sockets.in(room).emit('join', room)
//       socket.join(room)
//       socket.emit('joined', room, socket.id)
//       io.sockets.in(room).emit('ready')
//     } else {
//       // max two clients
//       socket.emit('full', room)
//     }
//   })
//   socket.on('ipaddr', () => {
//     const ifaces = os.networkInterfaces()
//     for (const dev in ifaces) {
//       ifaces[dev].forEach(details => {
//         if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
//           socket.emit('ipaddr', details.address)
//         }
//       })
//     }
//   })
//   socket.on('bye', () => {
//     console.log('received bye')
//   })
//   socket.on('connect', () => {
//     console.log('connect')
//   })
//   socket.on('disconnect', () => {
//     console.log(`[disconnect] ${socket.id}`)
//     console.log(Object.keys(io.sockets.connected))
//   })
// })
// io.sockets.on('connect', socket => {
//   console.log(`[connect] ${socket.id}`)
//   console.log(Object.keys(io.sockets.connected))
// })


module.exports = app;
