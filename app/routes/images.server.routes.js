var images = require('../../app/controllers/images.server.controller');

module.exports = function(app){
  app.route('/images')
  .get(images.list)
  .post(images.upload);

  app.route('/images/:imageName')
  .get(images.getImage);

  app.route('/google_drive_authorized')
  .get(images.renderAuthorized);
};
