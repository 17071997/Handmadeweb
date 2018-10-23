/**
 * name : createBucket
 * purpose : create a bucket
 * code :
 * ///////////////////////////////////////////////////////////////////////////////////////////
 * let AWS = require('aws-sdk');
 //config
 AWS.config.update({
    region:'us-east-1',
    endpoint:'http://s3.amazonaws.com',
    "accessKeyId": "AKIAJ4OFNH7CPWMEDZLA", "secretAccessKey": "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"
});
 //create the parameters for calling createBucket
 let bucketParams = {
    Bucket : "xvideos002"
};
 //create s3 service object
 s3 = new AWS.S3({ apiVersion : '2006-03-01' });

 //call s3 to create the bucket
 s3.createBucket(bucketParams, function (err, data) {
    if (err)
        console.log("Error : ", err);
    else
        console.log("Success : ",data.Location);
});
 * ///////////////////////////////////////////////////////////////////////////////////////////
 *
 * name : uploadToS3
 * purpose : upload data to s3
 *
 */
let AWS = require('aws-sdk');
//config
module.exports = function (path1) {
    AWS.config.update({
        region:'us-east-1',
        endpoint:'http://s3.amazonaws.com',
        "accessKeyId": "AKIAJ4OFNH7CPWMEDZLA", "secretAccessKey": "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"
    });
//create s3 service object
    s3 = new AWS.S3({ apiVersion : '2006-03-01' });

//call s3 to retrieve upload file to specified bucket
    let uploadParams = {Bucket: "xvideos002", Key: '', Body: '',ACL:'public-read-write'};
    let file = path1;

    let fs = require('fs');
    let fileStream = fs.createReadStream(file);
    let path = require('path');

    fileStream.on('error', function (err) {
        console.log('File error', err);
    });

    uploadParams.Body = fileStream;
    uploadParams.Key = "videos/" + path.basename(file);

//call s3 to retrieve upload file to specified bucket
    s3.upload( uploadParams, function (err, data) {
        if (err)
            console.log("Error", err);
        else
            console.log("Upload success", data.Location);
    });
};