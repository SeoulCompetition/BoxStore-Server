var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:user_id')
        .get(users.check);

    app.route('/users/login')
        .post(users.login);
    // 로그인

    // app.param('userId', users.userByID);  //app.route보다 먼저 실행됨
};
