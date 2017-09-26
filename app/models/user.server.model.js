var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
  username : {
    type : String,
    trim : true,
    required : true
  }
});

//UserSchema.set('toJSON',{ getters : true }); get함수 필요할 때
mongoose.model('User', UserSchema);
