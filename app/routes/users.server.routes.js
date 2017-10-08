var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
    app.route('/users')
        .post(users.create);

    app.route('/users/:uid')
        .get(users.login);
    // app.param('userId', users.userByID);  //app.route보다 먼저 실행됨
};
