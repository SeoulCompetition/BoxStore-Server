var Keyword = require('mongoose').model('Keyword');
exports.create = function(req, res, next) {
	var id = req.body.uid;
	var token = req.body.userToken;
	var keywordName = req.body.keyword;
	Keyword.findOne({name:keywordName},function(err,result){
		if(err){
			console.log(err);
			res.json( {
					"result" : "ERR",
					"message" : "db 에러"
				});
		}
		else if(result){
			console.log("more then 0");
			Keyword.update({	
				name : keywordName
			},{
				$addToSet: { users :token}
			},function(err,result){
				res.json( {
					"result" : "DUPLICATE",
					"message" : "이미 등록한 키워드"
				});
			});
		}else{
			console.log("no kewyord");
			var saveKeyword = new Keyword({
				"name":keywordName,
				"users" :[token]
			});
			saveKeyword.save(function(err,result){
				res.json( {
					"result" : "SUCCESS",
					"message" : "키워드 등록 성공"
				});
			});
		}
	});
};