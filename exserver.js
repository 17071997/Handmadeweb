const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let AWS = require('aws-sdk');
let Renderator = require('./NodeJS/Renderator');
//let mongoose = require('mongoose');
//let morgan = require('morgan');
//let jsonwebtoken = require('jsonwebtoken');
//let config = require('./api/config');
//let User = require('./api/models/user');
//let dynamoModule = require('./NodeJS/GetItem');
let urlencodedParser = bodyParser.urlencoded({ extended : true});
//below library can help convert post data into an object
//connecting to mongodb
//mongoose.connect(config.url);
//app.set('superSecret',config.secret);
//
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
//
app.get('/', function (req, res) {

    let htmlCode = "<!DOCTYPE html>\n" +
        "<html lang=\"en\" >\n" +
        "\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>Home Page</title>\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width\" />\n" +
        "    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'>\n" +
        "    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700'>\n" +
        "    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css'>\n" +
        "    <link rel=\"stylesheet\" href=\"../CSS/style.css\">\n" +
        "    <link rel=\"Stylesheet\" href='https://fonts.googleapis.com/css?family=Muli' type='text/css'>\n" +
        "    <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,300,300italic,400italic,600italic,600' rel='stylesheet' type='text/css'>\n" +
        "    <link rel=\"Stylesheet\" href=\"css/master.css\" type=\"text/css\" />\n" +
        "    <link rel=\"Stylesheet\" href=\"https://ianlunn.github.io/Hover/css/hover.css\" type=\"text/css\" />\n" +
        "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
        "    <link href=\"../CSS/slide.css\" rel=\"stylesheet\" type=\"text/css\" />\n" +
        "    <style type=\"text/css\">\n" +
        "        *{\n" +
        "            -webkit-box-sizing: border-box;\n" +
        "            -moz-box-sizing: border-box;\n" +
        "            box-sizing: border-box;\n" +
        "        }\n" +
        "        a{\n" +
        "            -webkit-transition: all 0.3s ease;\n" +
        "            -moz-transition: all 0.3s ease;\n" +
        "            -o-transition: all 0.3s ease;\n" +
        "            transition: all 0.3s ease;\n" +
        "        }\n" +
        "        .wrapper{\n" +
        "            width:100%;\n" +
        "            margin:30px auto 0;\n" +
        "            background-color:#FFFFFF;\n" +
        "            -webkit-box-sizing: border-box;\n" +
        "            -moz-box-sizing: border-box;\n" +
        "            box-sizing: border-box;\n" +
        "        }\n" +
        "\n" +
        "        header{\n" +
        "            text-align:right;\n" +
        "            padding:10px;\n" +
        "            margin-bottom:10px;\n" +
        "            background-color:#5DBA9D;\n" +
        "        }\n" +
        "\n" +
        "        header a{\n" +
        "            font-size:20px;\n" +
        "            color:#FFFFFF;\n" +
        "            width:40px;\n" +
        "            height:40px;\n" +
        "            line-height:40px;\n" +
        "            margin-left:10px;\n" +
        "            text-align:center;\n" +
        "            display:inline-block;\n" +
        "        }\n" +
        "\n" +
        "        header a:hover, .list-mode header a.hide-list:hover{\n" +
        "            background-color:#11956c;\n" +
        "        }\n" +
        "\n" +
        "        header a.hide-list{\n" +
        "            background-color:#11956c;\n" +
        "        }\n" +
        "\n" +
        "        .list-mode header a.hide-list{\n" +
        "            background-color:#5DBA9D;\n" +
        "        }\n" +
        "\n" +
        "        .list-mode header a.show-list{\n" +
        "            background-color:#11956c;\n" +
        "        }\n" +
        "\n" +
        "        .container:after{\n" +
        "            content:\"\";\n" +
        "            clear:both;\n" +
        "            display:table;\n" +
        "        }\n" +
        "\n" +
        "        .container{\n" +
        "            padding:10px 0 10px 10px;\n" +
        "        }\n" +
        "\n" +
        "        .wrapper .box{\n" +
        "            float:left;\n" +
        "            width:220px;\n" +
        "            height:300px;\n" +
        "            margin:0 10px 10px 0;\n" +
        "            -webkit-transition:all 1.0s ease;\n" +
        "            -moz-transition:all 1.0s ease;\n" +
        "            transition:all 1.0s ease;\n" +
        "            transition:all 1.0s ease;\n" +
        "        }\n" +
        "\n" +
        "        .wrapper.list-mode .container{\n" +
        "            padding-right:10px;\n" +
        "        }\n" +
        "\n" +
        "        .wrapper.list-mode .box{\n" +
        "            width:100%;\n" +
        "        }\n" +
        "    </style>\n" +
        "</head>\n" +
        "<body>\n" +
        "<div class=\"InnerBackGround\">\n" +
        "    <nav>\n" +
        "        <ul>\n" +
        "            <li><a href=\"/\">Home</a></li>\n" +
        "            <li><a href=\"/decorate\">Trang trí</a></li>\n" +
        "            <li><a href=\"/food\">Đồ ăn</a></li>\n" +
        "            <li><a href=\"/house\">Nhà</a></li>\n" +
        "            <li><a href=\"/origami\">Origami</a></li>\n" +
        "            <li class=\"nav-item\"><a href=\"/login\" target=\"_blank\" class=\"btn btn-danger btn-round\">Login</a></li>\n" +
        "        </ul>\n" +
        "    </nav>\n" +
        "</div>\n" +
        "<div class=\"wrapper\">\n" +
        "    <header>\n" +
        "        <a href=\"javascript:void(0)\" class=\"show-list\"><i class=\"fa fa-th-list\"></i></a>\n" +
        "        <a href=\"javascript:void(0)\" class=\"hide-list\"><i class=\"fa fa-th\"></i></a>\n" +
        "    </header>\n"+
        "    <div class=\"container\">\n";

    let awsConfig = {
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId":"AKIAJ4R37VC5CV4KMEMQ","secretAccessKey":"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"
    };
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "videos",
        ProjectionExpression:"img,urlVideo,title"
    };
    //lỗi ở đây là code không tìm thấy bảng
    docClient.scan(params, function (err,data) {
        if (err){
            htmlCode +="<p>Suka blyat</p>" +
                "    </div>\n" +
                "</div>\n" +
                "<script>\n" +
                "    $('.show-list').click(function(){\n" +
                "        $('.wrapper').addClass('list-mode');\n" +
                "    });\n" +
                "\n" +
                "    $('.hide-list').click(function(){\n" +
                "        $('.wrapper').removeClass('list-mode');\n" +
                "    });\n" +
                "    $(function(){\n" +
                "        var header = $(\"nav\"),\n" +
                "            yOffset = 0,\n" +
                "            triggerPoint = 150;\n" +
                "        $(window).scroll(function(){\n" +
                "            yOffset = $(window).scrollTop();\n" +
                "\n" +
                "            if(yOffset >= triggerPoint){\n" +
                "                header.addClass(\"minimized\");\n" +
                "            }else{\n" +
                "                header.removeClass(\"minimized\");\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "</script>\n" +
                "</body>\n" +
                "</html>\n";
            res.send(htmlCode);
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            data.Items.forEach(function (clips) {
                htmlCode += "<div class=\"box\">\n" +
                    "            <img src=\""+clips.img+"\" width=\"195\" height=\"200\" style=\"margin-top: 5px;margin-left: 15px;\"/>\n" +
                    "            <hr/>" +
                    "            <a href=\""+clips.urlVideo+"\" style=\"font-family: 'Times New Roman';font-size: 20px;text-decoration: none;color: #FFFFFF;text-align: center;\"><span style=\"text-align: center;\">"+clips.title+"</span></a>" +
                    "        </div>"
            });
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey !== "undefined") {
                htmlCode += "<br/><p>Scanning for more ... </p>";
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
            htmlCode +=
                "    </div>\n" +
                "</div>\n" +
                "<script>\n" +
                "    $('.show-list').click(function(){\n" +
                "        $('.wrapper').addClass('list-mode');\n" +
                "    });\n" +
                "\n" +
                "    $('.hide-list').click(function(){\n" +
                "        $('.wrapper').removeClass('list-mode');\n" +
                "    });\n" +
                "    $(function(){\n" +
                "        var header = $(\"nav\"),\n" +
                "            yOffset = 0,\n" +
                "            triggerPoint = 150;\n" +
                "        $(window).scroll(function(){\n" +
                "            yOffset = $(window).scrollTop();\n" +
                "\n" +
                "            if(yOffset >= triggerPoint){\n" +
                "                header.addClass(\"minimized\");\n" +
                "            }else{\n" +
                "                header.removeClass(\"minimized\");\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "</script>\n" +
                "</body>\n" +
                "</html>\n";
            res.send(htmlCode);
        }
    });
    //res.sendFile(__dirname + "/public/view/" + 'index.html');
});

app.get('/index',function (req,res) {

    let htmlCode = "<!DOCTYPE html>\n" +
        "<html lang=\"en\" >\n" +
        "\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>Home Page</title>\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width\" />\n" +
        "    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'>\n" +
        "    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700'>\n" +
        "    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css'>\n" +
        "    <link rel=\"stylesheet\" href=\"../CSS/style.css\">\n" +
        "    <link rel=\"Stylesheet\" href='https://fonts.googleapis.com/css?family=Muli' type='text/css'>\n" +
        "    <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,300,300italic,400italic,600italic,600' rel='stylesheet' type='text/css'>\n" +
        "    <link rel=\"Stylesheet\" href=\"css/master.css\" type=\"text/css\" />\n" +
        "    <link rel=\"Stylesheet\" href=\"https://ianlunn.github.io/Hover/css/hover.css\" type=\"text/css\" />\n" +
        "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
        "    <link href=\"../CSS/slide.css\" rel=\"stylesheet\" type=\"text/css\" />\n" +
        "    <style type=\"text/css\">\n" +
        "        *{\n" +
        "            -webkit-box-sizing: border-box;\n" +
        "            -moz-box-sizing: border-box;\n" +
        "            box-sizing: border-box;\n" +
        "        }\n" +
        "        a{\n" +
        "            -webkit-transition: all 0.3s ease;\n" +
        "            -moz-transition: all 0.3s ease;\n" +
        "            -o-transition: all 0.3s ease;\n" +
        "            transition: all 0.3s ease;\n" +
        "        }\n" +
        "        .wrapper{\n" +
        "            width:100%;\n" +
        "            margin:30px auto 0;\n" +
        "            background-color:#FFFFFF;\n" +
        "            -webkit-box-sizing: border-box;\n" +
        "            -moz-box-sizing: border-box;\n" +
        "            box-sizing: border-box;\n" +
        "        }\n" +
        "\n" +
        "        header{\n" +
        "            text-align:right;\n" +
        "            padding:10px;\n" +
        "            margin-bottom:10px;\n" +
        "            background-color:#5DBA9D;\n" +
        "        }\n" +
        "\n" +
        "        header a{\n" +
        "            font-size:20px;\n" +
        "            color:#FFFFFF;\n" +
        "            width:40px;\n" +
        "            height:40px;\n" +
        "            line-height:40px;\n" +
        "            margin-left:10px;\n" +
        "            text-align:center;\n" +
        "            display:inline-block;\n" +
        "        }\n" +
        "\n" +
        "        header a:hover, .list-mode header a.hide-list:hover{\n" +
        "            background-color:#11956c;\n" +
        "        }\n" +
        "\n" +
        "        header a.hide-list{\n" +
        "            background-color:#11956c;\n" +
        "        }\n" +
        "\n" +
        "        .list-mode header a.hide-list{\n" +
        "            background-color:#5DBA9D;\n" +
        "        }\n" +
        "\n" +
        "        .list-mode header a.show-list{\n" +
        "            background-color:#11956c;\n" +
        "        }\n" +
        "\n" +
        "        .container:after{\n" +
        "            content:\"\";\n" +
        "            clear:both;\n" +
        "            display:table;\n" +
        "        }\n" +
        "\n" +
        "        .container{\n" +
        "            padding:10px 0 10px 10px;\n" +
        "        }\n" +
        "\n" +
        "        .wrapper .box{\n" +
        "            float:left;\n" +
        "            width:220px;\n" +
        "            height:300px;\n" +
        "            margin:0 10px 10px 0;\n" +
        "            -webkit-transition:all 1.0s ease;\n" +
        "            -moz-transition:all 1.0s ease;\n" +
        "            transition:all 1.0s ease;\n" +
        "            transition:all 1.0s ease;\n" +
        "        }\n" +
        "\n" +
        "        .wrapper.list-mode .container{\n" +
        "            padding-right:10px;\n" +
        "        }\n" +
        "\n" +
        "        .wrapper.list-mode .box{\n" +
        "            width:100%;\n" +
        "        }\n" +
        "    </style>\n" +
        "</head>\n" +
        "<body>\n" +
        "<div class=\"InnerBackGround\">\n" +
        "    <nav>\n" +
        "        <ul>\n" +
        "            <li><a href=\"/\">Home</a></li>\n" +
        "            <li><a href=\"/decorate\">Trang trí</a></li>\n" +
        "            <li><a href=\"/food\">Đồ ăn</a></li>\n" +
        "            <li><a href=\"/house\">Nhà</a></li>\n" +
        "            <li><a href=\"/origami\">Origami</a></li>\n" +
        "            <li class=\"nav-item\"><a href=\"/login\" target=\"_blank\" class=\"btn btn-danger btn-round\">Login</a></li>\n" +
        "        </ul>\n" +
        "    </nav>\n" +
        "</div>\n" +
        "<div class=\"wrapper\">\n" +
        "    <header>\n" +
        "        <a href=\"javascript:void(0)\" class=\"show-list\"><i class=\"fa fa-th-list\"></i></a>\n" +
        "        <a href=\"javascript:void(0)\" class=\"hide-list\"><i class=\"fa fa-th\"></i></a>\n" +
        "    </header>\n"+
        "    <div class=\"container\">\n";

    let awsConfig = {
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId":"AKIAJEG3MOG53ZNL6JIQ","secretAccessKey":"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"
    };
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "videos",
        ProjectionExpression:"img,urlVideo,title"
    };
    //lỗi ở đây là code không tìm thấy bảng
    docClient.scan(params, function (err,data) {
        if (err){
            htmlCode +="<p>Suka blyat</p>" +
                "    </div>\n" +
                "</div>\n" +
                "<script>\n" +
                "    $('.show-list').click(function(){\n" +
                "        $('.wrapper').addClass('list-mode');\n" +
                "    });\n" +
                "\n" +
                "    $('.hide-list').click(function(){\n" +
                "        $('.wrapper').removeClass('list-mode');\n" +
                "    });\n" +
                "    $(function(){\n" +
                "        var header = $(\"nav\"),\n" +
                "            yOffset = 0,\n" +
                "            triggerPoint = 150;\n" +
                "        $(window).scroll(function(){\n" +
                "            yOffset = $(window).scrollTop();\n" +
                "\n" +
                "            if(yOffset >= triggerPoint){\n" +
                "                header.addClass(\"minimized\");\n" +
                "            }else{\n" +
                "                header.removeClass(\"minimized\");\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "</script>\n" +
                "</body>\n" +
                "</html>\n";
            res.send(htmlCode);
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            data.Items.forEach(function (clips) {
                htmlCode += "<div class=\"box\">\n" +
                    "            <img src=\""+clips.img+"\" width=\"195\" height=\"200\" style=\"margin-top: 5px;margin-left: 15px;\"/>\n" +
                    "            <hr/>" +
                    "            <a href=\""+clips.urlVideo+"\" style=\"font-family: 'Times New Roman';font-size: 20px;text-decoration: none;color: #FFFFFF;text-align: center;\"><span style=\"text-align: center;\">"+clips.title+"</span></a>" +
                    "        </div>"
            });
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey !== "undefined") {
                htmlCode += "<br/><p>Scanning for more ... </p>";
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
            htmlCode +=
                "    </div>\n" +
                "</div>\n" +
                "<script>\n" +
                "    $('.show-list').click(function(){\n" +
                "        $('.wrapper').addClass('list-mode');\n" +
                "    });\n" +
                "\n" +
                "    $('.hide-list').click(function(){\n" +
                "        $('.wrapper').removeClass('list-mode');\n" +
                "    });\n" +
                "    $(function(){\n" +
                "        var header = $(\"nav\"),\n" +
                "            yOffset = 0,\n" +
                "            triggerPoint = 150;\n" +
                "        $(window).scroll(function(){\n" +
                "            yOffset = $(window).scrollTop();\n" +
                "\n" +
                "            if(yOffset >= triggerPoint){\n" +
                "                header.addClass(\"minimized\");\n" +
                "            }else{\n" +
                "                header.removeClass(\"minimized\");\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "</script>\n" +
                "</body>\n" +
                "</html>\n";
            res.send(htmlCode);
        }
    });
    //res.sendFile(__dirname + "/public/view/" + 'index.html');
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
    res.sendFile(__dirname+ "/public/view/" + 'house.html');
});

app.get('/writerpage',function (req,res) {
    //res.sendFile(__dirname+ "/public/view/" + 'WriterPage.html');
    Renderator.WriterPageRender(req,res);
});

app.get('/editorrender',function (req,res) {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'EditorPage.html');
    Renderator.EditorPageRender(req,res);
});

app.get('/postedrender',function (req,res) {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'Posted.html');
    Renderator.PostedRender(req,res);
});

app.get('/Commentrender',function (req,res) {
    //res.sendFile(__dirname+ "/public/view.partials/" + 'Comments.html');
    Renderator.CommentRender(req,res);
});

app.get('/WatchingRender',function (req,res) {
    //res.sendFile(__dirname+ "/public/view/partials/" + 'Watching.html');
    Renderator.WatchingRender(req,res);
});

app.get('/WatchedRender',function (req,res) {
    Renderator.WatchedRender(req,res);
});
//below method help to retrieve data

//create token
function createToken(email) {
    let expiresDate = Math.floor(Data.now() / 1000) + 300;//300 seconds from now
    var token = jsonwebtoken.sign({userId:email, exp: expiresDate}, 'secret');
    return token;
}

//let apiRoute = express.Router();
app.post('/authenticate',urlencodedParser,function (req,res) {

    let email = req.body.txtemail;
    let password = req.body.txtpassword;
    console.log(email+" "+password);
    let awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": "AKIAJEQNFFLG6EFF6DEQ", "secretAccessKey": "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"
    };

    AWS.config.update(awsConfig);
    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "blyat_account",
        Key: {
            "email": email,
            "pass" : password
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
            console.log("Congrat blyat");
        }
    })
    //////////////////////////////////////////////////
    /*
    let mongourl = "mongodb://MikuRoot:ireallylovemiku-chan3108@cluster0-shard-00-00-0zn17.mongodb.net:27017,cluster0-shard-00-01-0zn17.mongodb.net:27017,cluster0-shard-00-02-0zn17.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
    let mongoclient = require('mongodb').MongoClient;
    mongoclient.connect(mongourl,function (err,db) {
        if (err)
            console.log(err);
        let dbo = db.db("handmadedata");
        dbo.collection("account").findOne({},function (err,result) {
            if (err)
                console.log(err);
                console.log(result.email + " isn't like "+email);
            db.close();
        });
    });
    User.findOne({
        email:"tranthevu.iuh@gmail.com",
    },function (err,user) {
        if (err)
            throw err;
        if (!user){
            res.json({
                success:false,message:'Authentication failed.User not found.'
            });
        } else if (user){
            if (user.password != "mikubest"){
                res.json({
                    success:false,message:'Authentication failed.Wrong password.'
                });
            } else{
                let token = jsonwebtoken.sign(user,app.get('superSecret'),{
                    expiresInMinutes: 1440
                });
                res.json({
                    success:true,
                    message:'welcome blyat !',
                    token: token
                });
            }
        }
    });*/
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server dang lang nghe tai dia chi: http://%s:%s", host, port)
});