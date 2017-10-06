var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var StuffSchema = new Schema({
	stuff_id :{
		unique : true,
		type : String,
		trim : true,
		require : true,
	},
	seller_id :{
		type : String,
		trim : true,
		require : true
	},
	price : {
		type : Number,
		require : true
	},
	transaction_status : {
		type : String,
		default : "Sell"
	},
	created_date : {
		type : Date,
		default : Date.now
	}
	// location 형식에 맞게 추가	
});

//UserSchema.set('toJSON',{ getters : true }); get함수 필요할 때
mongoose.model('Stuff', StuffSchema);
