var stuffs = require('../../app/controllers/stuffs.server.controller');

module.exports = function(app) {
    app.route('/stuffs')
        .post(stuffs.create);

    app.route('/stuffs/list/:category')
        .get(stuffs.list);

    app.route('/stuffs/:stuffId')
        .get(stuffs.info);

    app.route('/stuffs/lately/:stationId/:page')
        .get(stuffs.latelyInfo);
};
