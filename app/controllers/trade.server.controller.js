var Trade = require('mongoose').model('Trade');
var User = require('mongoose').model('User');

exports.create = function(deal){
  return new Promise((resolve, reject) => {
    var trade = new Trade(deal);
    User.findById(deal.buyerId)
      .exec(function(err, user){
        var rPoint = user.point - deal.point;
        if(rPoint > 0){
          user.point = rPoint;
          trade.save(function(err){
            if(err) console.log(err);
            else resolve("created trade");
          });
        }else{
          reject("not enough point");
        }
      });
  });
};

exports.success = async function(stuffId){
  return new Promise((resolve, reject) => {
    var result = await tradeProcess(stuffId, true);
    resolve(result);
  });
};

exports.failure = async function(stuffId){
  return new Promise((resolve, reject) => {
    var result = await tradeProcess(stuffId, false);
    resolve(result);
  });
};

function tradeProcess(stuffId, isSuccess){
  return new Promise((resolve, reject) => {
    Trade.findOne({stuffId: stuffId})
      .exec(function(err, trade){
        if(err) console.log('err1: ' + err);
        if(isSuccess){
          var getPointUser = trade.sellerId;
        }else{
          var getPointUser = trade.buyerId;
        }
        User.findById(getPointUser)
          .exec(function(err, user){
            if(err) console.log('err2: ' + err);
            user.point = user.point + trade.point;
            user.save(function(err){
              if(err) console.log('err3: ' + err);
              Trade.remove({stuffId: trade.stuffId}, function(err){
                if(err) console.log('err4: ' + err);
                resolve('removed trade');
              });
            });
          });
      });
  });
}
