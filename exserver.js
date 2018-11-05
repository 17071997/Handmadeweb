const express = require('express');
const app = express();
let multer = require('multer');
let bodyParser = require('body-parser');
let AWS = require('aws-sdk');
let url = require('url');
let expressJwt = require('express-jwt');
let fs = require('fs');
let config = require('./NodeJS/config.json');
let path = require('path');
let Renderator = require('./NodeJS/Renderator');
let AWSDynamoRetrieve = require('./NodeJS/RetrieveAWSData');
let authenticate = require('./NodeJS/LoginModule');
let urlencodedParser = bodyParser.urlencoded({ extended : true });

app.use(express.static('public'));
//app.use(morgan('dev'));
//tạo middleware cho express và phải chắc chắn rằng middleware này chạy đầu tiên
app.use(function (req,res,next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err,decode) {
            if (err) req.user =undefined;
            req.user =decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./api/data/')
    },
    filename: function (req,file,cb) {
        cb(null,Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

app.get('/', function (req, res) {
    Renderator.MainPageRender(req,res);
});

app.get('/watchvideo', (req,res) => {
    let query = url.parse(req.url,true).query;
    let id = query.id;
    try {
        AWSDynamoRetrieve.GetVideoByID(id,res);
    } catch (e) {
        res.redirect("/");
    }
});

app.get('/search', (req,res) => {
   let query = url.parse(req.url,true).query;
   let keyword = query.q;
    AWSDynamoRetrieve.GetPostsByKeyWord(keyword,res);
});

app.post('/signup',urlencodedParser, function (req,res) {
    let email = req.body.email.toString();
    let pass = req.body.password.toString();
    authenticate.register(email,pass,res);
});

app.get('/register', function(req,res){
    res.sendFile(__dirname + "/public/view/" + 'register.html');
});

app.get('/login',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'login.html');
});

app.get('/lost',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + '404NotFound.html');
});

app.get('/decorate',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'decorate.html');
});

app.get('/origami',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'origami.html')
});

app.get('/food',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'food.html');
});

app.get('/house',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'house.html');
});

app.get('/writerpage', (req,res) =>  {
    //res.sendFile(__dirname+ "/public/view/" + 'WriterPage.html');
    Renderator.WriterPageRender(req,res);
});

app.get('/editorrender', (req,res) => {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'EditorPage.html');
    Renderator.EditorPageRender(req,res);
});
app.post("/Dangbai", urlencodedParser, upload.any(), function (req,res,next) {
    fs.readdir("./api/data/", (err,files) =>{
        const videotargetPath = path.join(__dirname, "./api/data/" + files[0]);
        const imagetargetPath = path.join(__dirname, "./api/data/" + files[1]);
        let video_file_location = ""; // tạo biến để lưu địa chỉ của file được lưu trong s3
        let image_file_location = "";
        console.log(videotargetPath);
        console.log(imagetargetPath);
        AWS.config.update({
            region:'us-east-1',
            endpoint:'http://s3.amazonaws.com',
            "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
        });
//create s3 service object
        s3 = new AWS.S3({ apiVersion : '2006-03-01' });
//call s3 to retrieve upload file to specified bucket
        let uploadParams1 = {Bucket: "handmadevideos001", Key: '', Body: '',ACL:'public-read-write'};
        let uploadParams2 = {Bucket: "handmadevideos001", Key: '', Body: '',ACL:'public-read-write'};
        let videofileStream = fs.createReadStream(videotargetPath);
        let imagefileStream = fs.createReadStream(imagetargetPath);

        uploadParams1.Body = videofileStream;//nội dung file
        uploadParams1.Key = "videos/" + path.basename(videotargetPath);//đường dẫn folder lưu file trong s3
        uploadParams2.Body = imagefileStream;
        uploadParams2.Key = "images/" + path.basename(imagetargetPath);
//call s3 to retrieve upload file to specified bucket
        s3.upload( uploadParams1, function (err, data) {
            if (err)
                console.log("Error", err);
            else{
                video_file_location = data.Location;
                console.log("Upload success", video_file_location);
                //unlink để xóa đi file vừa add vào hệ thống sau khi up lên cloud
                fs.unlink(videotargetPath, function (err) {
                    if (err)
                        return console.log(err);
                    else
                        return console.log("Remove successfully");
                });
                AWS.config.update({
                    region:'us-east-1',
                    endpoint:'http://dynamodb.us-east-1.amazonaws.com',
                    "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
                });
                let docClient = new AWS.DynamoDB.DocumentClient();
                let table = "handmadevideo01";
                let email = req.body.email;
                let urlVideo = video_file_location;
                let image = image_file_location;
                let title = req.body.video_title;
                let summary = req.body.video_description;
                let tags = req.body.video_tags;

                let params = {
                    TableName : table,
                    Item:{
                        "email" : email,
                        "urlVideo" : urlVideo,
                        "image" : image,
                        "title" : title,
                        "summary" : summary,
                        "tags" : tags
                    }
                };
                docClient.put(params, function (err, data) {
                    if (err)
                        console.log("Unable to add a new item.Please review some json errors : ",JSON.stringify(err,null,2));
                    else
                        console.log("Added item:",JSON.stringify(data,null,2));
                });
                res.redirect("/editorrender");
            }
        });

        s3.upload( uploadParams2, function (err,data) {
            if (err)
                console.log("Error", err);
            else{
                image_file_location = data.Location;
                console.log("Upload success", image_file_location);
                fs.unlink(imagetargetPath, function (err) {
                    if (err)
                        return console.log(err);
                    else
                        return console.log("Remove successfully");
                });
            }
        });
    });

});
app.get('/postedrender', (req,res) => {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'Posted.html');
    let query = url.parse(req.url,true).query;
    let email = query.email;
    AWSDynamoRetrieve.GetPostsByEmail(email,res);
});

app.get('/Commentrender', (req,res) => {
    //res.sendFile(__dirname+ "/public/view.partials/" + 'Comments.html');
    Renderator.CommentRender(req,res);
});

app.get('/WatchingRender', (req,res) => {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'Watching.html');
    Renderator.WatchingRender(req,res);
});

app.get('/WatchedRender', (req,res) => {
    Renderator.WatchedRender(req,res);
});

app.post('/authenticate',urlencodedParser,function (req,res,next) {
    //parameter 'next' used for jwt, but i'll add it later
    let email = req.body.email.toString();
    let password = req.body.password.toString();
    authenticate.sign_in(email,password,req,res);
});

let server = app.listen(8000, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("Server dang lang nghe tai dia chi: http://%s:%s", host, port)
});