var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var stationSchema = new Schema({
    stationName: { //서울역
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    stuffCount: {
      type: Number,
      default: 0
    }
    // location 형식에 맞게 추가
}, {versionKey: false});

mongoose.model('Station', stationSchema);
