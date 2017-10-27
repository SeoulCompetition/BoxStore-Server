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
    },
    transactionStatus: {
        type: String,
        enum : ['Sell', 'Selling', 'Sold'],
        default: "Sell"
    },
    stuffState: {
        type: String
    },
    postType: {
        type: String
    },
    negotiation: {
        stationId: {
          type: Schema.Types.ObjectId,
          ref: 'Station',
          defalut: 'None'
        },
        price: {
          type: Number,
          default: 0
        },
        done: {
          type: String,
          // 'None', 'Request', 'Done'
          default: 'None'
        }
    }
    // location 형식에 맞게 추가
}, {versionKey: false});

mongoose.model('Stuff', StuffSchema);