var express = require('express');
var router = express.Router();
const http = require("http").createServer(express);
//const io   = require("socket.io")(http);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('ok');
});
module.exports = router;