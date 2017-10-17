var MongoClient = require("mongodb").MongoClient;


exports.list = function(req, res, next) {
    var category = req.params.category_id || null;
    MongoClient.connect("mongodb://localhost:27017/seoul-competition", function(err, db) {
        db.collection("categories").findOne({"name" : category},
	{
		"_id": false,
		"name": true,
		"parent": true,
		"description" : true
	).lean().exec(function (err,result) {
          if(result.index == 2 ){
            res.json({
              "RESULT" : "SELECTED",
              "DATA" : category
            });
          }else {
            db.collection("categories").find({"parent":category}).toArray(function(err, result) {
                if (err) {
                    res.json({
                        "RESULT": "ERR",
                        "messgae": "DB 에러"
                    });
                } else {
                    res.json({
                        "RESULT": "SUCCES",
                        "DATA": result
                    });
                }
            });
          }
        });
    });
};
