let jwt = require('jsonwebtoken');
let AWS = require('aws-sdk');
let config = require('./config.json');
let Renderator = require('./Renderator');
let OptionFunction = require('./OptionalFunctions');
let sess = require('express-session');

exports.register = function (email,pass,res){
    let EMAIL = email.toString();
    let PASS = pass.toString();

    let awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.sercretkey
    };

    AWS.config.update(awsConfig);
    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "Account",
        Item:{
            "EMAIL_ADDRESS" : EMAIL,
            "PASS" : PASS
        }
    };
    docClient.put(params, function (err, data) {
        if (err)
            console.log("Unable to add a new item.Please review some json errors : ",JSON.stringify(err,null,2));
        else
            console.log("Added item:",JSON.stringify(data,null,2));
    });
    res.redirect("/login");
};

exports.sign_in = function (email,pass,req,res,app){

    let token = "";
    let EMAIL = email.toString();
    let PASS = pass.toString();
    let expiresDate = Math.floor(Date.now() / 1000) + 300;//300 seconds from now

    let awsConfig = {
        "region": "us-east-1",
        "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    };

    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "Account",
        KeyConditionExpression: "#email = :letter",
        ExpressionAttributeNames:{
            "#email":"EMAIL_ADDRESS"
        },
        ExpressionAttributeValues:{
            ":letter" : EMAIL
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            res.sendFile(__dirname + "../../public/view/" + '403Forbidden.html');
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            data.Items.forEach(function (item) {
               if (item.PASS === PASS){
                   token += jwt.sign({ userId:EMAIL, exp: expiresDate}, config.jwtsecretkey).toString();
                    Renderator.WriterPageRender(req,res,email);
                    sess = req.session;
                    console.log(sess);
               } else {
                    res.redirect('/login');
               }
            });
        }
    });
};
exports.errorHandler = function(err, req, res, next){
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
};
exports.loginRequired = function (req,res,next){
    if (req.session && req.session.userId){
        return next();
    } else {
        let code = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>403 Forbidden</title>\n" +
            "    <style type=\"text/css\">\n" +
            "        html,\n" +
            "        body {\n" +
            "            width: 100%;\n" +
            "            height: 100%;\n" +
            "            margin: 0;\n" +
            "            padding: 0;\n" +
            "            font-family: 'Limelight', cursive;\n" +
            "            color: #38434A;\n" +
            "        }\n" +
            "        .background {\n" +
            "            position: absolute;\n" +
            "            left: 50%;\n" +
            "            bottom: 0;\n" +
            "            transform: translateX(-50%);\n" +
            "        }\n" +
            "        .background::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: -100px;\n" +
            "            left: 50%;\n" +
            "            transform: translateX(-50%);\n" +
            "            width: 450px;\n" +
            "            height: 450px;\n" +
            "            background: #EEE8E0;\n" +
            "            border-radius: 50%;\n" +
            "            z-index: -1;\n" +
            "        }\n" +
            "        .background::after {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: -150px;\n" +
            "            left: 50%;\n" +
            "            transform: translateX(-50%);\n" +
            "            width: 550px;\n" +
            "            height: 550px;\n" +
            "            background: red;\n" +
            "            border-radius: 50%;\n" +
            "            z-index: -2;\n" +
            "        }\n" +
            "        .door {\n" +
            "            position: relative;\n" +
            "            width: 180px;\n" +
            "            height: 300px;\n" +
            "            margin: 0 auto -10px;\n" +
            "            background: #F3F2EE;\n" +
            "            border: 10px solid #DAD2C9;\n" +
            "            border-radius: 3px;\n" +
            "            font-size: 50px;\n" +
            "            line-height: 3;\n" +
            "            text-align: center;\n" +
            "            text-shadow: 0 2px #F5AE4E;\n" +
            "        }\n" +
            "        .door::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: 140px;\n" +
            "            right: 10px;\n" +
            "            width: 25px;\n" +
            "            height: 25px;\n" +
            "            background: #1D2528;\n" +
            "            border-radius: 50%;\n" +
            "        }\n" +
            "        .door::after {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: 148px;\n" +
            "            right: 18px;\n" +
            "            width: 35px;\n" +
            "            height: 10px;\n" +
            "            background: #49555B;\n" +
            "            border-radius: 5px;\n" +
            "        }\n" +
            "        .rug {\n" +
            "            width: 180px;\n" +
            "            border-bottom: 120px solid #CF352C;\n" +
            "            border-left: 50px solid transparent;\n" +
            "            border-right: 50px solid transparent;\n" +
            "        }\n" +
            "        .rug::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: relative;\n" +
            "            width: 100%;\n" +
            "            height: 10px;\n" +
            "            background: #9C0502;\n" +
            "        }\n" +
            "        .foreground {\n" +
            "            position: absolute;\n" +
            "            left: 50%;\n" +
            "            bottom: 0;\n" +
            "            transform: translateX(-50%);\n" +
            "        }\n" +
            "        .bouncer {\n" +
            "            position: relative;\n" +
            "            left: -130px;\n" +
            "            transition: left 1.5s;\n" +
            "        }\n" +
            "        .bouncer .head {\n" +
            "            position: relative;\n" +
            "            left: 10px;\n" +
            "            margin-bottom: 10px;\n" +
            "            width: 65px;\n" +
            "            height: 90px;\n" +
            "            background: #FFB482;\n" +
            "            border-radius: 15px;\n" +
            "            border-top-left-radius: 30px;\n" +
            "            border-top-right-radius: 30px;\n" +
            "        }\n" +
            "        .bouncer .head::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            right: 0;\n" +
            "            bottom: 0;\n" +
            "            width: 55px;\n" +
            "            height: 40px;\n" +
            "            background: rgba(0,0,0,0.1);\n" +
            "            border-radius: 10px;\n" +
            "            border-top-left-radius: 30px;\n" +
            "            border-bottom-right-radius: 15px;\n" +
            "            z-index: 10;\n" +
            "        }\n" +
            "        .bouncer .head .neck {\n" +
            "            position: absolute;\n" +
            "            bottom: -15px;\n" +
            "            width: 48px;\n" +
            "            height: 30px;\n" +
            "            background: #FFB482;\n" +
            "            z-index: 5;\n" +
            "        }\n" +
            "        .bouncer .head .neck::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: 15px;\n" +
            "            right: 0;\n" +
            "            width: 0px;\n" +
            "            height: 0px;\n" +
            "            border-left: 15px solid transparent;\n" +
            "            border-right: 15px solid rgba(0,0,0,0.3);\n" +
            "            border-top: 2px solid rgba(0,0,0,0.3);\n" +
            "            border-bottom: 2px solid transparent;\n" +
            "        }\n" +
            "        .bouncer .head .eye {\n" +
            "            position: absolute;\n" +
            "            top: 40px;\n" +
            "            width: 5px;\n" +
            "            height: 5px;\n" +
            "            background: #1D2528;\n" +
            "            border-radius: 50%;\n" +
            "        }\n" +
            "        .bouncer .head .eye.left {\n" +
            "            right: 5px;\n" +
            "        }\n" +
            "        .bouncer .head .eye.right {\n" +
            "            right: 30px;\n" +
            "        }\n" +
            "        .bouncer .head .eye::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: relative;\n" +
            "            bottom: 8px;\n" +
            "            right: 5px;\n" +
            "            width: 15px;\n" +
            "            height: 5px;\n" +
            "            background: rgba(0,0,0,0.3);\n" +
            "            border-radius: 5px;\n" +
            "            transition: bottom .5s;\n" +
            "        }\n" +
            "        .bouncer .head .ear {\n" +
            "            position: relative;\n" +
            "            top: 40px;\n" +
            "            left: -10px;\n" +
            "            width: 20px;\n" +
            "            height: 20px;\n" +
            "            background: #FFB482;\n" +
            "            border-radius: 50%;\n" +
            "        }\n" +
            "        .bouncer .head .ear::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: relative;\n" +
            "            top: 5px;\n" +
            "            left: 5px;\n" +
            "            width: 10px;\n" +
            "            height: 10px;\n" +
            "            background: #FFF;\n" +
            "            border-radius: 50%;\n" +
            "        }\n" +
            "        .bouncer .head .ear::after {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: relative;\n" +
            "            top: -3px;\n" +
            "            left: 10px;\n" +
            "            width: 10px;\n" +
            "            height: 55px;\n" +
            "            border-top: 3px solid transparent;\n" +
            "            border-left: 2px solid #FFF;\n" +
            "            border-bottom: 3px solid transparent;\n" +
            "            border-radius: 50%;\n" +
            "            transform: rotate(-10deg);\n" +
            "            z-index: 10;\n" +
            "        }\n" +
            "        .bouncer .body {\n" +
            "            position: relative;\n" +
            "            width: 110px;\n" +
            "            height: 270px;\n" +
            "            background: #1D2528;\n" +
            "            border-top-right-radius: 45px;\n" +
            "            border-top-left-radius: 15px;\n" +
            "        }\n" +
            "        .bouncer .body::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: relative;\n" +
            "            top: 5px;\n" +
            "            width: 104px;\n" +
            "            height: 110px;\n" +
            "            background: #FFF;\n" +
            "            border-top-right-radius: 42px;\n" +
            "        }\n" +
            "        .bouncer .body::after {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: 0;\n" +
            "            width: 75px;\n" +
            "            height: 180px;\n" +
            "            background: #38434A;\n" +
            "            border-top-right-radius: 42px;\n" +
            "            border-top-left-radius: 15px;\n" +
            "            border-bottom-right-radius: 100px;\n" +
            "            border-bottom-left-radius: 10px;\n" +
            "            z-index: 15;\n" +
            "        }\n" +
            "        .bouncer .arm {\n" +
            "            position: absolute;\n" +
            "            top: 105px;\n" +
            "            left: -20px;\n" +
            "            width: 60px;\n" +
            "            height: 230px;\n" +
            "            background: #49555B;\n" +
            "            border-radius: 30px;\n" +
            "            box-shadow: -1px 0px #1D2528;\n" +
            "            transform: rotate(-30deg);\n" +
            "            transform-origin: top center;\n" +
            "            z-index: 20;\n" +
            "            transition: transform 1s;\n" +
            "        }\n" +
            "        .bouncer .arm::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            bottom: 0;\n" +
            "            width: 60px;\n" +
            "            height: 60px;\n" +
            "            background: #FFB482;\n" +
            "            border-radius: 50%;\n" +
            "        }\n" +
            "        .poles {\n" +
            "            position: absolute;\n" +
            "            left: 50%;\n" +
            "            bottom: 0;\n" +
            "            transform: translateX(-25%);\n" +
            "        }\n" +
            "        .poles .pole {\n" +
            "            position: absolute;\n" +
            "            bottom: 0;\n" +
            "            width: 15px;\n" +
            "            height: 135px;\n" +
            "            background: #F5AE4E;\n" +
            "        }\n" +
            "        .poles .pole.left {\n" +
            "            left: 200px;\n" +
            "        }\n" +
            "        .poles .pole.right {\n" +
            "            right: 200px;\n" +
            "        }\n" +
            "        .poles .pole::before {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: -10px;\n" +
            "            left: 50%;\n" +
            "            transform: translateX(-50%);\n" +
            "            width: 25px;\n" +
            "            height: 25px;\n" +
            "            background: #F5AE4E;\n" +
            "            border-radius: 50%;\n" +
            "            box-shadow: inset 0 -2px #DF9D41;\n" +
            "        }\n" +
            "        .poles .pole::after {\n" +
            "            display: block;\n" +
            "            content: '';\n" +
            "            position: absolute;\n" +
            "            top: 20px;\n" +
            "            left: 50%;\n" +
            "            transform: translateX(-50%);\n" +
            "            width: 25px;\n" +
            "            height: 4px;\n" +
            "            background: #F5AE4E;\n" +
            "            border-radius: 4px;\n" +
            "            box-shadow: 0 2px #DF9D41;\n" +
            "        }\n" +
            "        .poles .rope {\n" +
            "            position: absolute;\n" +
            "            top: -110px;\n" +
            "            left: -218px;\n" +
            "            width: 150px;\n" +
            "            height: 75px;\n" +
            "            border: 20px solid #CF352C;\n" +
            "            border-top: 0;\n" +
            "            border-bottom-left-radius: 150px;\n" +
            "            border-bottom-right-radius: 150px;\n" +
            "            box-shadow: 0 2px #9C0502;\n" +
            "            box-sizing: border-box;\n" +
            "            transition: width 1.5s;\n" +
            "        }\n" +
            "        .hover:hover .bouncer {\n" +
            "            left: 130px;\n" +
            "        }\n" +
            "        .hover:hover .arm {\n" +
            "            transform: rotate(-42deg);\n" +
            "        }\n" +
            "        .hover:hover .rope {\n" +
            "            width: 435px;\n" +
            "        }\n" +
            "        .hover:hover .eye::before {\n" +
            "            bottom: 4px;\n" +
            "        }\n" +
            "\n" +
            "    </style>\n" +
            "</head>\n" +
            "<body>\n" +
            "    <div class=\"hover\">\n" +
            "        <div class=\"background\">\n" +
            "            <div class=\"door\">403</div>\n" +
            "            <div class=\"rug\"></div>\n" +
            "        </div>\n" +
            "        <div class=\"foreground\">\n" +
            "            <div class=\"bouncer\">\n" +
            "                <div class=\"head\">\n" +
            "                    <div class=\"neck\"></div>\n" +
            "                    <div class=\"eye left\"></div>\n" +
            "                    <div class=\"eye right\"></div>\n" +
            "                    <div class=\"ear\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"body\"></div>\n" +
            "                <div class=\"arm\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"poles\">\n" +
            "                <div class=\"pole left\"></div>\n" +
            "                <div class=\"pole right\"></div>\n" +
            "                <div class=\"rope\"></div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</body>\n" +
            "</html>";
        return res.send(code);
    }
};