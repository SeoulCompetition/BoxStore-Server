var User = require('mongoose').model('User');

exports.create = function(req,res,next){
 var user = new User(req.body);
  user.save(function(err){
    if(err){
		if(err.code == "11000")
			res.json({
				"CODE" : "ERR",
				"ERR_CODE" : "DUP",
				"message" : "id 중복"
			});
      return next(err);
    }else{
      res.json({
		  "CODE" : "SUCCESS",
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
