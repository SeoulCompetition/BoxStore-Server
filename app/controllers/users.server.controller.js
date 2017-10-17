var User = require('mongoose').model('User');
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
        uid: id,
    },{
	"_id": false,
	"uid": true,
	"name": true,
	"phoneNum" : true,
	"email": true,
	"userToken": true,
	"photoURL": true
	}
	).lean().exec(function(err, result) {
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
