var User = require('mongoose').model('User');
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            if (err.code == "11000") { // mongodb duplicate code
                res.status(500).json({
                    "RESULT": "ERR",
                    "ERR_CODE": "DUP",
                    "message": "id 중복"
                });
            } else {
                res.status(500).json({
                    "RESULT": "ERR",
                    "ERR_CODE": "DB_ERR",
                    "message": "db 에러"
                });
            }
        } else {
            res.json({
                "RESULT": "SUCCESS",
                "message": "회원가입 성공"
            });
        }
    });
};


exports.login = function(req, res) {
    var id = req.params.uid;
    User.findOne({
        uid: id,
    }, function(err, result) {
        if (err) {
            res.status(500).json({
                "RESULT": "ERR",
                "ERR_CODE": "DB_ERR",
                "message": "db 에러"
            });
        } else {
            if (result) {
                res.json({
                    "RESULT": "SUCCESS",
                    "message": "로그인 성공",
                    "user_info" : result
                });
            } else {
                res.status(404).send("Login Fail");
            }
        }
    });
};
