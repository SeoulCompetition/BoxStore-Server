var fs = require('fs');
var Stuff = require('mongoose').model('Stuff');
var sharp = require('sharp');

var IMAGE_PATH = './config/public/original/';
var THUMBNAIL_PATH = './config/public/thumbnails/';
var MAP_PATH = './config/public/map/'
var IMAGE_URL = 'http://52.78.22.122:3000/original/';
var THUMBNAIL_URL = 'http://52.78.22.122:3000/thumbnails/';
var MAP_URL = 'http://52.78.22.122:3000/map/';
var WIDE_SIZE = 400;

exports.uploadForReceipt = function(req, res){
  var imageName = req.file.originalname;
  Stuff.findById(req.params.stuffId)
      .exec(function(err, stuff){
        sharp(IMAGE_PATH + imageName)
        .resize(WIDE_SIZE)
        .png()
        .toFile(THUMBNAIL_PATH + imageName.split('.')[0] + '.png', function(err){
          if(err) console.log('sharp.toFile error: ' + err);
          else{
            stuff.receipt.imageUrl = THUMBNAIL_URL+itemName.split('.')[0]+'.png';
            stuff.save(function(err){
              if(err){
                res.status(500).json({
                  "result" : "ERR",
                  "message": err
                });
              }else{
                res.json({
                  "result" : "SUCCESS",
                  "message" : "saved image url to db"
                });
              }
          });
        }
  });
});
};


exports.uploadForStuff = function(req, res){
  var imageArr = req.files;
  var imageUrls =[];
  var arrSize = imageArr.length;
  imageArr.forEach(function(item){
    var imageName = item.originalname;
    sharp(IMAGE_PATH + imageName)
    .resize(WIDE_SIZE)
    .png()
    .toFile(THUMBNAIL_PATH + imageName.split('.')[0] + '.png', function(err){
      if(err) console.log('sharp.toFile error: ' + err);
      else{
        imageUrls.push(THUMBNAIL_URL+imageName.split('.')[0] + '.png');
        arrSize--;
        if(!arrSize){
          Stuff.findById(req.params.stuffId)
            .exec(function(err, stuff){
                stuff.imageUrl = imageUrls;
                stuff.save(function(err){
                  if(err){
                    res.status(500).json({
                      "result" : "ERR",
                      "message": err
                    });
                  }else{
                    res.json({
                      "result" : "SUCCESS",
                      "message" : "saved image url to db"
                    });
                  }
              });
          });
        }
      }
    });
  });
};

exports.getStuffImages = function(req ,res){
  Stuff.findById(req.params.stuffId)
      .exec(function(err, stuff){
        if(err){
          res.status(500).json({
            "result" : "ERR",
            "message": err
          });
        }else{
          res.json(stuff.imageUrl);
        }
      });
};

exports.getReceiptImage = function(req, res){
  Stuff.findById(req.params.stuffId)
      .exec(function(err, stuff){
        if(err){
          res.status(500).json({
            "result" : "ERR",
            "message": err
          });
        }else{
          res.json(stuff.receipt.imageUrl);
        }
      });
};

exports.getMap = function(req,res){
  if(fs.existsSync(MAP_PATH+req.params.stationName+'.jpg')){
    res.json({
        "result" : "SUCCESS",
        "mapURL" : MAP_URL+req.params.stationName+'.jpg'
    });
  }else{
    res.status(500).json({
      "result" : "ERR",
      "message": "Does not exist"
    });
  }
}
