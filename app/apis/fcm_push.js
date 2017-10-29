var FCM = require('fcm-push');

var serverKey = 'AAAAZQ9RXtY:APA91bEoVOxpO3JSmAe6Rw2USblqmSLygDm3NLTbvpIZDGP3nkKcvxNY2h_Kg5i69flPrgWJ8pq-J0AjM0KJk9_Wxt0annzZ1PhhAdZ2L1rqCLVVuYJPYEMSPtL0Mdf0WoU7rthCD4lR';
var fcm = new FCM(serverKey);


module.exports = {

    sendMessage: function(data) {
        console.log(data);
        var message = {
            to: data.dest,
            collapse_key: data.type,
            data: {
                "keyword": data.keywrod
            },
            notification: {
                title: "키워드 알림",
                body: data.keyword + "이 새로 등록되었습니다!"
            }
        };
        fcm.send(message, function(err, response) {
            if (err) {
                console.log(err,"Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
};
