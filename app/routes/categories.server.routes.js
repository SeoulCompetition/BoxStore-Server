var categories = require('../../app/controllers/categories.server.controller');

module.exports = function(app) {
    app.route('/categories/:category_id')
        .get(categories.list);
};
