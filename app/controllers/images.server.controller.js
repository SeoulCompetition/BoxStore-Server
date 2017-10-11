var fs = require('fs'),
    readline = require('readline'),
    google = require('googleapis'),
    googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR =  './.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
var IMAGE_DIR = './tmp/';

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

/**
 * upload file and return json about id, name, webContentLink, thumbnailLink
**/
exports.upload = async function(req,res){
  var isAuth = false;
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
    }else{
      isAuth = authorize(JSON.parse(content));
      if(await isAuth){
        var fileId = uploadFile(req.body);
        fileId = await fileId;
        anyoneWithLink(fileId);
        var imageLink = getLinks(fileId);
        imageLink = await imageLink;
        console.log('imageLink: ' + JSON.stringify(imageLink));
        return imageLink;
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
  return new Promise((resolve, reject) => {
    var drive = google.drive('v3');
    drive.files.create({
      resource: {
        name: data.name + '.jpg',
        mimeType: 'image/jpeg',
      },
      media: {
        mimeType: 'image/jpeg',
        body: data.img
      }
    }, function(err, file){
      if(err) console.log('fail to upload image: ' + err);
      else{
        console.log('success to upload image');
        resolve(file.id);
      }
    });
  });
}

function anyoneWithLink(id){
  var drive = google.drive('v3');
  drive.permissions.create({  //set anyoneWithLink permission
    resource: {
      'type': 'anyone',
      'role': 'reader'},
    fileId: id
  }, function (err, res) {
    if (err) console.log('permission settings: ' + err);
      else {
      console.log('success to permision settings');
    }
  });
}

function getLinks(id){
  return new Promise((resolve, reject) => {
    var drive = google.drive('v3');
    drive.files.get({ //get links
      fileId: id,
      fields: 'id, name, webContentLink, thumbnailLink'
    }, function(err, success){
      if(err) console.log('fail to get link: ' + err);
      else{
        success.webContentLink = success.webContentLink.substr(0, success.webContentLink.length-16);
        resolve(success);
      }
    });
  });
}
