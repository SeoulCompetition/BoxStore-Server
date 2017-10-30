
var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
    app.route('/users')
        .post(users.create)
        .get(users.read);

    app.route('/users/:uid')
        .get(users.login);

    // app.route('/users/keeping/:stuffId')
    //     .post(users.keepStuff);

	app.route('/users/keywords')
		.post(users.keywords_create);
	app.route('/users/:uid/keywords')
		.get(users.keywords_list);
};
