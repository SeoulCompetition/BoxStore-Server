var stuffs = require('../../app/controllers/stuffs.server.controller');

module.exports = function(app) {
    app.route('/stuffs')
        .post(stuffs.create);

    app.route('/stuffs/list/:category')
        .get(stuffs.list);

    app.route('/stuffs/:stuffId')
        .get(stuffs.info);

    app.route('/stuffs/negotiation/:stuffId')
        .get(stuffs.getNegotiation)
        .put(stuffs.requestNegotiation);

    app.route('/stuffs/negotiation/confirm/:stuffId')
        .put(stuffs.confirmNegotiation);

    app.route('/stuffs/lately/:stationName/:page')
        .get(stuffs.latelyInfo);

    app.route('/stuffs/admin')
        .post(stuffs.createByAdmin);
};
