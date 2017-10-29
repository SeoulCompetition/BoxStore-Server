var cheat = require('../../app/controllers/cheat.server.controller');

module.exports = function(app){
  app.route('/cheat/:keyword')
    .get(cheat.checkCheat);
};
