var http = require("http");
var User = require('mongoose').model('User');

exports.checkCheat = function(req, res){
  var field = 'H'; //전화번호 "H", 계좌번호 "A"

  User.findOne({uid:req.params.uid})
    .exec(function(err, user){
      if(err) {
        res.status(500).json(err);
        return;
      }
      if(user == null){
        res.status(404).json({
          "result" : "NULL",
          "message": "no uid"
        });
        return;
      }
      if(user.phoneNum == null){
        res.status(204).json({
          "result" : "NULL",
          "message": "no phone number"
        });
        return;
      }
      var keyword = user.phoneNum;
      var options = {
        hostname: 'net-durumi.cyber.go.kr',
        path: '/getMessage.do?'+'fieldType='+field+'&keyword='+keyword+'&accessType=1',
        method: 'POST',
        headers: {
          'Referer' : 'http://cyberbureau.police.go.kr/index.do'
        }
      };

      var check = http.request(options, function(checked){
          checked.setEncoding('utf-8');
          checked.on('data', function(data){
            data = data.split('"')[3];
            data = data.replace(/\\u003/g,'');
            data = data.split('/').join('');
            data = data.replace(/cbe/g,'');
            data = user.name + "씨는 "+data;
            res.json({
                "result" : "SUCCESS",
                "message" : data
            });
          });
      });
      check.on('error', function(err){
        console.log('problem with request: ' + err.message);
        res.json(err);
      });
      check.write(
        '{"text": "test string"}'
      );
      check.end();
  });
};
