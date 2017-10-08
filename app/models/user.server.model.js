var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        require: true
    },
    user_id: {
        type: String,
        trim: true,
        require: true,
    },
    user_name: {
        type: String,
        trim: true,
    },
    phone_number: {
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
    user_token: {
        type: String
    },
    photo_url: {
        type: String
    }
});

//UserSchema.set('toJSON',{ getters : true }); get함수 필요할 때
mongoose.model('User', UserSchema);
