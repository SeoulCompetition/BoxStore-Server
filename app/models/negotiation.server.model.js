var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NegotiationSchema = new Schema({
  stationId: {
    type: Schema.Types.ObjectId,
    ref: 'Station'
  },
  price: {
    type: Number
  },
  done: {
    type: String,
    enum: ['None','Request','Done'],
    default: 'None'
  }
}, {versionKey: false});
