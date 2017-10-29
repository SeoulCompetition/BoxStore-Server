var http = require("http");

exports.checkCheat = function(req, res){
  var field = req.body.field; //전화번호 "H", 계좌번호 "A"
  var keyword = req.body.keyword; //전화번호나 계좌번호

  var options = {
    hostname: 'net-durumi.cyber.go.kr',
    path: '/getMessage.do?'+'fieldType='+field+'&keyword='+keyword+'&accessType=1',
    method: 'POST',
    headers: {
      'Referer' : 'http://cyberbureau.police.go.kr/index.do'
    }
  };
  var check = http.request(options, function(checked){
      console.log('Status: ' + checked.statusCode);
      console.log('Headers: ' + JSON.stringify(checked.headers));
      checked.setEncoding('utf8');
      checked.on('data', function(data){
        console.log('Message: ' + data);
        res.json(data);
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
};
