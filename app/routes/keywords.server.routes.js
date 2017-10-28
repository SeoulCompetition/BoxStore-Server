var keywords = require('../../app/controllers/keywords.server.controller');

module.exports = function(app) {
    app.route('/keywords')
        .post(keywords.create);

};
