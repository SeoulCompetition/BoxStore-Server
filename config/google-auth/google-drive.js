var googleDrive = require('google-drive')

// ...
// add stuff here which gets you a token, fileId, and callback
// ...

var token = 'ya29.GlvYBE-7dzaUVfgwHl5oilpRg1AmY9hfUMkVf9xDYeQjLXi_I9txRUZnsxWELdHj9SCwjAHlk7a-yYq9W8cvTMHnlfkwMmgVrizFJyf3uiTo6qMYGORmfpmt8xRE'
  , fileId = '0B-0RsXgq2zIsSU5pbGxOVFc2ZGs'

function getFile(token, fileId, callback) {
  googleDrive(token).files(fileId).get(callback)
}

function listFiles(token, callback) {
  googleDrive(token).files().get(callback)
}

function uploadFile(meta, params, callback){
  googleDrive(token).files().insert(meta, params, callback)
}

function callback(err, response, body) {
  if (err) return console.log('err', err)
  console.log('response', response)
  console.log('body', JSON.parse(body))
}
