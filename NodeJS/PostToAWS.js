let aws = require('aws-sdk');
let config = require('./config.json');
/*
function wait(ms){
    return new Promise (r => setTimeout(r, ms))
}
*/
exports.RemoveVideo = function (VideoID){
    aws.config.update({
        region : "us-east-1",
        endpoint : "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey" : config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params1 = {
        TableName: "handmadevideo01",
        FilterExpression: "id = :value",
        ExpressionAttributeValues:{
            ":value": Number.parseInt(VideoID)
        }
    };
    docClient.scan(params1,(err,data) => {
        if (err)
            console.log("Have some errors while removing video from s3. Please review these JSON errors: " + JSON.stringify(err,null,2));
        else{
            data.Items.forEach((item) => {
                RemoveFromS3(item.urlVideo,item.image,VideoID);
            });
        }
    });
    console.log(VideoID);
};

function RemoveFromS3(video,image,id){
    aws.config.update({
        region : "us-east-1",
        endpoint : "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey" : config.secretkey
    });
    let docClient = new aws.S3();
    let params = {
        Bucket: 'handmadevideos001',
        Delete: {
            Objects: [
                {
                    Key: video
                },
                {
                    Key: image
                }
            ],
            Quiet: false
        }
    };
    let params0 = {
        TableName: "handmadevideo01",
        Key:{
            "id": Number.parseInt(id)
        }
    };
    docClient.deleteObjects(params,(err,data) => {
        if (err)
            console.log("Have some JSON errors in removing a video file. Please review it: " + JSON.stringify(err,null,2));
        else{
            console.log("Removing successfully!");
            docClient.delete(params0,(err,data) => {
                if (err)
                    console.log("Have some errors while removing video has id is " + id + ", please review these JSON errors: " + JSON.stringify(err,null,2));
                else{
                    console.log("Video has id is " + id + " has been deleted!");
                }
            });
        }
    });

}
exports.PostComment = function (VideoID, email, content, owner){
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
                    "idvideo" : VideoID,
                    "writer" : owner
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