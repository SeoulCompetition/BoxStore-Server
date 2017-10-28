var Keyword = require('mongoose').model('Keyword');
exports.create = function(req, res, next) {
	console.log(req.body);
	var keywordName = req.body.name;
	Keyword.findOne({name:keywordName},function(err,result){
		console.log(err,result);
		if(err){
			console.log(err);
		}
		else if(result){
			console.log("more then 0");
		}else{
			console.log("no kewyord");
		}
	});
	res.send();
}
