var images = require('../../app/controllers/images.server.controller');

module.exports = function(app){
  app.route('/images')
  .get(images.list);

  app.route('/images/:imageName')
  .get(images.getImage);
};
