var stuffs = require('../../app/controllers/stuffs.server.controller');

module.exports = function(app) {
    app.route('/stuffs')
        .post(stuffs.create)
        .get(stuffs.list);
};
