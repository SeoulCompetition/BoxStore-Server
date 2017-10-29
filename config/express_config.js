var express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  config = require('./config');

module.exports = function(){
  var app = express();

  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended : true,
    limit: '50mb'
  }));
  app.use(bodyParser.json({
    limit: '50mb'
  }));
  app.use(methodOverride());

  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/images.server.routes.js')(app);
  require('../app/routes/categories.server.routes.js')(app);
  require('../app/routes/stuffs.server.routes.js')(app);
  require('../app/routes/stations.server.routes.js')(app);
  require('../app/routes/keywords.server.routes.js')(app);
  require('../app/routes/cheat.server.routes.js')(app);
  app.use(express.static(__dirname + '/public'));
  return app;
}
