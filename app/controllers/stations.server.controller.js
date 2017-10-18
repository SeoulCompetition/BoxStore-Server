var Station = require('mongoose').model('Station');

//post'/station'
exports.create = function(req, res){
  var station = new Station(req.body);
  station.save(function(err) {
      if (err) {
          res.status(500).json({
              "RESULT": "ERR",
              "ERR_CODE": "ERR_CODE",
              "message": err
          });
      } else {
          res.json({
              "RESULT": "SUCCESS",
              "message": "등록 성공"
          });
      }
  });
};

//get '/station'
exports.list = function(req, res){
  Station.find({},function(err, stations) {
      if (err) {
        res.status(500).json({
            "RESULT": "ERR",
            "ERR_CODE": "ERR_CODE",
            "message": err
        });
      } else {
        console.log(stations);
        res.json(stations);
      }
  });
};

//get '/station/:station_id'
exports.getStation = function(req, res){

};

//post '/station/:station_id'
exports.addStuffCount = function(req, res){

};

//get '/station/:line'
exports.stationRanking = function(req, res){

};
