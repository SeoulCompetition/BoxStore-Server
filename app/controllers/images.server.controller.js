var fs = require('fs'),
    readline = require('readline'),
    google = require('googleapis'),
    googleAuth = require('google-auth-library')
    ;

var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR =  './.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
var IMAGE_DIR = './tmp/'
var name1 = ' and name contains "';

exports.list = async function(req,res){
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
      return;
    }
    var token = authorize(JSON.parse(content));
    var files = getList(await token);
    res.json(await files);
  });
};

exports.getImage = function(req,res){
  name1 = name1 +req.params.imageName+'"';
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
      return;
    }
    var token = authorize(JSON.parse(content));
    var file = downloadFile(await token);
    file = await file;
    fs.exists(file.path, function (exists) {
        if (exists) {
            fs.readFile(file.path, function (err,data){
              if(err){
                console.log('readFile Error: ' + err);
              }else{
                res.end(data);
                fs.unlink(file.path, function(err){
                  if(err) console.log('file delete fail');
                });
              }
            });
        } else {
            res.end('file is not exists');
        }
    });
  });
}

//작업중
exports.upload = async function(req,res){
  fs.readFile('./client_secret.json', async function(err, content){
    if(err){
      console.log('readFile Error: ' + err);
    }else{
      var token = authorize(JSON.parse(content));
      var files = getList(await token);
      res.json(await files);
    }
  });
};


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  return new Promise((resolve, reject) => {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        reject(getNewToken(oauth2Client));
      } else {
        oauth2Client.credentials = JSON.parse(token);
        resolve(oauth2Client);
      }
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
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function downloadFile(auth) {
  console.log('name1: ' + name1);
  return new Promise((resolve, reject) => {
    var service = google.drive('v3');
    service.files.list({
      auth: auth,
      pageSize: 1,
      q:"mimeType contains 'image' and trashed = false"+name1
    }, function(err, response){
      if(err){
        console.log('The API returned an '+err);
      }else{
        if(response.files.length == 0){
          reject('No files found.');
        }
        response.files.forEach(function(item){
          var file=fs.createWriteStream(IMAGE_DIR + item.name);
          service.files.get({
            auth: auth,
            fileId: item.id,
            alt: "media"
          })
          .on('end', function(){
            console.log('downloaded', item.name);
            resolve(file);
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
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getList(auth){
  return new Promise((resolve, reject) => {
    var service = google.drive('v3');
    service.files.list({
      auth: auth,
      pageSize: 100,
      q:"mimeType contains 'image' and trashed = false",
      fields: "nextPageToken, files(id, name)"
    }, function(err, response){
      if(err){
        console.log('The API returned an '+err);
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
