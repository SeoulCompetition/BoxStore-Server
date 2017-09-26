var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
  username : {
    type : String,
    trim : true,
    required : true
  },
  userid : {
    type : String,
    trim : true,
    unique : true,
    required : true
  },
  password : {
    type : String,
    validate : [
      function(password){
        return password.length >= 8;
      },
      'Password should be at least 8 characters'
    ],
    required : true
  },
  email : {
    type : String,
    trim : true,
    index : true,
    required : true
  },
  created : {
    type : Date,
    default : Date.now
  },
  website : {
    type : String,
    get : function(url){
      if(!url){
        return url;
      }else{
        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
          url = 'http://'+url;
        }
        return url;
      }
    }
  },
  job : {
    type : String,
    enum : ['Student','Intern','Soldier','jobless']
  }
});

UserSchema.virtual('idpass').get(function(){
  return this.userid + ' ' + this.password;
});

UserSchema.set('toJSON',{ getters : true , virtuals : true});
mongoose.model('User', UserSchema);
