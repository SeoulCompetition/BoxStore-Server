var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StuffSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        require: true
    },
    transaction_status: {
        type: String,
        default: "Sell"
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    station_info: {
        type: Schema.Types.ObjectId,
        ref: 'Station'
    },
    raw_img_urls: {
        type: Array
    },
    resized_img_urls: {
        type: Array
    },
    category : {
        type : String
    }
    // location 형식에 맞게 추가
});

mongoose.model('Stuff', StuffSchema);
