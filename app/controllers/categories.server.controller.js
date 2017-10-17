var MongoClient = require("mongodb").MongoClient;


exports.list = function(req, res, next) {
    var category = req.params.category_id || null;
    var filter = {
                _id: 0,
                name: 1,
                parent: 1,
                description : 1
        };
    MongoClient.connect("mongodb://localhost:27017/seoul-competition", function(err, db) {
        db.collection("categories").findOne({"name" : category},
	filter,function (err,result) {
          if(result.index == 2 ){
            res.json({
              "result" : "SELECTED",
              "data" : category
            });
          }else {
            db.collection("categories").find({"parent":category},filter).toArray(function(err, result) {
                if (err) {
                    res.json({
                        "result": "ERR",
                        "messgae": "DB 에러"
                    });
                } else {
                    res.json({
                        "result": "SUCCESS",
                        "data": result
                    });
                }
            });
          }
        });
    });
};
