var images = require('../../app/controllers/images.server.controller');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

module.exports = function(app){
  app.route('/stuffs/images/:stuffId')
    .post(upload.array('photos', 8), images.uploadForStuff);
  app.route('/receipt/images/:stuffId')
    .post(images.uploadForReceipt);

};
