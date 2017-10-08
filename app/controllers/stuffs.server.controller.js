var Stuff = require('mongoose').model('Stuff');
exports.create = function(req, res, next) {
    var stuff = new Stuff(req.body);
    stuff.save(function(err) {
        if (err) {
            res.status(500).json({
                "RESULT": "ERR",
                "ERR_CODE": "ERR_CODE",
                "message": err
            });
        } else {
            res.json({
                "RESULT": "SUCCESS",
                "message": "등록 성공"
            });
        }
    });
};

exports.list = function(req, res) {
    // console.log(req.params.category);
    Stuff.find({
      category : req.params.category
    },function(err, stuffs) {
        if (err) {
            res.status(500).json({
                "RESULT": "ERR",
                "ERR_CODE": "ERR_CODE",
                "message": err
            });
        } else {
            res.json(stuffs);
        }
    });
};

exports.info = function(req, res) {
    console.log(req.params.stuff_id);
    Stuff.find({
      _id : req.params.stuff_id
    },function(err, stuffs) {
        if (err) {
            res.status(500).json({
                "RESULT": "ERR",
                "ERR_CODE": "ERR_CODE",
                "message": err
            });
        } else {
            res.json(stuffs);
        }
    });
};
