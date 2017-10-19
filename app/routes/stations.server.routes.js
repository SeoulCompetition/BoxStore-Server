var stations = require('../../app/controllers/stations.server.controller');

module.exports = function(app){

  app.route('/station')
  .post(stations.create)
  .get(stations.list)
  .delete(stations.deleteAll);

  app.route('/station/:station_id')
  .get(stations.getStation)
  .put(stations.addStuffCount);

  app.route('/station/popular')
  .get(stations.stationRanking);
};
