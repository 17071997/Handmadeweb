var AWS = require("aws-sdk");
let awsConfig = {
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId":"AKIAIG4MAZ7O7ELWXBYA","secretAccessKey":"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"
};
AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "videos";

var email = "tranthevu.iuh@gmail.com";
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "email": email,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});