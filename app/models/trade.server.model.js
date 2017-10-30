var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var tradeSchema = new Schema({
    stuffId: {
      type: String
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    point: {
      type: Number
    }
}, {versionKey: false});

mongoose.model('Trade', tradeSchema);
