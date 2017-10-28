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
    .post(upload.array('photo', 8), images.uploadForStuff);

  app.route('/stuffs/images/:linkType/:stuffId/:sizeType')
    .get(images.getImageLink);

  app.route('/receipt/images/:stuffId')
    .post(upload.single('photo'), images.uploadForReceipt);
};