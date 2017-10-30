var Trade = require('mongoose').model('Trade');
var User = require('mongoose').model('User');

exports.create = function(deal){
  var trade = new Trade(deal);
  trade.save(function(err){
    if(err) console.log(err);
  });
  User.findById(deal.buyerId)
    .exec(function(err, user){
        console.log(user);
        user.point = user.point - deal.point;
        user.save(function(err){
          if(err) console.log(err);
        });
    });
};

exports.success = function(stuffId){
    tradeProcess(stuffId, true);
};

exports.failure = function(stuffId){
    tradeProcess(stuffId, false);
};

function tradeProcess(stuffId, isSuccess){
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
              console.log('removed trade');
            });
          });
        });
    });
}
