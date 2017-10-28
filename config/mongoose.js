var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db, {
        useMongoClient: true
    });

    require('../app/models/user.server.model.js');
    require('../app/models/stuff.server.model.js');
    require('../app/models/station.server.model.js');
    require('../app/models/imageLink.server.model.js');
    require('../app/models/keyword.server.model.js'); 
   return db;
}
