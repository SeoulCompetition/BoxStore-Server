var images = require('../../app/controllers/images.server.controller');

module.exports = function(app){
  app.route('/images')
  .get(images.list)
  .post(images.upload);

  app.route('/google_drive_authorized')
  .get(images.renderAuthorized);
};
