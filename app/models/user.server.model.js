var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
  username : {
    type : String,
    trim : true,
    required : true
  }
});

UserSchema.virtual('idpass').get(function(){
  return this.userid + ' ' + this.password;
});

UserSchema.set('toJSON',{ getters : true , virtuals : true});
mongoose.model('User', UserSchema);
