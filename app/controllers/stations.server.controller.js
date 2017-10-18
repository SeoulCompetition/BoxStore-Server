var Station = require('mongoose').model('Station');

//post'/station'
exports.create = function(req, res){
  var station = new Station();
  station.station_id = req.body.line + '_' + req.body.name;
  station.name = req.body.name;
  station.line = req.body.line;

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
  Station.find()
  .sort({station_id : 1})
  .exec(function(err, stations) {
      if (err) {
        res.status(500).json({
            "RESULT": "ERR",
            "ERR_CODE": "ERR_CODE",
            "message": err
        });
      } else {
        res.json(stations);
      }
  });
};

//delete '/station'
exports.deleteAll = function(req ,res){
  var myquery = req.body;
  Station.deleteMany(myquery, function(err, obj){
    if (err) {
      res.status(500).json({
          "RESULT": "ERR",
          "ERR_CODE": "ERR_CODE",
          "message": err
      });
    } else {
      res.json({
        "RESULT" : "SUCCESS",
        "message" : "삭제 성공"
      });
    }
  });
};

//get '/station/:station_id'
exports.getStation = function(req, res){
  Station.findOne({
    _id : req.params.station_id
  })
  .exec(function(err, stations) {
      if (err) {
        res.status(500).json({
            "RESULT": "ERR",
            "ERR_CODE": "ERR_CODE",
            "message": err
        });
      } else {
        res.json(stations);
      }
  });
};

//put '/station/:station_id'
exports.addStuffCount = function(req, res){
  Station.findOne({
    _id : req.params.station_id
  })
  .exec(function(err, station) {
      if (err) {
        res.status(500).json({
            "RESULT": "ERR",
            "ERR_CODE": "ERR_CODE",
            "message": err
        });
      } else {
        station.stuff_count = station.stuff_count + req.body.stuff_count;
        station.save(function(err2){
          if (err) {
            res.status(500).json({
                "RESULT": "ERR",
                "ERR_CODE": "ERR_CODE",
                "message": err
            });
          }else{
            res.json({
              "RESULT" : "SUCCESS",
              "message" : "success to add stuff count(+" + req.body.stuff_count + ")"
            });
          }
        })
      }
  });
};

//get '/station/line/:line_number'
exports.stationRanking = function(req, res){
  Station.find({line : req.params.line_number+"호선"})
  .sort({stuff_count : -1})
  .exec(function(err, stations) {
    if(err){
      res.status(500).json({
          "RESULT": "ERR",
          "ERR_CODE": "ERR_CODE",
          "message": err
      });
    }else{
      console.log(stations);
      res.json(stations[0]);
    }
  });
};
