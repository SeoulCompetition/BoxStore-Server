var fs = require('fs');
var ImageLink = require('mongoose').model('ImageLink');
//var sharp = require('sharp');
var imageFilter = {
  _id: 0,
  linkType: 0,
  sizeType: 0,
  key: 0
};

var IMAGE_PATH = './config/public/original/';
var THUMBNAIL_PATH = './config/public/thumbnails/';
var IMAGE_URL = '52.78.22.122:3000/';
var THUMBNAIL_URL = '52.78.22.122:3000' + '/thumbnails/';
var WIDE_SIZE = 100;

exports.uploadForReceipt = function(req, res){
  var item = req.file;
  var imageLink = new ImageLink();
  imageLink.linkType = "receipt";
  imageLink.sizeType = "original";
  imageLink.key = req.params.stuffId;
  imageLink.imageUrl =  IMAGE_URL + item.path;
  imageLink.save(function(err){
    if(err){
      res.status(500).json({
        "result" : "ERR",
        "message": err
      });
    }else{
      // var imageName = item.originalname;
      // sharp(IMAGE_PATH + imageName)
      // .resize(WIDE_SIZE)
      // .png()
      // .toFile(THUMBNAIL_PATH + imageName.split('.')[0] + '.png', function(err){
      //   if(err) console.log('sharp.toFile error: ' + err);
      //   else{
      //     var thumbnailLink = new imageLink();
      //     thumbnailLink.linkType = "receipt";
      //     thumbnailLink.sizeType = "thumbnail";
      //     thumbnailLink.key = req.params.stuffId;
      //     thumbnailLink.imageUrl = THUMBNAIL_URL + imagename.split('.')[0] + '.png';
      //   }
      // });
      res.json({
        "result" : "SUCCESS",
        "message" : "saved image url to db"
      });
    }
  });
};


exports.uploadForStuff = function(req, res){
  var imageArr = req.files;
  var arrSize = imageArr.length;
  imageArr.forEach(function(item){
      var imageLink = new ImageLink();
      imageLink.linkType = "stuff";
      imageLink.sizeType = "original";
      imageLink.key = req.params.stuffId;
      imageLink.imageUrl =  IMAGE_URL + item.path;
      imageLink.save(function(err){
        if(err){
          res.status(500).json({
            "result" : "ERR",
            "message": err
          });
        }else{
          arrSize--;
          if(!arrSize){
            res.json({
              "result" : "SUCCESS",
              "message" : "saved image url to db"
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
        }
      });
  });
};

exports.getImageLink = function(req ,res){
  ImageLink.find({
      linkType: req.params.linkType,
      sizeType: req.params.sizeType,
      key: req.params.stuffId
  }).select(imageFilter)
    .exec(function(err, imageLinks){
      if(err){
        res.status(500).json({
          "result" : "ERR",
          "message": err
        });
      }else{
        res.json(imageLinks);
      }
  });
};
