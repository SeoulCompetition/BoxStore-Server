
var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
    app.route('/users')
        .post(users.create)
        .get(users.read);

    app.route('/users/:uid')
        .get(users.login);

    app.route('/users/keeping/:uid')
        .get(users.getKeepingStuffs);
    app.route('/users/keeping/:uid/:stuffId')
        .post(users.keepStuff);

  	app.route('/users/keywords')
  		.post(users.keywords_create);
  	app.route('/users/:uid/keywords')
  		.get(users.keywords_list);

    app.route('/users/point/:uid')
        .get(users.getPoint)
        .put(users.addpoint);

	app.route('/users/:uid/reviews')
		.post(users.write_reviews)
		.get(users.reviews_list);

};
