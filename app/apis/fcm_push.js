var FCM = require('fcm-push');

var serverKey = 'AAAACdKx5wY:APA91bEtxzDfOR9KFkUqz-c93c_fBkYGtInET21Y7tVfpPxDRMK4vyleLEcvjNq6MdejupEa3-lVSnjh7O02kQN9-Mlq6yBc-Za3-RcHhzrQkwQcGTCYS6HwrLNcdbUwU1yVkfjYfQQW';
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
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
};
