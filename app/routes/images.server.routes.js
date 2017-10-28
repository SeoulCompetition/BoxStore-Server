var images = require('../../app/controllers/images.server.controller');

module.exports = function(app){
  app.route('/stuffs/images/:stuffId')
    .post(images.uploadForStuff);

};
