var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodeParser = bodyParser.urlencoded({ extended : false })

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/view/" + 'index.html');
})

app.get('/login',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + 'login.html');
})

app.get('/lost',function (req,res) {
    res.sendFile(__dirname + "/public/view/" + '404NotFound.html');
})

app.post('/check',urlencodeParser,function (req,res) {
    response = {
        username : req.body.username,
        pass : req.body.pass
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.get('/decorate',function (req,res) {
    res.sendFile(__dirname+ "/public/view/" + 'decorate.html');
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