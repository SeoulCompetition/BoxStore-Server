var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var imageLinkSchema = new Schema({
    linkType: {
       type: String
    },
    key: {
      type: String
    },
    sizeType:{
      type: String
    },
    imageUrl: {
      type: String
    }

}, {versionKey: false});

mongoose.model('ImageLink', imageLinkSchema);
