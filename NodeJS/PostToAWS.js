let aws = require('aws-sdk');
let config = require('./config.json');
/*
function wait(ms){
    return new Promise (r => setTimeout(r, ms))
}
*/

exports.PostComment = function (VideoID, email, content){
    let counting = 0;
    aws.config.update({
      region : "us-east-1",
      endpoint : "http://dynamodb.us-east-1.amazonaws.com",
      "accessKeyId": config.accesskeyid, "secretAccessKey" : config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();
    let params0 = {
        TableName: "Comments",
        Select : 'COUNT'
    };

    docClient.scan(params0, function (err, data) {
        if (err)
            console.log("Please view some json errors:" + JSON.stringify(err,null,2));
        else {
            let params = {//viết thêm module lấy count trong danh sách comment
                TableName: "Comments",
                Item:{
                    "IDcontent" : Number.parseInt(data.Count + 1) ,
                    "guestemail" : email,
                    "content" : content,
                    "idvideo" : VideoID
                }
            };

            console.log(email + " commented on video has id is " + VideoID);
            docClient.put(params, (err,data) => {
                if (err)
                    console.log("An email " + email + " cannot post their comment. Had these json errors:" + JSON.stringify(err,null,2));
                else {
                    console.log("Email " + email + " posted a comment!");
                }
            });
        }
    });
};