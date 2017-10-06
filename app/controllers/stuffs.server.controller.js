var Stuff = require('mongoose').model('Stuff');
exports.create = function(req, res, next) {
    var stuff = new Stuff(req.body);
    stuff.save(function(err) {
        if (err) {
            res.json({
                "RESULT": "ERR",
                "ERR_CODE": "ERR_CODE",
                "message": "ERR_MSG"
            });
        } else {
            res.json({
                "RESULT": "SUCCESS",
                "message": "등록 성공"
            });
        }
    });
};

exports.list = function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};
