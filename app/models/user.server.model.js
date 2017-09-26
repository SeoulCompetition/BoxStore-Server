var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
	user_id :{
		unique : true,
		type : String,
		trim : true,
		require : true,
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
	}
	
});

UserSchema.virtual('idpass').get(function(){
  return this.user_id + ' ' + this.password;
});

UserSchema.set('toJSON',{ getters : true , virtuals : true});
mongoose.model('User', UserSchema);
