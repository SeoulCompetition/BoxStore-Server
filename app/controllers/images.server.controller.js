var fs = require('fs');
//var sharp = require('sharp');

var IMAGE_PATH = './config/public/original/';
var THUMBNAIL_PATH = './config/public/thumbnails/';
var IMAGE_URL = 'http://localhost:3000' + '/original/';
var THUMBNAILS_URL = 'http://localhost:3000' + '/thumbnails/';
var WIDE_SIZE = 100;

  return new Promise((resolve, reject) => {
    exports.upload = function(req, res){
    var buf = new Buffer(req.body.img.data, 'base64');
    var imageName = req.body.name;    //'image.jpg'

    fs.writeFile(IMAGE_PATH + imageName, buf, 'base64', function(err){
      if(err) console.log('writeFile error: ' + err);
      else{
        console.log('success to upload image: ' + imageName);
  //      resizeImage(imageName);
        var urlArray = [IMAGE_URL+imageName, THUMBNAILS_URL + imageName.split('.')[0] + '.png'];
        console.log(urlArray);
        resolve(urlArray);  //urlArray[0] -> raw_img_urls, urlArray[1] -> resized_img_urls
      }
    });
  });
};

exports.uploadForStuff = function(req, res){
  console.log(req);
  res.json(req);
}

exports.uploadForReceipt = function(req, res){
  return new Promise((resolve, reject) => {
    var buf = new Buffer(req.body.img.data, 'base64');
    var imageName = req.body.name;    //'image.jpg'

    fs.writeFile(IMAGE_PATH + imageName, buf, 'base64', function(err){
      if(err) console.log('writeFile error: ' + err);
      else{
        console.log('success to upload image: ' + imageName);
//        resizeImage(imageName);
        var urlArray = [IMAGE_URL+imageName, THUMBNAILS_URL + imageName.split('.')[0] + '.png'];
        console.log(urlArray);
        resolve(urlArray);  //urlArray[0] -> raw_img_urls, urlArray[1] -> resized_img_urls
      }
    });
  });
};

/**
//imageName: 'image.jpg'
function resizeImage(imageName){
  sharp(IMAGE_PATH + imageName)
  .resize(WIDE_SIZE)
  .png()
  .toFile(THUMBNAIL_PATH + imageName.split('.')[0] + '.png', function(err){
    if(err) console.log('sharp.toFile error: ' + err);
    else{
      console.log('success to resize image: ' + imageName.split('.')[0] + '.png');
    }
  });
};
**/
