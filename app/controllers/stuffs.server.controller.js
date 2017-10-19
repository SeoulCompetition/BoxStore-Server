var Stuff = require('mongoose').model('Stuff');
var Seller = require('mongoose').model('User');
var Station = require('mongoose').model('Station');
var stations = require('../../app/controllers/stations.server.controller');

//seller_id: User.uid, station_line: Station.line, station_name: Station.name
exports.create = function(req, res, next) {
  Station.findOne({line: req.body.stationLine, name: req.body.stationName})
    .exec(function(err, station){
      if(err) res.json(err);
      Seller.findOne({uid: req.body.sellerId})
        .exec(function(err, seller){
            if(err) {
              res.status(500).json({
                "result" : "ERR",
                "message": err
              });
            }
            var stuff = new Stuff(req.body);
            // stuff.price = req.body.price;
            // stuff.category = req.body.category;
            // stuff.seller_id = seller._id;
            // stuff.station_info = station._id;
            stuff.save(function(err) {
                if (err) {
                    res.status(500).json({
                        "result": "ERR",
                        "message": err
                    });
                } else {
                    stations.addCount(station._id);
                    res.json({
                        "result": "SUCCESS",
                        "message": "등록 성공"
                    });
                }
            });
        });
    });
};

exports.list = function(req, res) {
    // console.log(req.params.category);
    Stuff.find({
      category : req.params.category
    },function(err, stuffs) {
        if (err) {
            res.status(500).json({
                "result": "ERR",
                "message": err
            });
        } else {
            res.json({
              "result" : "SUCCESS",
              "stuffs":stuffs
            });
        }
    });
};

exports.info = function(req, res) {
    console.log(req.params.stuffId);
    Stuff.find({
      _id : req.params.stuffId
    },function(err, stuffs) {
        if (err) {
            res.status(500).json({
                "result": "ERR",
                "message": err
            });
        } else {
            res.json({
              "result": "SUCCESS",
              "stuffs" : stuffs
            });
        }
    });
};


//get '/stuffs/lately/:station_id/:page'
exports.latelyInfo = function(req, res){
  console.log(req.params.stationId);
  Stuff.find({ stationInfo : req.params.stationId})
    .sort({createdDate : -1})
    .skip((parseInt(req.params.page)-1)*6)
    .limit(6)
    .exec(function(err, stuffs) {
      if(err){
        res.status(500).json({
            "result": "ERR",
            "message": err
        });
      }else{
        res.json({
          "result":"SUCCESS",
          "stuffs":stuffs
        });
      }
    });
}
