var stuffs = require('../../app/controllers/stuffs.server.controller');

module.exports = function(app) {
    app.route('/stuffs')
        .post(stuffs.create)
        .get(stuffs.latelyInfoAll);

    app.route('/stuffs/list/:category')
        .get(stuffs.list);

    app.route('/stuffs/:stuffId')
        .get(stuffs.info);

    app.route('/stuffs/negotiation/:stuffId')
        .get(stuffs.getNegotiation)
        .put(stuffs.requestNegotiation);

    app.route('/stuffs/negotiation/confirm/:stuffId/:buyerId')
        .put(stuffs.confirmNegotiation);

    app.route('/stuffs/receipt/:stuffId')
        .get(stuffs.getReceipt)
        .put(stuffs.requestReceipt);

    app.route('/stuffs/receipt/confirm/:stuffId')
        .put(stuffs.confirmReceipt);

    app.route('/stuffs/lately/:stationName')
        .get(stuffs.latelyInfo);
};
