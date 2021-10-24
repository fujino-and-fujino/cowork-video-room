var express = require('express');
var router = express.Router();
const fs = require('fs');

var pathList = [
  "/express-app/app/assets/lena.png",
  "assets/lena.png",
];


var images = new Array();

for(var i = 0;i < images.length;++i){
  fs.readFile(pathList[i], (err, data)=>{
    images.append(data);
  });
}

router.get('/',(req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
  //res.status(201).send('ok')
  res.send('ok')
});

// /* GET home page. */
// router.get('/',(req, res, next) => {
//     var fileNames = [];

//     var data = {};
//     const files = fileNames.map(function (filename) {
//         filepath = path.join(__dirname, '../../uploads/output') + '/' + filename;
//        return readFile(filepath); //updated here
//     });

//     Promise.all(files).then(fileNames => {
//         response.data = fileNames;
//         res.json(response);
//     }).catch(error => {
//         res.status(400).json(response);
//     });

// /*
//   for(var i = 0;i < images.length;++i){
//     fs.readFile(pathList[i], (err, data)=>{
//       images.append(data);
//     });
//   }

//   res.send(images);
//   */
// });

router.post('/', (req, res, next)=>{
  //res.json(JSON.stringify(images));
})

module.exports = router;
