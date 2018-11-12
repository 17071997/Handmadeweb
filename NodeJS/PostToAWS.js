let aws = require('aws-sdk');
let config = require('./config.json');

exports.PostComment = function (VideoID, email, content){
  aws.config.update({
      region : "us-east-1",
      endpoint : "http://dynamodb.us-east-1.amazonaws.com",
      "accessKeyId": config.accesskeyid, "secretAccessKey" : config.secretkey
  });

  let docClient = new aws.DynamoDB.DocumentClient();
  let params = {
      TableName: "Comments",
      Item:{
          "IDcontent" : 1 ,
          "guestemail" : email,
          "content" : content,
          "idvideo" : VideoID
      }
  };

  console.log(email + " commented on video has id is " + VideoID);
  docClient.update(params, (err,data) => {
      if (err)
          console.log("An email " + email + " cannot post their comment. Had these json errors:" + JSON.stringify(err,null,2));
      else{
          console.log("Email " + email + " posted a comment!");
      }
  })
};