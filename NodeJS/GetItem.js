module.exports.verify = function (EMAIL,PASS) {

    var AWS = require("aws-sdk");
    let awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": "AKIAIPIB4CSG2EMQN7LA", "secretAccessKey": "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"
    };
    AWS.config.update(awsConfig);
    let docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "Account",
        Key: {
            "email": EMAIL,
            "pass" : PASS
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            //console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            //console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}
module.exports.sayhi=function () {
    console.log("blyat");
}

