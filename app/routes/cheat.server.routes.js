var cheat = require('../../app/controllers/cheat.server.controller');

module.exports = function(app){
  app.route('/cheat/:uid')
    .get(cheat.checkCheat);
};
