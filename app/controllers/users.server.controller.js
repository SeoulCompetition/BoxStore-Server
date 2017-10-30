var User = require('mongoose').model('User');
var Stuff = require('mongoose').model('Stuff');
var request = require("request");

var sellerFilter = {_id: 0,   point: 0, keeping: 0, keyword: 0, join_date: 0};
var stationFilter = {_id: 0, stuffCount: 0};
var stuffFilter = {negotiation: 0, receipt: 0};

exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            if (err.code == "11000") { // mongodb duplicate code
                res.status(500).json({
                    "result": "ERR",
                    "message": "id 중복"
                });
            } else {
                res.status(500).json({
                    "result": "ERR",
                    "message": "db 에러"
                });
            }
        } else {
            res.json({
                "result": "SUCCESS",
                "message": "회원가입 성공"
            });
        }
    });
};


exports.login = function(req, res) {
    var id = req.params.uid;
    User.findOne({
        uid: id
    },{
	"_id": false,
	"uid": true,
	"name": true,
	"phoneNum" : true,
	"email": true,
	"userToken": true,
	"photoURL": true
	}).lean().exec(function(err, result) {
        if (err) {
	            res.status(500).json({
        	        "result": "ERR",
                	"message": "db 에러"
	            });
        } else {
            if (result) {
                res.json({
                    "result": "SUCCESS",
                    "message": "로그인 성공",
                    "userInfo" : result
                });
            } else {
                res.status(404).json({
			"result": "ERR",
			"message": "로그인 실패"
		});
            }
        }
    });
};
exports.keywords_create = function(req,res){
	var id = req.body.uid;
	var keyword = req.body.keyword;
	var thisRes= res;
	var token = req.params.userToken;
	User.findOne({
		uid : id
	}).lean().exec(function(err,result){
		if(err){
			res.status(500).json({
				"result":"ERR",
				"message":"db에러"
			});
		}else if(result) {
			User.update({
				uid : id
			},{
				$addToSet: {keywords : keyword}
			},function(err,res){
				if(err){

				}else if(res){
					var options = {
					  uri: 'http://rlatjdwn9410.run.goorm.io/keywords',
					  method: 'POST',
					  json: {
						  "uid" : id,
						  "keyword" : keyword,
						  "userToken" : token
					  }
					};

					 request(options, function(err,result, body) {
						 console.log(body);
						 if(err){
							 thisRes.status(500).json({
								 "result" : "err",
								 "message" : "server error"
							 });
						 }else {
							 thisRes.json(body);
						 }
					 });
				}
			});
		}else {
			res.status(404).json({
				"result":"ERR",
				"message":"잘못된 유저아이디"
			});
		}
	});
};
exports.keywords_list = function(req,res){
	var id = req.params.uid;
	 User.findOne({
        uid: id
    },{
		"keywords" : true
	}).lean().exec(function(err, result) {
        if (err) {
	            res.status(500).json({
        	        "result": "ERR",
                	"message": "db 에러"
	            });
        } else {
            if (result) {
                res.json({
                    "result": "SUCCESS",
                    "message": "로그인 성공",
                    "keywordList" : result.keywords
                });
            } else {
                res.status(404).json({
			"result": "ERR",
			"message": "로그인 실패"
		});
            }
        }
    });
};

exports.read = function(req,res){
  User.find()
    .exec(function(err, user){
      if(err) res.json(err);
      res.json(user);
    });
};

//post'/users/keeping/:uid/:stuffId'
exports.keepStuff = function(req, res){
  User.update({uid:req.params.uid},
    {
      $addToSet:{
        keeping:req.params.stuffId
      }
    }, function(err, result){
      if(err){
        res.status(500).json({
            "result": "ERR",
            "message": err
        });
      }
      res.json({
          "result": "SUCCESS",
          "message": "saved stuff"
      });
    });
};

//get'/users/keeping/:uid'
exports.getKeepingStuffs = function(req, res){
  User.findOne({uid:req.params.uid})
    .exec(function(err,user){
      if(err){
        res.status(500).json({
            "result": "ERR",
            "message": err
        });
      }
      var stuffsId = user.keeping;
      var stuffsArr = [];
      var arrLength = stuffsId.length;
      if(!arrLength){
        res.json({
            "result": "Empty",
            "message": "keeping array has no stuff"
        });
      }
      stuffsId.forEach(function(item){
          Stuff.findById(item)
            .select(stuffFilter)
            .populate('sellerId', sellerFilter)
            .populate('stationId', stationFilter)
            .exec(function(err, stuff){
              if(err){
                res.status(500).json({
                    "result": "ERR",
                    "message": err
                });
              }
              stuffsArr.push(stuff);
              arrLength--;
              if(!arrLength)
                res.json(stuffsArr);
            });
      });
    });
};

//put '/users/point/:uid'
exports.addpoint = function(req,res){
  User.findOne({uid:req.params.uid})
    .exec(function(err,user){
      if(err) res.json(err);
      user.point = user.point +50000;
      user.save(function(err){
        if(err) res.json(err);
        res.json({
            "result": "SUCCESS",
            "point": user.point
        });
      })
    });
};

//get '/users/point/:uid'
exports.getPoint = function(req, res){
  User.findOne({uid:req.params.uid})
    .exec(function(err,user){
      if(err) res.json(err);
      res.json({
          "result": "SUCCESS",
          "point": user.point
      });
    });
};
