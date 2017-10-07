var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
	user_id :{
		unique : true,
		type : String,
		trim : true,
		require : true
	},
	password : {
		type : String,
		trim : true,
		require : true
  	},
	user_name : {
		type : String,
		trim : true,
		require : true
  	},
	phone_number : {
		type : String,
		trim : true
	},
	join_date : {
		type : Date,
		default : Date.now
	}
});

//UserSchema.set('toJSON',{ getters : true }); get함수 필요할 때
mongoose.model('User', UserSchema);
