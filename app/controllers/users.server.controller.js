var User = require('mongoose').model('User');
exports.create = function(req,res,next){
 var user = new User(req.body);
  user.save(function(err){
    if(err){
		if(err.code == "11000") // mongodb duplicate code
			res.json({
				"RESULT" : "ERR",
				"ERR_CODE" : "DUP",
				"message" : "id 중복"
			});
      return next(err);
    }else{
      res.json({
		  "RESULT" : "SUCCESS",
		  "message" : "회원가입 성공"
		});
    }
  });
};

exports.list = function(req,res,next){
  User.find(function(err,users){
    if(err){
      return next(err);
    }else{
      res.json(users);
    }
  });
};

exports.read = function(req,res){
  res.json(req.user);
};

exports.userByID = function(req,res,next,id){
  User.findOne({
    userid : id
  }, function(err, user){
    if(err){
      return next(err);
    }else{
      req.user = user;
      next();
    }
  });
};

exports.update = function(req,res,next){
  User.findByIdAndUpdate(req.user.id, req.body, function(err,user){
    if(err){
      return next(err);
    }else{
      res.json(user);
    }
  });
};

exports.delete = function(req,res,next){
  req.user.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.user);
    }
  });
};

exports.login = function(req,res){
	var id = req.body.user_id;
	var pw = req.body.password;
	User.findOne({
		user_id : id,
		password : pw
	},function(err, result){
		if(err){
			res.json({
				"RESULT" : "ERR",
				"ERR_CODE" : "DB_ERR",
				"message" : "db 에러"
			});
		}else{
			if(result){
				res.json({
					"RESULT" : "SUCCESS",
					"message" : "로그인 성공"
				});
			}else{
				res.json({
					"RESULT" : "FAIL",
					"message" : "ID 혹은 PW를 확인하세요"
				});
			}
		}
	});
};