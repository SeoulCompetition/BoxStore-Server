var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        trim: true,
    },
    phoneNum: {
        type: String,
        trim: true
    },
    join_date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String
    },
    userToken: {
        type: String
    },
    photoURL: {
        type: String
    }
});

//UserSchema.set('toJSON',{ getters : true }); get함수 필요할 때
mongoose.model('User', UserSchema);
