var Station = require('mongoose').model('Station');

//post'/station'
exports.create = function(req, res) {
    var station = new Station(req.body);
    station.stationId = req.body.line + '_' + req.body.name;
    // station.name = req.body.name;
    // station.line = req.body.line;
    console.log(station);

    station.save(function(err) {
        if (err) {
            res.status(500).json({
                "result": "ERR",
                "message": err
            });
        } else {
            res.json({
                "result": "SUCCESS",
                "message": "등록 성공"
            });
        }
    });
};

//get '/station'
exports.list = function(req, res) {
    Station.find()
        .sort({
            stationId: 1
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

//get '/station/:stationId'
exports.getStation = function(req, res) {
    Station.findOne({
            _id: req.params.stationId
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

//put '/station/:stationId'
exports.addStuffCount = function(req, res) {
    Station.findOne({
            _id: req.params.stationId
        })
        .exec(function(err, station) {
            if (err) {
                res.status(500).json({
                    "result": "ERR",
                    "message": err
                });
            } else {
                station.stuff_count = station.stuff_count + req.body.stuff_count;
                station.save(function(err2) {
                    if (err) {
                        res.status(500).json({
                            "result": "ERR",
                            "message": err
                        });
                    } else {
                        res.json({
                            "result": "SUCCESS",
                            "message": "success to add stuff count(+" + req.body.stuff_count + ")"
                        });
                    }
                })
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
                station.stuffCount = station.stuffCount + 1;
                station.save(function(err2) {
                    if (err2) {
                        return err2;
                    } else {
                        return true;
                    }
                })
            }
        });
};

//get '/station/popular'
exports.stationRanking = function(req, res) {
    Station.find()
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
