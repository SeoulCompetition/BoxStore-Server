var stations = require('../../app/controllers/stations.server.controller');

module.exports = function(app){

  app.route('/station')
  .post(stations.create)
  .get(stations.list);

  app.route('/station/:station_id')
  .get(stations.getStation)
  .post(stations.addStuffCount);

  app.route('/station/:line')
  .get(stations.stationRanking);
};
