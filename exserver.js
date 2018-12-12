const express = require('express');
const app = express();
let http = require('http').Server(app);
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
let OptionalFunction = require('./NodeJS/OptionalFunctions');
let session = require('express-session');
let AWSDynamoPost = require('./NodeJS/PostToAWS');

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

OptionalFunction.createSession(app);

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
    let urlvideo = query.ip;
    let id = query.id;
    let owner = query.owner;
    try {
        AWSDynamoRetrieve.GetVideoByID(urlvideo,id,owner,res);
    } catch (e) {
        console.log(e);
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

let sess;

app.get('/login',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'login.html');
});

app.get('/lost',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + '404NotFound.html');
});

app.get('/decorate',function (req,res) {
    AWSDynamoRetrieve.GetDecorateBody(req,res);
});

app.get('/origami',function (req,res) {
    AWSDynamoRetrieve.GetOrigamiBody(req,res);
});

app.get('/food',function (req,res) {
    AWSDynamoRetrieve.GetCookingBody(req,res);
});

app.get('/house',function (req,res) {
    AWSDynamoRetrieve.GetHouseBody(req,res);
});

app.get('/writerpage',urlencodedParser, (req,res) =>  {
    //res.sendFile(__dirname+ "/public/view/" + 'WriterPage.html');
    let query = url.parse(req.url,true).query;
    let email = query.email;
    Renderator.WriterPageRender(email,req,res);
});

app.get('/editorrender', urlencodedParser, (req,res) => {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'EditorPage.html');
    let query = url.parse(req.url,true).query;
    let email = query.email;
    Renderator.EditorPageRender(email,req,res);
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
                let like_count = 0;
                let dislike_count = 0;
                let title = req.body.video_title;
                let summary = req.body.video_description;
                let tags = req.body.video_tags;
                let params0 = {
                    TableName: table,
                    Select: 'COUNT'
                };
                docClient.scan(params0, (err,data) => {
                    if (err)
                        console.log("Please view some json errors:" + JSON.stringify(err,null,2));
                    else {
                        let params = {
                            TableName : table,
                            Item:{
                                "id" : Number.parseInt(data.Count + 1),
                                "email" : email,
                                "urlVideo" : urlVideo,
                                "image" : image,
                                "like_count": like_count,
                                "dislike_count": dislike_count,
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
                        res.redirect("/editorrender?email=" + email);
                    }
                });
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

app.post('/postcomment', urlencodedParser, (req,res)=> {
    let email = req.body.email;
    let content = req.body.content;
    let id = req.body.id;
    console.log(id);
    let owner = req.body.owner;
    AWSDynamoPost.PostComment(id,email,content,owner);
    res.redirect(req.get('referer'));//reload page
});

app.get('/postedrender', (req,res) => {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'Posted.html');
    let query = url.parse(req.url,true).query;
    let email = query.email;
    AWSDynamoRetrieve.GetPostsByEmail(email,res);
});

app.get('/Commentrender', (req,res) => {
    //res.sendFile(__dirname+ "/public/view.partials/" + 'Comments.html');
    let query = url.parse(req.url,true).query;
    let email = query.email;
    AWSDynamoRetrieve.GetCommentOnVideoByEmail(req,res,email);
});

app.get('/removeposts', (req,res) => {
    let query = url.parse(req.url,true).query;
    let email = query.email;
    AWSDynamoRetrieve.RemoveFromList(email,res);
});

app.post('/authenticate',urlencodedParser,function (req,res,next) {
    //parameter 'next' used for jwt, but i'll add it later
    let email = req.body.email.toString();
    let password = req.body.password.toString();
    authenticate.sign_in(email,password,req,res,app);
});

let io = require('socket.io')(http);
io.on('connection', function (socket) {
    //console.log("someone volt a video");
    socket.on('like', function (id) {
        AWSDynamoRetrieve.IncreaseLike(id);
        console.log("Someone volt like video has id is " +id );
    });
    socket.on('giveuplike',function (id) {
        AWSDynamoRetrieve.DecreaseLike(id);
        console.log("The video, has id is " + id + ", got decrease!");
    });
    socket.on('dislike', function (id) {
        AWSDynamoRetrieve.IncreaseDisLike(id);
        console.log("Someone volt dislike video has id is " + id);
    });
    socket.on('giveupdislike', function (id) {
        AWSDynamoRetrieve.DecreaseDisLike(id);
        console.log("The video, has id is " + id + ", got decrease!");
    });
    socket.on('comment', function (data) {
        AWSDynamoPost.PostComment(data.idvideo,data.guestemail,data.content,data.owner);
        console.log("User " + data.guestemail + " commented a video has id is " + data.idvideo);
        io.emit('comment',data);
    });
    socket.on('remove',function (data) {
        AWSDynamoPost.RemoveVideo(data.id);
        io.emit('remove',"Xin lỗi nhé, thằng admin vừa xóa video " + data.name);
    })
});

http.listen(8001, function () {
    /*
    let host = server.address().address;
    let port = server.address().port;*/
    console.log("Server dang lang nghe tren *: 8001");
});
/*
//cài đặt cấu hình cho socket.io
io = socket.listen(server);
io.on('connection',function(socket){
    console.log('Someone volting video');
});
/*
io.set('match origin protocol', true);//config để có thể chạy được nodejs cùng với socket.io server, phân biệt đâu là socket.io, đâu là nodejs server
io.set('origins','.');//config  để socket.io nhận những client ở domain nào port nào, ở đây * là nhận tất
io.set('log level',1);
let run = function( socket) {
  socket.on("capnhatlike", (data) => {
      GetLike (data);
      console.log("Changed like");
  })
};
//nguồn nghiên cứu socket.io : https://viblo.asia/p/nodejs-va-socketio-can-ban-jlA7GKxdvKZQ
*/
