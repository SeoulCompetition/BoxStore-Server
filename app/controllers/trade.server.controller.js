var Trade = require('mongoose').model('Trade');

exports.create = function(deal){
    var trade = new Trade(deal);
    trade.save(function(err){

    });
};
