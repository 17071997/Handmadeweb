const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const authenticate = require('../3/NodeJS/GetItem');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
/*
const mongoose = require('mongoose');
const User = require('api/modelsfolder/userModel');
const jsonwebtoken = require('jsonwebtoken');
//initial mongodb database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/account');
*/
app.use(express.static('public'));
app.use(urlencodedParser);
app.use(bodyParser.json());
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
//
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/view/" + 'index.html');
});

app.get('/index',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'index.html');
});

app.get('/login',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'login.html');
});

app.get('/lost',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + '404NotFound.html');
});

app.post('/check',urlencodedParser,function (req,res) {
    if (authenticate.verify(req.body.username,req.body.pass)){
        console.log("Success");
    } else {
      console.log("Fail");
      authenticate.sayhi();
    }
    res.end(req.body.username);
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
    res.sendFile(__dirname+ "/public/view/" + 'house.html');
});

app.get('/editorpage',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'EditorPage.ejs');
});

app.get('/posted',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'Posted.ejs');
});


var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server dang lang nghe tai dia chi: http://%s:%s", host, port)
});