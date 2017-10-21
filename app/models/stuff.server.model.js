var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StuffSchema = new Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stuffName: {
        type: String
    },
    stuffInfo: {
        type: String
    },
    price: {
        type: Number,
        require: true
    },
    transactionStatus: {
        type: String,
        default: "Sell"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    stationId: {
        type: Schema.Types.ObjectId,
        ref: 'Station'
    },
    imageUrl: {
        type: Array
    },
    category: {
        type: String
    }
    // location 형식에 맞게 추가
}, {versionKey: false});

mongoose.model('Stuff', StuffSchema);
