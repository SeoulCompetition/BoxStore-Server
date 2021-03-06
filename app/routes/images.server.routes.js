var images = require('../../app/controllers/images.server.controller');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'config/public/original/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

module.exports = function(app){
  app.route('/stuffs/images/:stuffId')
    .post(upload.array('photo', 8), images.uploadForStuff)
    .get(images.getStuffImages);

  app.route('/receipt/images/:stuffId')
    .post(upload.single('photo'), images.uploadForReceipt)
    .get(images.getReceiptImage);

  app.route('/stations/images/:stationName')
    .get(images.getMap);
};
