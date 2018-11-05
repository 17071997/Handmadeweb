let aws = require('aws-sdk');
let config = require('./config.json');
//PostedHTML_start _ line 31
exports.GetVideoByID = function (id,res){
    aws.config.update({
        region: 'us-east-1',
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();

    let params = {
        TableName: "handmadevideo01",
        KeyConditionExpression: "#id = :y",
        ExpressionAttributeNames:{
            "#id" : "id"
        },
        ExpressionAttributeValues:{
            ":y" : Number.parseInt(id)
        }
    };

    docClient.query(params, function (err,data) {
        if (err)
            console.log("Unable to query the clip.View errors: "+JSON.stringify(err,null,2));
        else {
            data.Items.forEach(function (item) {
                videoViewer_start += "<video width=\"1180\" controls>\n" +
                    "  <source src=\""+ item.urlVideo.toString() +"\" type=\"video/mp4\">\n" +
                    "  Your browser does not support HTML5 video.\n" +
                    "</video>";
            });
            let videoviewer = videoViewer_start + videoViewer_end;
            res.send(videoviewer);
        }
    });
};
exports.GetPostsByEmail = function (email,res) {
    aws.config.update({
        region: 'us-east-1',
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: 'contains(email, :value)',
        ExpressionAttributeValues:{
            ":value" : email
        }
    };

    docClient.scan(params, function (err,data) {
        if (err)
            console.log("Unable to scan query the table. Error: " + JSON.stringify(err,null,2));
        else {
            console.log("User "+email+" queried for Handmade video table ");
            data.Items.forEach(function (item) {
                PostedHTML_start += "<div class=\"product-grid product-grid--flexbox\">\n" +
                    "                    <div class=\"product-grid__wrapper\">\n" +
                    "                        <!-- Product list start here -->\n" +
                    "\n" +
                    "                        <!-- Single product -->\n" +
                    "                        <div class=\"product-grid__product-wrapper\">\n" +
                    "                            <div class=\"product-grid__product\">\n" +
                    "                                <div class=\"product-grid__img-wrapper\">\n" +
                    "                                    <img src=\"" + item.image + "\" alt=\"Img\" class=\"product-grid__img\">\n" +
                    "                                </div>\n" +
                    "                                <span class=\"product-grid__title\"> " + item.title + " </span>\n" +
                    "                                <span class=\"product-grid__price\">...</span>\n" +
                    "                                <div class=\"product-grid__extend-wrapper\">\n" +
                    "                                    <div class=\"product-grid__extend\">\n" +
                    "                                        <p class=\"product-grid__description\"></p>\n" +
                    "                                        <span class=\"product-grid__btn product-grid__add-to-cart\"><i class=\"fa fa-cart-arrow-down\"></i> Watch it </span>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                        <!-- end Single product -->\n" +
                    "                    </div>\n" +
                    "                </div>";
            });
            let PostedHTML = PostedHTML_start + PostedHTML_end;
            res.send(PostedHTML);
        }
    })
};

exports.GetPostsByKeyWord = function(keyword,res){
    aws.config.update({
        region: 'us-east-1',
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: 'contains(email, :value) or contains(title, :keyword) or contains(summary, :keyword1)',
        ExpressionAttributeValues:{
            ":value" : keyword,
            ":keyword" : keyword,
            ":keyword1" : keyword
        }
    };

    docClient.scan(params, function (err,data) {
        if (err)
            console.log("Unable to scan query the table. Error: " + JSON.stringify(err, null, 2));
        else {
            console.log("User queried for Handmade video table ");
            data.Items.forEach(function (item) {
                MainPageHTML_start += "<div class=\"box\">\n" +
                    "            <div class=\"ProductSet ProductSet--grid\">\n" +
                    "                <!-- Product Card: vertical -->\n" +
                    "                <a href=\"#\" class=\"ProductCard ProductCard--grid\">\n" +
                    "                    <div class=\"ProductCard__img-wrapper\">\n" +
                    "                        <img src=\"" + item.image + "\" alt=\"\" class=\"ProductCard__img\">\n" +
                    "                    </div>\n" +
                    "                    <div class=\"ProductCard__details\">\n" +
                    "                        <div class=\"ProductCard__details__header\">\n" +
                    "                            <div class=\"ProductCard__titles\">\n" +
                    "                                <h4 class=\"ProductCard__title\">" + item.title + "</h4>\n" +
                    "                                <h5 class=\"ProductCard__price\">" + item.email + "</h5>\n" +
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
                    "        </div>";
            });
            let MainPageHTML = MainPageHTML_start + MainPageHTML_end;
            res.send(MainPageHTML);
        }
    })
};

let videoViewer_start = "<!DOCTYPE html>\n" +
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
    "            margin:10px auto 0;\n" +
    "            background-color:#FFFFFF;\n" +
    "            -webkit-box-sizing: border-box;\n" +
    "            -moz-box-sizing: border-box;\n" +
    "            box-sizing: border-box;\n" +
    "            padding: 50px;\n" +
    "            min-height: 1300px;\n" +
    "            height: auto;\n" +
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
    "        .container{\n" +
    "            padding:10px 0 10px 10px;\n" +
    "            height:auto;            min-height: 1000px;\n" +
    "            width: 400px;\n" +
    "            float: right;\n" +
    "        }\n" +
    "        .wrapper .box{\n" +
    "            float:left;\n" +
    "            width:auto;\n" +
    "            height:auto;\n" +
    "            margin:0 10px 10px 0;\n" +
    "            -webkit-transition:all 1.0s ease;\n" +
    "            -moz-transition:all 1.0s ease;\n" +
    "            transition:all 1.0s ease;\n" +
    "            justify-content: center;\n" +
    "            display: flex;\n" +
    "            flex-wrap: wrap;\n" +
    "            padding: 1rem;\n" +
    "        }\n" +
    "        .wrapper.list-mode .container{\n" +
    "            padding-right:10px;\n" +
    "        }\n" +
    "\n" +
    "        .wrapper.list-mode .box{\n" +
    "            width:100%;\n" +
    "        }\n" +
    "\n" +
    "        .media_content{\n" +
    "            padding: 5px;\n" +
    "            float: left;\n" +
    "            width: 1200px;\n" +
    "            height: auto;\n" +
    "            min-height: 1000px;\n" +
    "        }\n" +
    "\n" +
    "        .videoPlayer{\n" +
    "            width: 1180px;\n" +
    "            height: 800px;\n" +
    "            float: left;\n" +
    "        }\n" +
    "        \n" +
    "        .comment{\n" +
    "            height: auto;\n" +
    "            min-height: 200px;\n" +
    "            margin-top: 20px;\n" +
    "            width: 1190px;\n" +
    "            float: left;\n" +
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
    "            width : 400px;\n" +
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
    "            width: 400px;\n" +
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
    "            max-width: 400px;\n" +
    "            width: 400px;\n" +
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
    "    <!-- Searching engine-->\n" +
    "\n" +
    "    <style>\n" +
    "        #namanyay-search-btn {\n" +
    "            background:#0099ff;\n" +
    "            color:white;\n" +
    "            font: 'trebuchet ms', trebuchet;\n" +
    "            padding:10px 20px;\n" +
    "            border-radius:0 5px 5px 0;\n" +
    "            -moz-border-radius:0 5px 5px 0;\n" +
    "            -webkit-border-radius:0 5px 5px 0;\n" +
    "            -o-border-radius:0 5px 5px 0;\n" +
    "            border:0 none;\n" +
    "            font-weight:bold;\n" +
    "        }\n" +
    "\n" +
    "        #namanyay-search-box {\n" +
    "            background: #666666;\n" +
    "            color: #FFFFFF;\n" +
    "            padding:10px;\n" +
    "            border-radius:5px 0 0 5px;\n" +
    "            -moz-border-radius:5px 0 0 5px;\n" +
    "            -webkit-border-radius:5px 0 0 5px;\n" +
    "            -o-border-radius:5px 0 0 5px;\n" +
    "            border:0 none;\n" +
    "            width:80%;\n" +
    "            margin: 10px;\n" +
    "        }\n" +
    "\n" +
    "        .SearchEngine{\n" +
    "            padding-left: 19%;\n" +
    "            background: whitesmoke;\n" +
    "        }\n" +
    "    </style>\n" +
    "\n" +
    "    <!--------------------->\n" +
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
    "<div class=\"SearchEngine\">\n" +
    "    <form id=\"searchthis\" action=\"search\" style=\"display:inline;\" method=\"get\">\n" +
    "        <input id=\"namanyay-search-box\" name=\"q\" size=\"40\" type=\"text\" placeholder=\"Search\"/>\n" +
    "        <input id=\"namanyay-search-btn\" value=\"Go\" type=\"submit\"/>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"wrapper\">\n" +
    "    <div class=\"media_content\">\n" +
    "        <div class=\"videoPlayer\">\n";
let videoViewer_end =
    "        </div>\n" +
    "        <div class=\"comment\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"box\">\n" +
    "            <div class=\"ProductSet ProductSet--grid\">\n" +
    "                <!-- Product Card: vertical -->\n" +
    "                <a href=\"#\" class=\"ProductCard ProductCard--grid\">\n" +
    "                    <div class=\"ProductCard__img-wrapper\">\n" +
    "                        <img src=\"http://handmadevideos001.s3.amazonaws.com/images/aaaa_04.png\" alt=\"\" class=\"ProductCard__img\">\n" +
    "                    </div>\n" +
    "                    <div class=\"ProductCard__details\">\n" +
    "                        <div class=\"ProductCard__details__header\">\n" +
    "                            <div class=\"ProductCard__titles\">\n" +
    "                                <h4 class=\"ProductCard__title\">Cách trang trí lọ cũ</h4>\n" +
    "                                <h5 class=\"ProductCard__price\">dotuananh.fit.iuh@gmail.com</h5>\n" +
    "                            </div>\n" +
    "                            <button class=\"IconBtn\">\n" +
    "                                <svg class=\"Icon Icon--medium Icon--colored\">\n" +
    "                                    <use xlink:href=\"./src/img/icons/svg-sprite.svg#heart\"></use>\n" +
    "                                </svg>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                        <p class=\"ProductCard__description\">\n" +
    "\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "            </div><div class=\"box\">\n" +
    "            <div class=\"ProductSet ProductSet--grid\">\n" +
    "                <!-- Product Card: vertical -->\n" +
    "                <a href=\"#\" class=\"ProductCard ProductCard--grid\">\n" +
    "                    <div class=\"ProductCard__img-wrapper\">\n" +
    "                        <img src=\"https://s3.amazonaws.com/handmadevideos001/images/1540796103544aaaa_03.png\" alt=\"\" class=\"ProductCard__img\">\n" +
    "                    </div>\n" +
    "                    <div class=\"ProductCard__details\">\n" +
    "                        <div class=\"ProductCard__details__header\">\n" +
    "                            <div class=\"ProductCard__titles\">\n" +
    "                                <h4 class=\"ProductCard__title\">Cách làm quà tặng giáng sinh độc đáo</h4>\n" +
    "                                <h5 class=\"ProductCard__price\">tranthevu.iuh@gmail.com</h5>\n" +
    "                            </div>\n" +
    "                            <button class=\"IconBtn\">\n" +
    "                                <svg class=\"Icon Icon--medium Icon--colored\">\n" +
    "                                    <use xlink:href=\"./src/img/icons/svg-sprite.svg#heart\"></use>\n" +
    "                                </svg>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                        <p class=\"ProductCard__description\">\n" +
    "\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </a>\n" +
    "            </div>    </div>\n" +
    "        </div>\n" +
    "        <script>\n" +
    "            $('.show-list').click(function(){\n" +
    "                $('.wrapper').addClass('list-mode');\n" +
    "            });\n" +
    "\n" +
    "            $('.hide-list').click(function(){\n" +
    "                $('.wrapper').removeClass('list-mode');\n" +
    "            });\n" +
    "            $(function(){\n" +
    "                let header = $(\"nav\"),\n" +
    "                    yOffset = 0,\n" +
    "                    triggerPoint = 150;\n" +
    "                $(window).scroll(function(){\n" +
    "                    yOffset = $(window).scrollTop();\n" +
    "\n" +
    "                    if(yOffset >= triggerPoint){\n" +
    "                        header.addClass(\"minimized\");\n" +
    "                    }else{\n" +
    "                        header.removeClass(\"minimized\");\n" +
    "                    }\n" +
    "                });\n" +
    "            });\n" +
    "        </script>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</body>\n" +
    "</html>\n";
let MainPageHTML_end = "</div>\n" +
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
    "</html>";
let MainPageHTML_start = "<!DOCTYPE html>\n" +
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
    "            margin:10px auto 0;\n" +
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
    "            height:auto;            min-height: 1000px;\n" +
    "            width: 1300px;\n" +
    "        }\n" +
    "        .wrapper .box{\n" +
    "            float:left;\n" +
    "            width:auto;\n" +
    "            height:auto;\n" +
    "            margin:0 10px 10px 0;\n" +
    "            -webkit-transition:all 1.0s ease;\n" +
    "            -moz-transition:all 1.0s ease;\n" +
    "            transition:all 1.0s ease;\n" +
    "            justify-content: center;\n" +
    "            display: flex;\n" +
    "            flex-wrap: wrap;\n" +
    "            padding: 1rem;\n" +
    "        }\n" +
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
    "            width : 400px;\n" +
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
    "            width: 400px;\n" +
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
    "            max-width: 400px;\n" +
    "            width: 400px;\n" +
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
    "    <!-- Searching engine-->\n" +
    "\n" +
    "    <style>\n" +
    "        #namanyay-search-btn {\n" +
    "            background:#0099ff;\n" +
    "            color:white;\n" +
    "            font: 'trebuchet ms', trebuchet;\n" +
    "            padding:10px 20px;\n" +
    "            border-radius:0 5px 5px 0;\n" +
    "            -moz-border-radius:0 5px 5px 0;\n" +
    "            -webkit-border-radius:0 5px 5px 0;\n" +
    "            -o-border-radius:0 5px 5px 0;\n" +
    "            border:0 none;\n" +
    "            font-weight:bold;\n" +
    "        }\n" +
    "\n" +
    "        #namanyay-search-box {\n" +
    "            background: #666666;\n" +
    "            color: #FFFFFF;\n" +
    "            padding:10px;\n" +
    "            border-radius:5px 0 0 5px;\n" +
    "            -moz-border-radius:5px 0 0 5px;\n" +
    "            -webkit-border-radius:5px 0 0 5px;\n" +
    "            -o-border-radius:5px 0 0 5px;\n" +
    "            border:0 none;\n" +
    "            width:96%;\n" +
    "            margin-top: 10px;\n" +
    "        }\n" +
    "\n" +
    "        .SearchEngine{\n" +
    "            padding-left: 1%;\n" +
    "            background: whitesmoke;\n" +
    "        }\n" +
    "    </style>\n" +
    "\n" +
    "    <!--------------------->\n" +
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
    "<div class=\"SearchEngine\">\n" +
    "    <form id=\"searchthis\" action=\"search\" style=\"display:inline;\" method=\"get\">\n" +
    "        <input id=\"namanyay-search-box\" name=\"q\" size=\"40\" type=\"text\" placeholder=\"Search\"/>\n" +
    "        <input id=\"namanyay-search-btn\" value=\"Go\" type=\"submit\"/>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"wrapper\">\n" +
    "    <header>\n" +
    "        <a href=\"javascript:void(0)\" class=\"show-list\"><i class=\"fa fa-th-list\"></i></a>\n" +
    "        <a href=\"javascript:void(0)\" class=\"hide-list\"><i class=\"fa fa-th\"></i></a>\n" +
    "    </header>\n" +
    "    <div class=\"container\">";

let PostedHTML_start = "\n" +
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>Review</title>\n" +
    "    <link rel='stylesheet' href='http://www.tinymce.com/css/codepen.min.css'>\n" +
    "    <style type=\"text/css\">\n" +
    "        @import url(http://weloveiconfonts.com/api/?family=entypo);\n" +
    "        @import url(https://fonts.googleapis.com/css?family=Muli);\n" +
    "        body {\n" +
    "            display: -webkit-box;\n" +
    "            display: -moz-box;\n" +
    "            display: -ms-flexbox;\n" +
    "            display: -webkit-flex;\n" +
    "            display: flex;\n" +
    "            margin: 0;\n" +
    "            padding: 0;\n" +
    "            background-image: url(https://i.pinimg.com/originals/fb/9f/e1/fb9fe19fcc1f34f896862e74c1c99cfa.jpg);\n" +
    "            background-size: cover;\n" +
    "            font-family: Muli, sans-serif;\n" +
    "            color: #444;\n" +
    "        }\n" +
    "        ul {\n" +
    "            list-style: none;\n" +
    "            margin-top: 0;\n" +
    "            padding: 0;\n" +
    "        }\n" +
    "        a {\n" +
    "            cursor: pointer;\n" +
    "            display: block;\n" +
    "            color: #b3b3b3;\n" +
    "            text-decoration: none;\n" +
    "        }\n" +
    "        .bckg {\n" +
    "            background-color: #383B42;\n" +
    "            box-shadow: -4px 0px 10px rgba(14,14,14,0.48) inset;\n" +
    "            width: 230px;\n" +
    "            height: 100%;\n" +
    "            position: fixed;\n" +
    "            left: 0;\n" +
    "            top: 0;\n" +
    "        }\n" +
    "        h1 {\n" +
    "            text-align: center;\n" +
    "            font-weight: normal;\n" +
    "            color: #F6F6EF;\n" +
    "            line-height: 60px;\n" +
    "            margin: 0;\n" +
    "            font-size: 20px;\n" +
    "            letter-spacing: 2px;\n" +
    "            background-color: #34363A;\n" +
    "            border-bottom: 1px solid rgba(101,116,134,0.57);\n" +
    "        }\n" +
    "        h2 {\n" +
    "            font-size: 20px;\n" +
    "            text-transform: uppercase;\n" +
    "            margin: 0;\n" +
    "            letter-spacing: 3px;\n" +
    "            color: #919191;\n" +
    "            font-weight: normal;\n" +
    "            padding-left: 40px;\n" +
    "            line-height: 60px;\n" +
    "            text-shadow: 1px 1px 2px #fff;\n" +
    "            position: relative;\n" +
    "            flex: 1;\n" +
    "            -webkit-flex: 1;\n" +
    "            -ms-flex: 1;\n" +
    "        }\n" +
    "        h2:before {\n" +
    "            content: '';\n" +
    "            width: 36px;\n" +
    "            height: 36px;\n" +
    "            position: absolute;\n" +
    "            left: -19px;\n" +
    "            top: 12px;\n" +
    "            background-color: #34363A;\n" +
    "            -webkit-transform: rotate(45deg);\n" +
    "            -moz-transform: rotate(45deg);\n" +
    "            transform: rotate(45deg);\n" +
    "        }\n" +
    "        h3 {\n" +
    "            font-size: 17px;\n" +
    "            margin: 0;\n" +
    "            line-height: 40px;\n" +
    "            color: #555;\n" +
    "            cursor: pointer;\n" +
    "            position: relative;\n" +
    "        }\n" +
    "        header {\n" +
    "            width: 200px;\n" +
    "            height: 100%;\n" +
    "            float: left;\n" +
    "            position: relative;\n" +
    "            z-index: 99;\n" +
    "        }\n" +
    "        header nav ul li {\n" +
    "            border-bottom: 1px solid #42454D;\n" +
    "            padding-left: 48px;\n" +
    "            transition: all 0.6s;\n" +
    "            border-top: 1px solid #2E3036;\n" +
    "        }\n" +
    "        header nav ul li:hover {\n" +
    "            background-color: #454952;\n" +
    "            transition: all 0.6s;\n" +
    "            border-bottom: 1px solid #797979;\n" +
    "        }\n" +
    "        header nav ul li:hover a {\n" +
    "            color: #fff;\n" +
    "            transition: all 0.6s;\n" +
    "        }\n" +
    "        header nav ul li a {\n" +
    "            line-height: 55px;\n" +
    "            font-size: 18px;\n" +
    "            position: relative;\n" +
    "            letter-spacing: 1px;\n" +
    "            transition: all 0.6s;\n" +
    "        }\n" +
    "        header nav ul li a:before {\n" +
    "            font-family: 'entypo', sans-serif;\n" +
    "            font-size: 20px;\n" +
    "            position: absolute;\n" +
    "            left: -32px;\n" +
    "        }\n" +
    "        header nav ul li:first-child a:before {\n" +
    "            content: \"\\268f\";\n" +
    "        }\n" +
    "        header nav ul li:nth-child(2) a:before {\n" +
    "            content: \"\\e771\";\n" +
    "        }\n" +
    "        header nav ul li:nth-child(3) a:before {\n" +
    "            content: \"\\1f4c5\";\n" +
    "        }\n" +
    "        header nav ul li:nth-child(4) a:before {\n" +
    "            content: \"\\1f465\";\n" +
    "        }\n" +
    "        header nav ul li:nth-child(5) a:before {\n" +
    "            content: \"\\2699\";\n" +
    "        }\n" +
    "        header nav ul li:nth-child(6) a:before {\n" +
    "            content: \"\\1f50d\";\n" +
    "        }\n" +
    "        main {\n" +
    "            flex: 1;\n" +
    "            -webkit-flex: 1;\n" +
    "            -ms-flex: 1;\n" +
    "        }\n" +
    "        .title {\n" +
    "            background-color: #fff;\n" +
    "            border-bottom: 1px solid #C0C1C0;\n" +
    "            height: 60px;\n" +
    "            display: -webkit-box;\n" +
    "            display: -moz-box;\n" +
    "            display: -ms-flexbox;\n" +
    "            display: -webkit-flex;\n" +
    "            display: flex;\n" +
    "        }\n" +
    "        .title a {\n" +
    "            color: #AAA;\n" +
    "            width: auto;\n" +
    "            margin: 0 20px;\n" +
    "            float: right;\n" +
    "            line-height: 62px;\n" +
    "            position: relative;\n" +
    "            text-decoration: none;\n" +
    "            transition: all .5s;\n" +
    "        }\n" +
    "        .title a:before {\n" +
    "            content: \"\\1f464\";\n" +
    "            font-size: 38px;\n" +
    "            position: absolute;\n" +
    "            left: -50px;\n" +
    "            font-family: 'entypo';\n" +
    "        }\n" +
    "        a:hover {\n" +
    "            color: #33526B;\n" +
    "            transition: all .5s;\n" +
    "        }\n" +
    "        .larg {\n" +
    "            width: auto;\n" +
    "            margin: 30px auto;\n" +
    "            padding: 0 30px;\n" +
    "        }\n" +
    "        .larg div {\n" +
    "            background-color: #F7F7F7;\n" +
    "            border: 1px solid #E2E2E2;\n" +
    "            padding: 0 20px;\n" +
    "            margin: 15px 0;\n" +
    "        }\n" +
    "        .larg div:hover {\n" +
    "            background-color: #fafafa;\n" +
    "        }\n" +
    "        .larg div h3 span {\n" +
    "            font-family: 'entypo';\n" +
    "            font-size: 19px;\n" +
    "            position: absolute;\n" +
    "            right: 0;\n" +
    "            transition: all .6s;\n" +
    "        }\n" +
    "        .larg div h3 span.close {\n" +
    "            -webkit-transform: rotate(180deg);\n" +
    "            transition: all .5s;\n" +
    "        }\n" +
    "        .larg div p {\n" +
    "            display: none;\n" +
    "            margin-left: 10px;\n" +
    "            padding: 0 15px;\n" +
    "            border-left: 1px solid #ccc;\n" +
    "        }\n" +
    "        .rendered{\n" +
    "            margin-left: 25px;\n" +
    "            height: auto;\n" +
    "            margin-top: 100px;\n" +
    "            background-image: url(https://i.pinimg.com/originals/fb/9f/e1/fb9fe19fcc1f34f896862e74c1c99cfa.jpg);\n" +
    "            background-size: cover;\n" +
    "        }\n" +
    "    </style>\n" +
    "    <style type=\"text/css\">\n" +
    "        .wrapper {\n" +
    "            width: 600px;\n" +
    "        }\n" +
    "        .product-grid {\n" +
    "            width: 60em;\n" +
    "            margin: 2% auto;\n" +
    "        }\n" +
    "        .product-grid.product-grid--flexbox .product-grid__wrapper {\n" +
    "            display: flex;\n" +
    "            flex-wrap: wrap;\n" +
    "        }\n" +
    "        .product-grid.product-grid--flexbox .product-grid__title {\n" +
    "            height: auto;\n" +
    "        }\n" +
    "        .product-grid.product-grid--flexbox .product-grid__title:after {\n" +
    "            display: none;\n" +
    "        }\n" +
    "        .product-grid__wrapper {\n" +
    "            margin-left: -1rem;\n" +
    "            margin-right: -1rem;\n" +
    "        }\n" +
    "        .product-grid__product-wrapper {\n" +
    "            padding: 1rem;\n" +
    "            float: left;\n" +
    "            width: 33.33333%;\n" +
    "        }\n" +
    "        .product-grid__product {\n" +
    "            padding: 1rem;\n" +
    "            position: relative;\n" +
    "            cursor: pointer;\n" +
    "            background: #fff;\n" +
    "            border-radius: 4px;\n" +
    "        }\n" +
    "        .product-grid__product:hover {\n" +
    "            box-shadow: 0px 0px 0px 1px #eee;\n" +
    "            z-index: 50;\n" +
    "        }\n" +
    "        .product-grid__product:hover .product-grid__extend {\n" +
    "            display: block;\n" +
    "        }\n" +
    "        .product-grid__img-wrapper {\n" +
    "            width: 100%;\n" +
    "            text-align: center;\n" +
    "            padding-top: 1rem;\n" +
    "            padding-bottom: 1rem;\n" +
    "            height: 150px;\n" +
    "        }\n" +
    "        .product-grid__img {\n" +
    "            max-width: 100%;\n" +
    "            height: auto;\n" +
    "            max-height: 100%;\n" +
    "        }\n" +
    "        .product-grid__title {\n" +
    "            margin-top: 0.875rem;\n" +
    "            display: block;\n" +
    "            font-size: 1.125em;\n" +
    "            color: #222;\n" +
    "            height: 3em;\n" +
    "            overflow: hidden;\n" +
    "            position: relative;\n" +
    "        }\n" +
    "        .product-grid__title:after {\n" +
    "            content: \"\";\n" +
    "            display: block;\n" +
    "            position: absolute;\n" +
    "            bottom: 0;\n" +
    "            right: 0;\n" +
    "            width: 2.4em;\n" +
    "            height: 1.5em;\n" +
    "            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);\n" +
    "        }\n" +
    "        .product-grid__price {\n" +
    "            color: #e91e63;\n" +
    "            font-weight: bold;\n" +
    "            letter-spacing: 0.4px;\n" +
    "        }\n" +
    "        .product-grid__extend-wrapper {\n" +
    "            position: relative;\n" +
    "        }\n" +
    "        .product-grid__extend {\n" +
    "            display: none;\n" +
    "            position: absolute;\n" +
    "            padding: 0 1rem 1rem 1rem;\n" +
    "            margin: 0.4375rem -1rem 0;\n" +
    "            box-shadow: 0px 0px 0px 1px #eee;\n" +
    "            background: #fff;\n" +
    "            border-radius: 0 0 4px 4px;\n" +
    "        }\n" +
    "        .product-grid__extend:before {\n" +
    "            content: \"\";\n" +
    "            height: 0.875rem;\n" +
    "            width: 100%;\n" +
    "            position: absolute;\n" +
    "            top: -0.4375rem;\n" +
    "            left: 0;\n" +
    "            background: #fff;\n" +
    "        }\n" +
    "        .product-grid__description {\n" +
    "            font-size: 0.875em;\n" +
    "            margin-top: 0.4375rem;\n" +
    "            margin-bottom: 0;\n" +
    "        }\n" +
    "        .product-grid__btn {\n" +
    "            display: inline-block;\n" +
    "            font-size: 0.875em;\n" +
    "            color: #777;\n" +
    "            background: #eee;\n" +
    "            padding: 0.5em 0.625em;\n" +
    "            margin-top: 0.875rem;\n" +
    "            margin-right: 0.625rem;\n" +
    "            cursor: pointer;\n" +
    "            border-radius: 4px;\n" +
    "        }\n" +
    "        .product-grid__btn i.fa {\n" +
    "            margin-right: 0.3125rem;\n" +
    "        }\n" +
    "        .product-grid__add-to-cart {\n" +
    "            color: #fff;\n" +
    "            background: #e91e63;\n" +
    "        }\n" +
    "        .product-grid__add-to-cart:hover {\n" +
    "            background: #ee4c83;\n" +
    "        }\n" +
    "        .product-grid__view {\n" +
    "            color: #777;\n" +
    "            background: #eee;\n" +
    "        }\n" +
    "        .product-grid__view:hover {\n" +
    "            background: #fff;\n" +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
    "    <script>\n" +
    "        $(document).ready( function() {\n" +
    "            $('body').on(\"click\", \".larg div h3\", function(){\n" +
    "                if ($(this).children('span').hasClass('close')) {\n" +
    "                    $(this).children('span').removeClass('close');\n" +
    "                }\n" +
    "                else {\n" +
    "                    $(this).children('span').addClass('close');\n" +
    "                }\n" +
    "                $(this).parent().children('p').slideToggle(250);\n" +
    "            });\n" +
    "\n" +
    "            $('body').on(\"click\", \"nav ul li a\", function(){\n" +
    "                let title = $(this).data('title');\n" +
    "                $('.title').children('h2').html(title);\n" +
    "\n" +
    "            });\n" +
    "        });\n" +
    "    </script>\n" +
    "    <link rel='stylesheet' href='http://www.tinymce.com/css/codepen.min.css'>\n" +
    "</head>\n" +
    "<body>\n" +
    "<span class=\"bckg\"></span>\n" +
    "<header>\n" +
    "    <h1>Dashboard</h1>\n" +
    "    <nav>\n" +
    "        <ul>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Các bài đăng\" onclick=\"postedrender()\">Các bài đăng</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    function postedrender() {\n" +
    "                        window.location.href = \"/postedrender\"\n" +
    "                        //https://codepen.io/ricardpanades/pen/pjaaLa\n" +
    "                    }\n" +
    "                </script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Các bình luận\" onclick=\"Commentrender()\">Các bình luận</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    function Commentrender() {\n" +
    "                        window.location.href = \"/Commentrender\"\n" +
    "                    }\n" +
    "                </script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Đang theo dõi\" onclick=\"WatchingRender()\">Đang theo dõi</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    function WatchingRender() {\n" +
    "                        window.location.href = \"/WatchingRender\"\n" +
    "                    }\n" +
    "                </script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Những người theo dõi\" onclick=\"WatchedRender()\">Những người theo dõi</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    function WatchedRender() {\n" +
    "                        window.location.href = \"/WatchedRender\"\n" +
    "                    }\n" +
    "                </script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Viết bài\" onclick=\"editorrender()\">Viết bài</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "                    function editorrender() {\n" +
    "                        window.location.href = \"/editorrender\"\n" +
    "                    }\n" +
    "                </script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Tìm kiếm\" onclick=\"FindingRender()\">Tìm kiếm</a>\n" +
    "                <script type=\"text/javascript\"></script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Đăng xuất\" onclick=\"Signout()\">Đăng xuất</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "\n" +
    "                </script>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <span style=\"color: red; margin-left: -5px;\">Dangerous place !</span>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"javascript:void(0);\" data-title=\"Xóa bài đăng\" onclick=\"RemovePost()\">Xóa bài đăng</a>\n" +
    "                <script type=\"text/javascript\">\n" +
    "\n" +
    "                </script>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </nav>\n" +
    "</header>\n" +
    "<main>\n" +
    "    <div class=\"title\">\n" +
    "        <h2>Viết bài</h2>\n" +
    "        <a href=\"javascript:void(0);\">Hello nigga !</a>\n" +
    "    </div>\n" +
    "    <div class=\"rendered\">\n" +
    "        <!-- views/partials/editor.ejs -->\n" +
    "        <div class=\"wrapper\">\n" +
    "            <div class=\"desc\">\n" +
    "                <h1>Tất cả những bài đã đăng </h1>\n" +
    "                <br/>\n" +
    "                <div class=\"todo\">\n" +
    "                    <ul>\n" +
    "                        <li style=\"color: #FFFFFF;font-size: 22px;\"> Let review it .. </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"content\">\n";

let PostedHTML_end = "</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n" +
    "    <script src=\"http://cdn.tinymce.com/4/tinymce.min.js\"></script>\n" +
    "    <script>\n" +
    "        tinymce.init({\n" +
    "            selector: 'textarea',\n" +
    "            height: 500,\n" +
    "            plugins: [\n" +
    "                'advlist autolink lists link image charmap print preview anchor',\n" +
    "                'searchreplace visualblocks code fullscreen',\n" +
    "                'insertdatetime media table contextmenu paste code'\n" +
    "            ],\n" +
    "            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',\n" +
    "            content_css: [\n" +
    "                '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',\n" +
    "                '//www.tinymce.com/css/codepen.min.css'\n" +
    "            ]\n" +
    "        });\n" +
    "    </script>\n" +
    "</main>\n" +
    "\n" +
    "</body></html>";