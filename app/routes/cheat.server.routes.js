var cheat = require('../../app/controllers/cheat.server.controller');

module.exports = function(app){
  app.route('/cheat')
    .post(cheat.checkCheat);
};
