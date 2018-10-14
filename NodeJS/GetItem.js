module.exports.verify = function (EMAIL,PASS) {

    var AWS = require("aws-sdk");
    let awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": "blyat", "secretAccessKey": "blyat"
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
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
            console.log("Congrat blyat");
        }
    })
};
module.exports.sayhi=function () {
    console.log("blyat");
};

