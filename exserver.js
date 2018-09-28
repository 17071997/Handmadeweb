var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var authenticate = require('../3/NodeJS/GetItem');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/view/" + 'index.html');
})

app.get('/index',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'index.html');
})

app.get('/login',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'login.html');
})

app.get('/lost',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + '404NotFound.html');
})

app.post('/check',urlencodedParser,function (req,res) {
    if (authenticate.verify(req.body.username,req.body.pass)){
        console.log("Success");
    } else {
      console.log("Fail");
      authenticate.sayhi();
    }
    res.end(req.body.username);
})

app.get('/decorate',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'decorate.html');
})

app.get('/origami',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'origami.html')
})

app.get('/food',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'food.html');
})

app.get('/house',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'house.html');
})

app.get('/editorpage',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'EditorPage.ejs');
})

app.get('/posted',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'Posted.ejs');
})


var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)
})