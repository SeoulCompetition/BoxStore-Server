var Station = require('mongoose').model('Station');

//post'/station'
exports.create = function(req, res) {
  var errArr = [];
  var endNum = 0;
  var stationArr = req.body;
  stationArr.forEach(function(item){
    var station = new Station(item);
    station.save(function(err){
      if(err) errArr.push(err);
      endNum++;
      if(endNum == stationArr.length){
        if(errArr.length) res.json(errArr);
        else{
          res.json({
            "result": "SUCCESS",
            "message": endNum+"개 등록성공"
          });
        }
      }
    });
  });
};

//get '/station'
exports.list = function(req, res) {
    Station.find()
        .select({
          _id: 0
        })
        .sort({
            stationName: 1
        })
        .exec(function(err, stations) {
            if (err) {
                res.status(500).json({
                    "result": "ERR",
                    "message": err
                });
            } else {
                res.json({
                    "result": "SUCCESS",
                    "stations": stations
                });
            }
        });
};

//delete '/station'
exports.deleteAll = function(req, res) {
    var myquery = req.body;
    Station.deleteMany(myquery, function(err, obj) {
        if (err) {
            res.status(500).json({
                "result": "ERR",
                "message": err
            });
        } else {
            res.json({
                "result": "SUCCESS",
                "message": "삭제 성공"
            });
        }
    });
};

//get '/station/:stationName'
exports.getStation = function(req, res) {
    var reqStationName = req.params.stationName;
    reqStationName = reqStationName.trim();
    if(reqStationName[reqStationName.length-1] != "역"){
      reqStationName = reqStationName + "역";
    }
    Station.find({
            stationName: reqStationName
        })
        .select({
          _id: 0
        })
        .exec(function(err, stations) {
            if (err) {
                res.status(500).json({
                    "result": "ERR",
                    "message": err
                });
            } else {
                res.json({
                    "result": "SUCCESS",
                    "stations": stations
                });
            }
        });
};


exports.addCount = function(stationId) {
  Station.findOne({
          _id: stationId
    })
    .exec(function(err, station) {
        if (err) {
            return err;
        } else {
            station.stuffCount++;
            station.save(function(err2) {
                if (err2) {
                    return err2;
                } else {
                    return false;
                }
            })
        }
    });
  };

//get '/station/popular'
exports.stationRanking = function(req, res) {
    Station.find()
        .select({_id: 0})
        .sort({
            stuffCount: -1
        })
        .limit(10)
        .exec(function(err, stations) {
            if (err) {
                res.status(500).json({
                    "result": "ERR",
                    "message": err
                });
            } else {
                res.json({
                    "result": "SUCCESS",
                    "stations": stations
                });
            }
        });
};
