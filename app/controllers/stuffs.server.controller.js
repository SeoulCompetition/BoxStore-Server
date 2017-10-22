var Stuff = require('mongoose').model('Stuff');
var Seller = require('mongoose').model('User');
var Station = require('mongoose').model('Station');
var stations = require('../../app/controllers/stations.server.controller');

var hide_id = {
  _id: 0
};

var stationFilter = {
  _id: 0,
  stuffCount: 0
};

//seller_id: User.uid, stationLine: Station.stationLine, stationName: Station.stationName
exports.create = function(req, res, next) {
  Station.findOne({stationName: req.body.stationName})
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
            stuff.sellerId = seller._id;
            stuff.stationId = station._id;
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

exports.createByAdmin = function(req, res){
  var stationNameArr = ['홍대입구','서울역','여의도','강남','건대입구','당산','시청','노원','사당','고속터미널'];
  var errArr = [];
  var endNum = 0;
  var stuffArr = req.body;
  stuffArr.forEach(function(item){
    Station.findOne({stationName: item.stationName})
      .exec(function(err, station){
        if(err) res.json(err);
        Seller.findOne({uid: item.sellerId})
          .exec(function(err, seller){
              if(err) errArr.push(err);
              else{
                var stuff = new Stuff(item);
                stuff.sellerId = seller._id;
                stuff.stationId = station._id;
                stuff.save(function(err) {
                    if(err) errArr.push(err);
                    endNum++;
                    if(endNum == stuffArr.length){
                      if(errArr.length) res.json(errArr);
                      else{
                        for(var i=0;i<stationNameArr.length;i++){
                            stations.setCount(stationNameArr[i], 10-i);
                        }
                        res.json({
                          "result": "SUCCESS",
                          "message": endNum+"개 등록성공"
                        });
                      }
                    }
                });
              }
          });
      });
  });
};

exports.list = function(req, res) {
    console.log(req.params.category);
    Stuff.find({
      category : req.params.category
    })
    .populate('sellerId', hide_id)
    .populate('stationId', stationFilter)
    .exec(function(err, stuffs) {
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
    })
    .select(hide_id)
    .populate('sellerId', hide_id)
    .populate('stationId', stationFilter)
    .exec(function(err, stuffs) {
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


//get '/stuffs/lately/:stationName/:page'
exports.latelyInfo = function(req, res){
  Station.findOne({stationName : req.params.stationName})
    .exec(function(err, station){
      Stuff.find({ stationId : station._id})
        .sort({createdDate : -1})
        .skip((parseInt(req.params.page)-1)*6)
        .limit(6)
        .populate('sellerId', hide_id)
        .populate('stationId', stationFilter)
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
    });
};
