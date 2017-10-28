var fs = require('fs');
var Stuff = require('mongoose').model('Stuff');
//var sharp = require('sharp');

var IMAGE_PATH = './config/public/original/';
var THUMBNAIL_PATH = './config/public/thumbnails/';
var IMAGE_URL = '52.78.22.122:3000/original/';
var THUMBNAIL_URL = '52.78.22.122:3000/thumbnails/';
var WIDE_SIZE = 100;

exports.uploadForReceipt = function(req, res){
  var item = req.file;
  //resizeImage
  Stuff.findById(req.params.stuffId)
    .exec(function(err, stuff){
        stuff.receipt.imageUrl = IMAGE_URL+item.originalname;;
        //stuff.receipt.imageUrl = THUMBNAIL_URL+item.originalname.split('.')[0]+'.png';
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
};


exports.uploadForStuff = function(req, res){
  var imageArr = req.files;
  var imageUrls =[];
  var thumbnailUrls = [];
  var arrSize = imageArr.length;
  imageArr.forEach(function(item){
      imageUrls.push(IMAGE_URL+item.originalname);
      //resizeImage
      //thumbnailUrls.push(THUMBNAIL_URL+item.originalname.split('.')[0]+'.png');
      arrSize--;
      if(!arrSize){
        Stuff.findById(req.params.stuffId)
          .exec(function(err, stuff){
              stuff.imageUrl = imageUrls;
              //stuff.imageUrl = thumbnailUrls;
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
  });
}
          // var imageName = item.originalname;
          // sharp(IMAGE_PATH + imageName)
          // .resize(WIDE_SIZE)
          // .png()
          // .toFile(THUMBNAIL_PATH + imageName.split('.')[0] + '.png', function(err){
          //   if(err) console.log('sharp.toFile error: ' + err);
          //   else{
          //     var thumbnailLink = new imageLink();
          //     thumbnailLink.linkType = "stuff";
          //     thumbnailLink.sizeType = "thumbnail";
          //     thumbnailLink.key = req.params.stuffId;
          //     thumbnailLink.imageUrl = THUMBNAIL_URL + imagename.split('.')[0] + '.png';
          //   }
          // });

exports.getImageLink = function(req ,res){
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
