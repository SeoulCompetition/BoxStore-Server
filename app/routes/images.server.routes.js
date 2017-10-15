var images = require('../../app/controllers/images.server.controller');

module.exports = function(app){
  app.route('/images')
  .post(images.upload);
};
