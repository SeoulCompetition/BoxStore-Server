var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var keywordSchema = new Schema({
	name : {
		type : String,
	},
	users : {
		type : Array
	}
}, {versionKey: false});

//UserSchema.set('toJSON',{ getters : true }); get함수 필요할 때
mongoose.model('Keyword', keywordSchema);
