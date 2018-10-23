const express = require('express');
const app = express();
let multer = require('multer');
let bodyParser = require('body-parser');
let AWS = require('aws-sdk');
let url = require('url');
let fs = require('fs');
let path = require('path');
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

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const uploadVideo = multer({
    dest: "./api/videos"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

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
        "            height: 500px;\n" +
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
        "    <style>\n" +
        "        :root {\n" +
        "            --font-primary: \"Open Sans\", sans-serif;\n" +
        "            --font-secondary: \"Josefin Sans\", sans-serif;\n" +
        "            --color-primary: #7c83ff;\n" +
        "            --color-secondary: #f097a5;\n" +
        "            --color-text-primary: #000;\n" +
        "            --color-text-secondary: #666;\n" +
        "            --bg-body: #eee;\n" +
        "            --bg-primary: #fff;\n" +
        "            --bg-secondary: #fcfcfc;\n" +
        "            --rem-mobile: 10px;\n" +
        "            --rem-tablet: 12px;\n" +
        "            --rem-laptop: 13px;\n" +
        "            --rem-desktop: 14px;\n" +
        "            --rem-big: 16px;\n" +
        "            --size-mini: 0.8rem;\n" +
        "            --size-small: 1.5rem;\n" +
        "            --size-medium: 2rem;\n" +
        "            --size-big: 3rem;\n" +
        "            --size-massive: 4rem;\n" +
        "        }\n" +
        "\n" +
        "        *,\n" +
        "        *::before,\n" +
        "        *::after {\n" +
        "            margin: 0;\n" +
        "            padding: 0;\n" +
        "            box-sizing: inherit;\n" +
        "        }\n" +
        "\n" +
        "        html {\n" +
        "            box-sizing: border-box;\n" +
        "            font-size: 10px;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            html {\n" +
        "                font-size: 12px;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 769px) {\n" +
        "            html {\n" +
        "                font-size: 13px;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 1025px) {\n" +
        "            html {\n" +
        "                font-size: 14px;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 1441px) {\n" +
        "            html {\n" +
        "                font-size: 16px;\n" +
        "            }\n" +
        "        }\n" +
        "\n" +
        "        body {\n" +
        "            font-size: 1.4rem;\n" +
        "            background-color: #eee;\n" +
        "            font-family: var(--font-primary);\n" +
        "        }\n" +
        "\n" +
        "        .Icon {\n" +
        "            transition: all 0.3s;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--colored {\n" +
        "            fill: #f097a5;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--stroked {\n" +
        "            fill: none;\n" +
        "            stroke: var(--color-secondary);\n" +
        "            stroke-width: 3px;\n" +
        "        }\n" +
        "\n" +
        "        .Icon:hover {\n" +
        "            opacity: 0.75;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--small {\n" +
        "            height: 1.5rem;\n" +
        "            width: 1.5rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--medium {\n" +
        "            height: 2rem;\n" +
        "            width: 2rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--big {\n" +
        "            height: 3rem;\n" +
        "            width: 3rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--massive {\n" +
        "            height: 4rem;\n" +
        "            width: 4rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--facebook {\n" +
        "            fill: #3b5999;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--twitter {\n" +
        "            fill: #55acee;\n" +
        "        }\n" +
        "\n" +
        "        .SocialLink {\n" +
        "            text-decoration: none;\n" +
        "            transition: all 0.3s;\n" +
        "            padding: 0 .2rem;\n" +
        "        }\n" +
        "\n" +
        "        .IconBtn {\n" +
        "            padding: 0;\n" +
        "            border: none;\n" +
        "            background-color: transparent;\n" +
        "            cursor: pointer;\n" +
        "            outline: none;\n" +
        "        }\n" +
        "\n" +
        "        .ProductSet {\n" +
        "            display: flex;\n" +
        "            flex-wrap: wrap;\n" +
        "            padding: 1rem;\n" +
        "        }\n" +
        "        .ProductSet--grid {\n" +
        "            margin-left: 1rem;\n" +
        "            justify-content: center;\n" +
        "            height: auto;\n" +
        "        }\n" +
        "        .ProductSet--grid > * {\n" +
        "            margin: 0 1rem 1rem 0;\n" +
        "        }\n" +
        "        .ProductSet--list {\n" +
        "            flex-direction: column;\n" +
        "        }\n" +
        "        .ProductSet--list > *:not(:last-child) {\n" +
        "            margin-bottom: 1rem;\n" +
        "        }\n" +
        "\n" +
        "        .ProductCard {\n" +
        "            display: flex;\n" +
        "            text-decoration: none;\n" +
        "            border-radius: 1rem;\n" +
        "            overflow: hidden;\n" +
        "            background-color: #fff;\n" +
        "            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);\n" +
        "            transition: all 0.2s;\n" +
        "        }\n" +
        "        .ProductCard:hover {\n" +
        "            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n" +
        "            transform: translateY(-0.5rem);\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard {\n" +
        "                font-size: 1.2rem;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard--grid {\n" +
        "            width: 140rem;\n" +
        "            flex-direction: column;\n" +
        "        }\n" +
        "        .ProductCard--list {\n" +
        "            max-height: 15rem;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__img-wrapper {\n" +
        "            max-width: 15rem;\n" +
        "            width: 40%;\n" +
        "            margin: 2rem 0 2rem 2rem;\n" +
        "            overflow: hidden;\n" +
        "            display: flex;\n" +
        "            align-items: center;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard--list .ProductCard__img-wrapper {\n" +
        "                margin: initial;\n" +
        "                flex: 1 1 auto;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard__img {\n" +
        "            width: 100%;\n" +
        "        }\n" +
        "        .ProductCard--grid .ProductCard__details {\n" +
        "            padding: 3rem 1.5rem;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__details {\n" +
        "            margin: 2.5rem;\n" +
        "            width: 60%;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard--list .ProductCard__details {\n" +
        "                width: 0;\n" +
        "                flex: 1 1 auto;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard__details__header {\n" +
        "            display: flex;\n" +
        "            justify-content: space-between;\n" +
        "        }\n" +
        "        .ProductCard--grid .ProductCard__details__header {\n" +
        "            align-items: flex-end;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__details__header {\n" +
        "            margin-bottom: 2rem;\n" +
        "            align-items: flex-start;\n" +
        "        }\n" +
        "        .ProductCard .ProductCard__titles {\n" +
        "            margin-right: 1rem;\n" +
        "        }\n" +
        "        .ProductCard__title {\n" +
        "            color: #000;\n" +
        "            margin-bottom: 1rem;\n" +
        "            text-transform: uppercase;\n" +
        "            font-family: var(--font-secondary);\n" +
        "            font-weight: 400;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__title {\n" +
        "            margin-bottom: 1.5rem;\n" +
        "        }\n" +
        "        .ProductCard__price {\n" +
        "            font-size: 1.2rem;\n" +
        "            color: var(--color-text-secondary);\n" +
        "            font-weight: 400;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard__price {\n" +
        "                font-size: 1.1rem;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard__description {\n" +
        "            color: var(--color-text-secondary);\n" +
        "            display: none;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard__description {\n" +
        "                font-size: 1rem;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard--list .ProductCard__description {\n" +
        "                overflow: hidden;\n" +
        "                text-overflow: ellipsis;\n" +
        "                white-space: nowrap;\n" +
        "                display: block;\n" +
        "            }\n" +
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
        "    </header>\n" +
        "    <div class=\"container\">";

    AWS.config.update({
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com"
    });

    AWS.config.accessKeyId = "AKIAJ4OFNH7CPWMEDZLA";
    AWS.config.secretAccessKey = "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";

    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "xvideos",
        ProjectionExpression:"email,HandleName,image,urlVideo"
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
                    "            <div class=\"ProductSet ProductSet--grid\">\n" +
                    "                <!-- Product Card: vertical -->\n" +
                    "                <a href=\"#\" class=\"ProductCard ProductCard--grid\">\n" +
                    "                    <div class=\"ProductCard__img-wrapper\">\n" +
                    "                        <img src=\""+clips.image+"\" alt=\"\" class=\"ProductCard__img\">\n" +
                    "                    </div>\n" +
                    "                    <div class=\"ProductCard__details\">\n" +
                    "                        <div class=\"ProductCard__details__header\">\n" +
                    "                            <div class=\"ProductCard__titles\">\n" +
                    "                                <h4 class=\"ProductCard__title\">"+clips.summary+"</h4>\n" +
                    "                                <h5 class=\"ProductCard__price\">"+clips.HandleName+"</h5>\n" +
                    "                            </div>\n" +
                    "                            <button class=\"IconBtn\">\n" +
                    "                                <svg class=\"Icon Icon--medium Icon--colored\">\n" +
                    "                                    <use xlink:href=\"./src/img/icons/svg-sprite.svg#heart\"></use>\n" +
                    "                                </svg>\n" +
                    "                            </button>\n" +
                    "                        </div>\n" +
                    "                        <p class=\"ProductCard__description\">\n" +
                    "                            \n" +
                    "                        </p>\n" +
                    "                    </div>\n" +
                    "                </a>\n" +
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
        "region": "us-east-1",
        "endpoint": "dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": "AKIAJ4OFNH7CPWMEDZLA", "secretAccessKey": "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"
    };
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "videos",
        ProjectionExpression:"email,image,url,summary"
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
                    "            <img src=\""+clips.image+"\" width=\"195\" height=\"200\" style=\"margin-top: 5px;margin-left: 15px;\"/>\n" +
                    "            <hr/>" +
                    "            <a href=\""+clips.url+"\" style=\"font-family: 'Times New Roman';font-size: 20px;text-decoration: none;color: #FFFFFF;text-align: center;\"><span style=\"text-align: center;\">"+clips.summary+"</span></a>" +
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
    let htmlcode = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>Origami</title>\n" +
        "    <style type=\"text/css\">\n" +
        "        @import \"compass/css3\";\n" +
        "        body {\n" +
        "            background: url(http://s1.1zoom.me/b6649/540/Bulls_Paper_Origami_523454_1600x1200.jpg) no-repeat;\n" +
        "            background-size: cover;\n" +
        "            height: 1000px;\n" +
        "        }\n" +
        "        header {\n" +
        "            font-family: sans-serif;\n" +
        "            position: fixed;\n" +
        "            width: 100%;\n" +
        "            height: 150px;\n" +
        "            top: 0;\n" +
        "            left: 0;\n" +
        "            background-color: rgba(22, 22, 22, 0.4);\n" +
        "            border-bottom: 3px solid rgba(0, 0, 0, 0.4);\n" +
        "            -webkit-transition: height 0.3s;\n" +
        "        }\n" +
        "        header .container {\n" +
        "            width: 100%;\n" +
        "            margin: 0 auto;\n" +
        "        }\n" +
        "        header h1 {\n" +
        "            margin-top: 0;\n" +
        "        }\n" +
        "        header h1, header nav {\n" +
        "            display: inline-block;\n" +
        "            position: relative;\n" +
        "            line-height: 150px;\n" +
        "            -webkit-transition: all 0.3s;\n" +
        "        }\n" +
        "        header a {\n" +
        "            text-decoration: none;\n" +
        "            color: #ccc;\n" +
        "        }\n" +
        "        header nav {\n" +
        "            float: right;\n" +
        "            line-height: 150px;\n" +
        "            font-size: 1.4em;\n" +
        "            padding-right: 20px;\n" +
        "        }\n" +
        "        header nav a {\n" +
        "            margin-left: 10px;\n" +
        "        }\n" +
        "        header nav a:hover {\n" +
        "            border-top: 2px dotted white;\n" +
        "            border-bottom: 2px dotted white;\n" +
        "        }\n" +
        "        header.minimized {\n" +
        "            height: 60px;\n" +
        "        }\n" +
        "        header.minimized h1, header.minimized nav {\n" +
        "            line-height: 60px;\n" +
        "        }\n" +
        "        header.minimized nav {\n" +
        "            font-size: 1.2em;\n" +
        "        }\n" +
        "        header.minimized h1 {\n" +
        "            font-size: 1.7em;\n" +
        "        }\n" +
        "        .container {\n" +
        "            height: 700px;\n" +
        "        }\n" +
        "        .down_container{\n" +
        "            margin-top: 910px;\n" +
        "            background-color: white;\n" +
        "            min-height: 500px;\n" +
        "            margin-left: 10px;\n" +
        "        }\n" +
        "    </style>\n" +
        "    <style>\n" +
        "        :root {\n" +
        "            --font-primary: \"Open Sans\", sans-serif;\n" +
        "            --font-secondary: \"Josefin Sans\", sans-serif;\n" +
        "            --color-primary: #7c83ff;\n" +
        "            --color-secondary: #f097a5;\n" +
        "            --color-text-primary: #000;\n" +
        "            --color-text-secondary: #666;\n" +
        "            --bg-body: #eee;\n" +
        "            --bg-primary: #fff;\n" +
        "            --bg-secondary: #fcfcfc;\n" +
        "            --rem-mobile: 10px;\n" +
        "            --rem-tablet: 12px;\n" +
        "            --rem-laptop: 13px;\n" +
        "            --rem-desktop: 14px;\n" +
        "            --rem-big: 16px;\n" +
        "            --size-mini: 0.8rem;\n" +
        "            --size-small: 1.5rem;\n" +
        "            --size-medium: 2rem;\n" +
        "            --size-big: 3rem;\n" +
        "            --size-massive: 4rem;\n" +
        "        }\n" +
        "\n" +
        "        *,\n" +
        "        *::before,\n" +
        "        *::after {\n" +
        "            margin: 0;\n" +
        "            padding: 0;\n" +
        "            box-sizing: inherit;\n" +
        "        }\n" +
        "\n" +
        "        html {\n" +
        "            box-sizing: border-box;\n" +
        "            font-size: 10px;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            html {\n" +
        "                font-size: 12px;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 769px) {\n" +
        "            html {\n" +
        "                font-size: 13px;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 1025px) {\n" +
        "            html {\n" +
        "                font-size: 14px;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 1441px) {\n" +
        "            html {\n" +
        "                font-size: 16px;\n" +
        "            }\n" +
        "        }\n" +
        "\n" +
        "        body {\n" +
        "            font-size: 1.4rem;\n" +
        "            background-color: #eee;\n" +
        "            font-family: var(--font-primary);\n" +
        "        }\n" +
        "\n" +
        "        .Icon {\n" +
        "            transition: all 0.3s;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--colored {\n" +
        "            fill: #f097a5;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--stroked {\n" +
        "            fill: none;\n" +
        "            stroke: var(--color-secondary);\n" +
        "            stroke-width: 3px;\n" +
        "        }\n" +
        "\n" +
        "        .Icon:hover {\n" +
        "            opacity: 0.75;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--small {\n" +
        "            height: 1.5rem;\n" +
        "            width: 1.5rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--medium {\n" +
        "            height: 2rem;\n" +
        "            width: 2rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--big {\n" +
        "            height: 3rem;\n" +
        "            width: 3rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--massive {\n" +
        "            height: 4rem;\n" +
        "            width: 4rem;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--facebook {\n" +
        "            fill: #3b5999;\n" +
        "        }\n" +
        "\n" +
        "        .Icon--twitter {\n" +
        "            fill: #55acee;\n" +
        "        }\n" +
        "\n" +
        "        .SocialLink {\n" +
        "            text-decoration: none;\n" +
        "            transition: all 0.3s;\n" +
        "            padding: 0 .2rem;\n" +
        "        }\n" +
        "\n" +
        "        .IconBtn {\n" +
        "            padding: 0;\n" +
        "            border: none;\n" +
        "            background-color: transparent;\n" +
        "            cursor: pointer;\n" +
        "            outline: none;\n" +
        "        }\n" +
        "\n" +
        "        .ProductSet {\n" +
        "            display: flex;\n" +
        "            flex-wrap: wrap;\n" +
        "            padding: 1rem;\n" +
        "        }\n" +
        "        .ProductSet--grid {\n" +
        "            margin-left: 1rem;\n" +
        "            justify-content: center;\n" +
        "        }\n" +
        "        .ProductSet--grid > * {\n" +
        "            margin: 0 1rem 1rem 0;\n" +
        "        }\n" +
        "        .ProductSet--list {\n" +
        "            flex-direction: column;\n" +
        "        }\n" +
        "        .ProductSet--list > *:not(:last-child) {\n" +
        "            margin-bottom: 1rem;\n" +
        "        }\n" +
        "\n" +
        "        .ProductCard {\n" +
        "            display: flex;\n" +
        "            text-decoration: none;\n" +
        "            border-radius: 1rem;\n" +
        "            overflow: hidden;\n" +
        "            background-color: #fff;\n" +
        "            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);\n" +
        "            transition: all 0.2s;\n" +
        "        }\n" +
        "        .ProductCard:hover {\n" +
        "            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n" +
        "            transform: translateY(-0.5rem);\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard {\n" +
        "                font-size: 1.2rem;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard--grid {\n" +
        "            width: 25rem;\n" +
        "            flex-direction: column;\n" +
        "        }\n" +
        "        .ProductCard--list {\n" +
        "            max-height: 15rem;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__img-wrapper {\n" +
        "            max-width: 15rem;\n" +
        "            width: 40%;\n" +
        "            margin: 2rem 0 2rem 2rem;\n" +
        "            overflow: hidden;\n" +
        "            display: flex;\n" +
        "            align-items: center;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard--list .ProductCard__img-wrapper {\n" +
        "                margin: initial;\n" +
        "                flex: 1 1 auto;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard__img {\n" +
        "            width: 100%;\n" +
        "        }\n" +
        "        .ProductCard--grid .ProductCard__details {\n" +
        "            padding: 3rem 2.5rem;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__details {\n" +
        "            margin: 2.5rem;\n" +
        "            width: 60%;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard--list .ProductCard__details {\n" +
        "                width: 0;\n" +
        "                flex: 1 1 auto;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard__details__header {\n" +
        "            display: flex;\n" +
        "            justify-content: space-between;\n" +
        "        }\n" +
        "        .ProductCard--grid .ProductCard__details__header {\n" +
        "            align-items: flex-end;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__details__header {\n" +
        "            margin-bottom: 2rem;\n" +
        "            align-items: flex-start;\n" +
        "        }\n" +
        "        .ProductCard .ProductCard__titles {\n" +
        "            margin-right: 1rem;\n" +
        "        }\n" +
        "        .ProductCard__title {\n" +
        "            color: #000;\n" +
        "            margin-bottom: 1rem;\n" +
        "            text-transform: uppercase;\n" +
        "            font-family: var(--font-secondary);\n" +
        "            font-weight: 400;\n" +
        "        }\n" +
        "        .ProductCard--list .ProductCard__title {\n" +
        "            margin-bottom: 1.5rem;\n" +
        "        }\n" +
        "        .ProductCard__price {\n" +
        "            font-size: 1.2rem;\n" +
        "            color: var(--color-text-secondary);\n" +
        "            font-weight: 400;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard__price {\n" +
        "                font-size: 1.1rem;\n" +
        "            }\n" +
        "        }\n" +
        "        .ProductCard__description {\n" +
        "            color: var(--color-text-secondary);\n" +
        "            display: none;\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard__description {\n" +
        "                font-size: 1rem;\n" +
        "            }\n" +
        "        }\n" +
        "        @media screen and (min-width: 426px) {\n" +
        "            .ProductCard--list .ProductCard__description {\n" +
        "                overflow: hidden;\n" +
        "                text-overflow: ellipsis;\n" +
        "                white-space: nowrap;\n" +
        "                display: block;\n" +
        "            }\n" +
        "        }\n" +
        "\n" +
        "    </style>\n" +
        "</head>\n" +
        "<body style=\"background-color: #333333;\">\n" +
        "<header>\n" +
        "    <div class=\"container\">\n" +
        "        <h1><a href=\"index\" style=\"margin-left: 30px;\">Blyat Co.</a></h1>\n" +
        "        <span style=\"font-family: 'MV Boli'; color: #ffffff; margin-left: 100px;margin-top: 50px;\">\n" +
        "                <h1>Handmade Origami</h1>\n" +
        "            </span>\n" +
        "        <nav>\n" +
        "            <a href=\"index\">Trang chủ</a>\n" +
        "            <a href=\"decorate\">Sản phẩm trang trí</a>\n" +
        "            <a href=\"food\">Đồ ăn</a>\n" +
        "            <a href=\"house\">Nhà</a>\n" +
        "        </nav>\n" +
        "    </div>\n" +
        "</header>\n" +
        "<span>\n" +
        "        <div class=\"down_container\">\n" +
        "            <p>Blyat</p>";
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
app.post("/Dangbai", urlencodedParser, uploadVideo.single("fileupload" /* name attribute of <file> element in post form */), (req, res) => {
        const file_name = req.body.video_path;
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./upload/video/" + file_name);

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
        });

        AWS.config.update({
            region:'us-east-1',
            endpoint:'http://s3.amazonaws.com',
            "accessKeyId": "AKIAJ4OFNH7CPWMEDZLA", "secretAccessKey": "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"
        });
//create s3 service object
        s3 = new AWS.S3({ apiVersion : '2006-03-01' });

//call s3 to retrieve upload file to specified bucket
        let uploadParams = {Bucket: "xvideos002", Key: '', Body: '',ACL:'public-read-write'};
        let fileStream = fs.createReadStream(targetPath);

        fileStream.on('error', function (err) {
            console.log('File error', err);
        });

        uploadParams.Body = fileStream;
        uploadParams.Key = "videos/" + path.basename(targetPath);

//call s3 to retrieve upload file to specified bucket
        s3.upload( uploadParams, function (err, data) {
            if (err)
                console.log("Error", err);
            else
                console.log("Upload success", data.Location);
        });
    }
);
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
        "accessKeyId": "AKIAIVDZBCTS76F4HMYQ", "secretAccessKey": "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"
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