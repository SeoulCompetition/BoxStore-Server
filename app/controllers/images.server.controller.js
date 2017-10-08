var fs = require('fs'),
    readline = require('readline'),
    google = require('googleapis'),
    googleAuth = require('google-auth-library'),
    sharp = require('sharp');

var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR =  './.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
var IMAGE_DIR = './tmp/';
var WIDE_SIZE = 300;
var name1;

exports.list = async function(req,res){
  var isAuth = false;
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
      return;
    }
    isAuth = authorize(JSON.parse(content));
    if(await isAuth){
      var files = getList();
      res.json(await files);
    }else{
      console.log('isAuth error');
    }
  });
};

exports.getImage = function(req,res){
  var isAuth = false;
  name1 = ' and name contains "' +req.params.imageName+'"';
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
      return;
    }
    isAuth = authorize(JSON.parse(content));
    if(await isAuth){
      var itemName = downloadFile();
      itemName = await itemName;
      fs.readFile(IMAGE_DIR + itemName, function (err,img){
        if(err){
          console.log('readFile Error: ' + err);
        }else{
          res.end(img);
          fs.unlink(IMAGE_DIR + itemName, function(err){
            if(err) console.log('image delete fail: ' + err);
          });
        }
      });
    }else{
      console.log('isAuth error');
    }
  });
}


exports.upload = async function(req,res){
  var isAuth = false;
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
    }else{
      isAuth = authorize(JSON.parse(content));
      if(await isAuth){
        var msg = uploadFile(req.body);
        res.json(await msg);
      }else{
        console.log('isAuth error');
      }
    }
  });
};


exports.renderAuthorized = function(req,res){
  res.end('authorize page');
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 */
async function authorize(credentials) {
  return new Promise((resolve, reject) => {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    var result_token;

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, async function(err, token) {
      if (err) {
        result_token = getNewToken(oauth2Client);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        result_token = oauth2Client;
      }
      result_token = await result_token;
      google.options({
        auth: result_token
      });
      resolve(true);
    });
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client) {
  return new Promise((resolve, reject) => {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        resolve(oauth2Client);
      });
    });
  });
};

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token),function(err){
    if(err){
      console.log('Write auth: ' + err);
    }else{
      console.log('Token stored to ' + TOKEN_PATH);
    }
  });
};

function downloadFile() {
  return new Promise((resolve, reject) => {
    var drive = google.drive('v3');
    drive.files.list({
      pageSize: 1,
      q:"mimeType contains 'image' and trashed = false"+name1
    }, function(err, response){
      if(err){
        console.log('google drive list error: '+err);
      }else{
        if(response.files.length == 0){
          console.log('No files found.');
        }
        response.files.forEach(function(item){
          var file=fs.createWriteStream(IMAGE_DIR + item.name);
          drive.files.get({
            fileId: item.id,
            alt: "media"
          })
          .on('end', function(){
            console.log('downloaded', item.name);
          })
          .on('error', function(err){
            console.log('Error during download: ' + err);
            reject(err);
          })
          .pipe(file);
        });
      }
    });
  });
};

/**
 * Lists the names and IDs of up to 10 files.
 */
function getList(){
  return new Promise((resolve, reject) => {
    var drive = google.drive('v3');
    drive.files.list({
      pageSize: 100,
      q:"mimeType contains 'image' and trashed = false"
    }, function(err, response){
      if(err){
        console.log('google drive list error: '+err);
      }else{
        if(response.files.length == 0){
          console.log('No files found.');
          reject('No files found.');
        }else{
          resolve(response.files);
        }
      }
    });
  });
};


/**
 *
 * @param {Object} data
 * data-> {"body":{??}, "name":"???"}
 *
 */
function uploadFile(data){
  console.log(data);
  return new Promise((resolve, reject) => {
    var drive = google.drive('v3');
    drive.files.create({
      resource: {
        name: data.name + '.jpg',
        mimeType: 'image/jpeg'
      },
      media: {
        mimeType: 'image/jpeg',
        body: data.img
      }
    }, function(err){
      if(err){
        console.log('fail to upload image: ' + err);
        reject('fail to upload image: ' + err);
      }else{
        console.log('success to upload raw image');
        resolve('success to upload raw image');
        // sharp(IMAGE_DIR + item.name)
        //   .resize(WIDE_SIZE);

      }
    });
  });
}
