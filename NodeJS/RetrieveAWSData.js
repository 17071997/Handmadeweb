let aws = require('aws-sdk');
let config = require('./config.json');
//PostedHTML_start _ line 31
function GetCommentAndVideoList(id,urlVideo,owner,code_tam_thoi,res){
    aws.config.update({
        region: 'us-east-1',
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();
    let comment = "";
    let getvideolist = "";

    let params = {
        TableName: "handmadevideo01",
        FilterExpression: 'id <> :value',
        ExpressionAttributeValues:{
            ":value" : Number.parseInt(id)
        }
    };
    let params1 = {
        TableName : "Comments",
        FilterExpression: "idvideo = :keyword",
        ExpressionAttributeValues: {
            ":keyword" : Number.parseInt(id)
        }
    };
    docClient.scan(params1,(err,data)=>{
        if (err)
            console.log("Unable to scan comment for this video. Please view these json errors:" +JSON.stringify(err,null,2));
        else {
            data.Items.forEach(function (item){
                comment += "<li class=\"comment_content\">From:" + item.guestemail + "=> <span style='background: wheat;'>" + item.content + "</span></li>\n";
            });
            code_tam_thoi += comment;
            let comment_post = "     </ul>\n" +
                "                    <div class=\"comment_post\">\n" +
                "                       <div id=\"form1\" name=\"form1\" class=\"form\">\n" +
                "                           <h3 style=\"color: #FFFFFF;\">Leave a comment</h3>\n" +
                "                               <span style=\"color:white;\">  Được đăng bởi </span><input type=\"text\" disabled id=\"ownername\" value=\"" + owner +"\" name=\"ownername\"  size=\"40\"/>\n" +
                "                               <p class=\"email\">\n" +
                "                                   <input name=\"email\" type=\"email\" class=\"validate[required,custom[email]] feedback-input\" id=\"email\" placeholder=\"Email\" />\n" +
                "                               </p>\n" +
                "                               <p class=\"text\">\n" +
                "                                   <textarea name=\"comment\" class=\"validate[required,length[6,300]] feedback-input\" id=\"comment\" placeholder=\"Comment\"></textarea>\n" +
                "                               </p>\n" +
                "                               <div class=\"submit\">\n" +
                "                                   <div id=\"button_blue\">\n" +
                "                                       <i id=\"btncomment\">Bình luận</i>\n" +
                "                                   </div>\n" +
                "                                   <div class=\"ease\"></div>\n" +
                "                               </div>\n" +
                "                           </div>\n" +
                "                       </div>\n" +
                "                   </div>\n" +
                "               </div>\n" +
                "           <div class=\"container\">";
            docClient.scan(params, function (err,data) {
                if (err) {
                    console.log(err);
                }
                else {
                    data.Items.forEach(function (item) {//bug chỗ này nữa, getvideolist phải là += hoặc danh sách video phụ sẽ chỉ có một video
                        //để làm điều đó thì nên để phần comment post sang chỗ khác
                        getvideolist  +=
                            "                   <div class=\"box\">\n" +
                            "                       <div class=\"ProductSet ProductSet--grid\">\n" +
                            "                       <!-- Product Card: vertical -->\n" +
                            "                           <a href=\"/watchvideo?id=" + item.id + "&&ip=" +  item.urlVideo + "&&owner=" + item.email + "\" class=\"ProductCard ProductCard--grid\">\n" +
                            "                           <div class=\"ProductCard__img-wrapper\">\n" +
                            "                               <img src=\"" +  item.image + "\" alt=\"\" class=\"ProductCard__img\">\n" +
                            "                           </div>\n" +
                            "                           <div class=\"ProductCard__details\">\n" +
                            "                               <div class=\"ProductCard__details__header\">\n" +
                            "                                   <div class=\"ProductCard__titles\">\n" +
                            "                                       <h4 class=\"ProductCard__title\">" +  item.title + "</h4>\n" +
                            "                                       <h5 class=\"ProductCard__price\">" +  item.email + "</h5>\n" +
                            "                                   </div>\n" +
                            "                                   <button class=\"IconBtn\">\n" +
                            "                                       <svg class=\"Icon Icon--medium Icon--colored\">\n" +
                            "                                           <use xlink:href=\"./src/img/icons/svg-sprite.svg#heart\"></use>\n" +
                            "                                       </svg>\n" +
                            "                                   </button>\n" +
                            "                               </div>\n" +
                            "                               <p class=\"ProductCard__description\">\n" +
                            "\n" +
                            "                               </p>\n" +
                            "                           </div>\n" +
                            "                       </a>\n" +
                            "                   </div>\n" +
                            "               </div>";
                    });
                    let videoviewer =code_tam_thoi + comment_post + getvideolist + "<script>\n" +
                        "               $('.show-list').click(function(){\n" +
                        "               $('.wrapper').addClass('list-mode');\n" +
                        "            });\n" +
                        "\n" +
                        "               $('.hide-list').click(function(){\n" +
                        "               $('.wrapper').removeClass('list-mode');\n" +
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
                    res.send(videoviewer);
                }
            })
        }
    });
}

exports.GetVideoByID = function (urlVideo,id,owner,res){
    aws.config.update({
        region: 'us-east-1',
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();
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
        "            margin:30px auto 0;\n" +
        "            background-color:#FFFFFF;\n" +
        "            -webkit-box-sizing: border-box;\n" +
        "            -moz-box-sizing: border-box;\n" +
        "            box-sizing: border-box;\n" +
        "            padding: 50px;\n" +
        "            min-height: 2000px;\n" +
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
        "        .container {\n" +
        "            padding-top: 10px;\n" +
        "            padding-bottom: 5px;\n" +
        "            height:auto;            min-height: 1870px;\n" +
        "            width: 450px;\n" +
        "            float: right;\n" +
        "            background: wheat;\n" +
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
        "            width: 1170px;\n" +
        "            height: auto;\n" +
        "            min-height: 1000px;\n" +
        "        }\n" +
        "\n" +
        "        .videoPlayer{\n" +
        "            width: 1170px;\n" +
        "            height: 870px;\n" +
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
        "            height: 100%;\n" +
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
        "        }\n" +
        "\n" +
        "        .SearchEngine{\n" +
        "            padding-left: 19%;\n" +
        "            background: whitesmoke;\n" +
        "            margin: 5px;\n" +
        "        }\n" +
        "    </style>\n" +
        "    <!---------Comment field-------------->\n" +
        "    <style>\n" +
        "        .comment_area{\n" +
        "            margin: 5px;\n" +
        "            width: 1180px;\n" +
        "            height: auto;\n" +
        "            min-height: 50px;\n" +
        "            padding: 10px;\n" +
        "            font-family: Georgia, sans-serif;\n" +
        "            color: black;\n" +
        "            list-style-type: none;\n" +
        "        }\n" +
        "        .comment_area li{\n" +
        "            background: #44D5AC;\n" +
        "            color: #333333;\n" +
        "            padding: 5px;\n" +
        "            margin-top: 5px;\n" +
        "        }\n" +
        "        .comment_post{\n" +
        "            margin: 20px 10px 10px 10px;\n" +
        "            width: 1180px;\n" +
        "            height: auto;\n" +
        "            min-height: 100px;\n" +
        "            padding: 5px;\n" +
        "            font-family: Georgia, sans-serif;\n" +
        "            background: #3b4148;\n" +
        "        }\n" +
        "        @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);\n" +
        "        #feedback-page {\n" +
        "            text-align: center;\n" +
        "        }\n" +
        "\n" +
        "        #form-main {\n" +
        "            width: 100%;\n" +
        "            float: left;\n" +
        "            padding-top: 0px;\n" +
        "        }\n" +
        "\n" +
        "        #form-div {\n" +
        "            background-color: rgba(72, 72, 72, 0.4);\n" +
        "            padding-left: 35px;\n" +
        "            padding-right: 35px;\n" +
        "            padding-top: 35px;\n" +
        "            padding-bottom: 50px;\n" +
        "            width: 450px;\n" +
        "            float: left;\n" +
        "            left: 50%;\n" +
        "            position: absolute;\n" +
        "            margin-top: 30px;\n" +
        "            margin-left: -260px;\n" +
        "            -moz-border-radius: 7px;\n" +
        "            -webkit-border-radius: 7px;\n" +
        "        }\n" +
        "\n" +
        "        .feedback-input {\n" +
        "            color: #3c3c3c;\n" +
        "            font-family: Helvetica, Arial, sans-serif;\n" +
        "            font-weight: 500;\n" +
        "            font-size: 18px;\n" +
        "            border-radius: 0;\n" +
        "            line-height: 22px;\n" +
        "            background-color: #fbfbfb;\n" +
        "            padding: 13px 13px 13px 54px;\n" +
        "            margin-bottom: 10px;\n" +
        "            width: 100%;\n" +
        "            -webkit-box-sizing: border-box;\n" +
        "            -moz-box-sizing: border-box;\n" +
        "            -ms-box-sizing: border-box;\n" +
        "            box-sizing: border-box;\n" +
        "            border: 3px solid rgba(0, 0, 0, 0);\n" +
        "        }\n" +
        "\n" +
        "        .feedback-input:focus {\n" +
        "            background: #fff;\n" +
        "            box-shadow: 0;\n" +
        "            border: 3px solid #3498db;\n" +
        "            color: #3498db;\n" +
        "            outline: none;\n" +
        "            padding: 13px 13px 13px 54px;\n" +
        "        }\n" +
        "\n" +
        "        .focused {\n" +
        "            color: #30aed6;\n" +
        "            border: #30aed6 solid 3px;\n" +
        "        }\n" +
        "\n" +
        "        /* Icons ---------------------------------- */\n" +
        "\n" +
        "        #email {\n" +
        "            background-image: url(http://rexkirby.com/kirbyandson/images/email.svg);\n" +
        "            background-size: 30px 30px;\n" +
        "            background-position: 11px 8px;\n" +
        "            background-repeat: no-repeat;\n" +
        "        }\n" +
        "\n" +
        "        #email:focus {\n" +
        "            background-image: url(http://rexkirby.com/kirbyandson/images/email.svg);\n" +
        "            background-size: 30px 30px;\n" +
        "            background-position: 11px 8px;\n" +
        "            background-repeat: no-repeat;\n" +
        "        }\n" +
        "\n" +
        "        #comment {\n" +
        "            background-image: url(http://rexkirby.com/kirbyandson/images/comment.svg);\n" +
        "            background-size: 30px 30px;\n" +
        "            background-position: 11px 8px;\n" +
        "            background-repeat: no-repeat;\n" +
        "        }\n" +
        "\n" +
        "        textarea {\n" +
        "            width: 100%;\n" +
        "            height: 150px;\n" +
        "            line-height: 150%;\n" +
        "            resize: vertical;\n" +
        "        }\n" +
        "\n" +
        "        input:hover, textarea:hover,\n" +
        "        input:focus, textarea:focus {\n" +
        "            background-color: white;\n" +
        "        }\n" +
        "\n" +
        "        #button_red {\n" +
        "            font-family: 'Montserrat', Arial, Helvetica, sans-serif;\n" +
        "            float:left;\n" +
        "            width: 200px;\n" +
        "            height: 52px;\n" +
        "            border: #fbfbfb solid 4px;\n" +
        "            color: white;\n" +
        "            cursor: pointer;\n" +
        "            background-color: red;\n" +
        "            font-size: 24px;\n" +
        "            padding-top: 2px;\n" +
        "            padding-bottom: 2px;\n" +
        "            -webkit-transition: all 0.3s;\n" +
        "            -moz-transition: all 0.3s;\n" +
        "            transition: all 0.3s;\n" +
        "            font-weight: 700\n" +
        "        }\n" +
        "        #button_red:hover {\n" +
        "            background-color: rgba(0, 0, 0, 0);\n" +
        "            color: red;\n" +
        "        }\n" +
        "        #button_blue {\n" +
        "            font-family: 'Montserrat', Arial, Helvetica, sans-serif;\n" +
        "            float:left;\n" +
        "            width: 100%;\n" +
        "            height: 75px;\n" +
        "            text-align: center;\n" +
        "            justify-content: center;\n" +
        "            border: #fbfbfb solid 4px;\n" +
        "            color: white;\n" +
        "            cursor: pointer;\n" +
        "            background-color: #44D5AC;\n" +
        "            font-size: 24px;\n" +
        "            padding-top: 2px;\n" +
        "            padding-bottom: 2px;\n" +
        "            -webkit-transition: all 0.3s;\n" +
        "            -moz-transition: all 0.3s;\n" +
        "            transition: all 0.3s;\n" +
        "            font-weight: 700\n" +
        "        }\n" +
        "\n" +
        "        #button_blue:hover {\n" +
        "            background-color: rgba(0, 0, 0, 0);\n" +
        "            color: #44D5AC;\n" +
        "        }\n" +
        "\n" +
        "        .submit:hover {\n" +
        "            color: #3498db;\n" +
        "        }\n" +
        "\n" +
        "        .ease {\n" +
        "            width: 0px;\n" +
        "            height: 74px;\n" +
        "            background-color: #fbfbfb;\n" +
        "            -webkit-transition: .3s ease;\n" +
        "            -moz-transition: .3s ease;\n" +
        "            -o-transition: .3s ease;\n" +
        "            -ms-transition: .3s ease;\n" +
        "            transition: .3s ease;\n" +
        "        }\n" +
        "\n" +
        "        .submit:hover .ease {\n" +
        "            width: 100%;\n" +
        "            background-color: white;\n" +
        "        }\n" +
        "\n" +
        "        #idvideo #ownername:disabled {" +
        "              background: #ccc;\n" +
        "        }\n" +
        "        .volting {" +
        "              width: 1170px;\n" +
        "              height: 80px;\n" +
        "              display: inline-block;\n" +
        "              margin: 10px auto 20px auto;\n" +
        "              padding: 10px 10px 10px 20em;\n" +
        "              border-bottom: #666666 solid 3px;\n" +
        "        }\n" +
        "        .volt {\n" +
        "              width: 150px;\n" +
        "              height: 52px;\n" +
        "              float: left;\n" +
        "              margin-left: 3em;\n" +
        "        }\n" +
        "        .volt:hover {\n" +
        "              color: red;\n" +
        "              cursor: pointer;\n" +
        "        }\n" +
        "    </style>\n" +
        "    <!--------------------->\n" +
        "<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" " +
        "integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\">\n" + //đường dẫn thư viện thêm icon vào web
        "<script src=\"/socket.io/socket.io.js\"></script>\n" +
        "<script>\n" +
        "   let socket = io();" +
        "   $(document).ready(()=>{\n" +
        "       socket.on('remove',function(data){\n" +
        "           alert(data);\n" +
        "       });\n" +
        "       $(document).on(\"click\",\"#button_blue\",function(){\n" +
        "           let email = $(\"#email\").val();\n" +
        "           let content = $(\"#comment\").val();\n" +
        "           let Comment = {\n" +
        "               idvideo: " + id + ",\n" +
        "               owner: \"" + owner + "\",\n" +
        "               guestemail: email,\n" +
        "               content: content" +
        "           };\n" +
        "           let JSONComment = JSON.stringify(Comment,null,2);\n" +
        "           console.log(JSONComment);\n" +
        "           socket.emit('comment',Comment);\n" +
        "           socket.on('comment',function(data){\n" +
        "               let height = $(\".wrapper\").height();\n" +
        "               $(\".wrapper\").css(\"min-height\",\"\" + (Number.parseInt(height)+20) + \"px\");" +
        "               $(\".comment_area\").prepend(\"<li>From \" + data.guestemail + \"=> \" + data.content + \"</li>\");" +
        "           });\n" +
        "" +
        "       });\n" +
        "       let count_like = 0;\n" +
        "       let count_dislike = 0;\n" +
        "       let likevalue = parseInt(document.getElementById(\"like\").innerHTML.match(/\\d+/));\n" + //dòng này tách chuối lấy số... 5 Like => 5
        "       let dislikevalue = parseInt(document.getElementById(\"dislike\").innerHTML.match(/\\d+/));\n" + //dòng này tách chuối lấy số... 5 Like => 5
        "       $(\"#like\").click(()=>{\n" +
        "           count_like ++;\n" +
        "           if (count_like % 2 !== 0 ) {\n" +
        "               likevalue += 1; //click first time => tăng lượt like lên 1\n" +
        "               socket.emit('like'," + id + ");\n" +
        "           }\n" +
        "           if (count_like % 2 === 0 ) { \n" +
        "               likevalue -= 1; //click 2 time => lượt like như cũ\n" +
        "               socket.emit('giveuplike'," + id + ")" +
        "           }\n" +
        "           document.getElementById(\"like\").innerHTML = \" \" + likevalue + \" Like\"\n" +
        "       })\n" +
        "       $(\"#dislike\").click(()=>{\n" +
        "           count_dislike ++;\n" +
        "           if (count_dislike % 2 !== 0 ) {\n" +
        "               dislikevalue += 1; //click first time => tăng lượt dislike lên 1\n" +
        "               socket.emit('dislike'," + id + ");\n" +
        "           }\n" +
        "           if (count_dislike % 2 === 0 ) { \n" +
        "               dislikevalue -= 1; //click 2 time => lượt dislike như cũ\n" +
        "               socket.emit('giveupdislike'," + id + ")" +
        "           }\n" +
        "           document.getElementById(\"dislike\").innerHTML = \" \" + dislikevalue + \" DisLike\"\n" +
        "       })\n" +
        "   })\n" +
        "</script>\n" +
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
        "        <div class=\"videoPlayer\">\n" +
        "            <video width=\"1170\" height=\"800\" controls>\n" +
        "                <source src=\"" + urlVideo +"\" type=\"video/mp4\">\n" +
        "                Your browser doesn't support the video tag\n" +
        "            </video>\n" +
        "            <div class=\"volting\">\n";
        let volting = "";
        let params9 = {
            TableName: "handmadevideo01",
            FilterExpression: "id = :num",
            ExpressionAttributeValues: {
                ":num" : Number.parseInt(id)
            }
        };
        docClient.scan( params9, (err,data) => {
           if (err) {
               console.log (JSON.stringify(err,null,2));
           } else {
               data.Items.forEach((item) => {

                   volting += "               <div class=\"volt\">\n" +
                       "                           <i class=\"far fa-thumbs-up\" id=\"like\">" + item.like_count + " Like</i>\n" +
                       "                      </div>\n" +
                       "                      <div class=\"volt\">\n" +
                       "                           <i class=\"far fa-thumbs-down\" id=\"dislike\">" + item.dislike_count +" Dislike</i>\n" +
                       "                            <script>\n" +
                       "                                let count1 = 0;\n" +
                       "                                $(\"#dislike\").click((id)=>{\n" +
                       "                                    let value1 = 0;" +
                       "                                    count1 ++;\n" +
                       "                                    if (count1 % 2 === 0 ) \n" +
                       "                                        value1 = " + item.dislike_count + "; //click 2 time => luot dislike nhu cu\n" +
                       "                                    else {\n" +
                       "                                        value1 = " + (item.dislike_count + 1) + "; //click first time => tang luot like len 1\n" +
                       "                                    }\n" +
                       "                                    document.getElementById(\"dislike\").innerHTML = \" \" + value1 + \" Dislike\"\n" +
                       "                                });\n" +
                       "                            </script>\n" +
                       "                      </div>\n" +
                       "                      <input type=\"submit\" value=\"Follow\" class=\"ease\" id=\"button_red\" style=\"margin-top:-10px;\"/>\n" +
                       "                   </div>\n" +
                       "                   <div class=\"ease\"></div>\n" +
                       "                </div>\n" +
                       "                <div class=\"comment\">\n" +
                       "                    <ul class=\"comment_area\">\n";

               });
               let code_tam_thoi = videoViewer_start + volting;
               GetCommentAndVideoList(id,urlVideo,owner,code_tam_thoi,res);
           }
        });
};

exports.GetPostsByEmail = function (email,res) {
    let PostedHTML_start = "\n" +
        "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>Review</title>\n" +
        "    <link rel='stylesheet' href='http://www.tinymce.com/css/codepen.min.css'>\n" +
        "    <style type=\"text/css\">\n" +
        "        #home\n" +
        "        {\n" +
        "            font-size:45px;\n" +
        "            padding-right: 10px;\n" +
        "        }\n" +
        "       .content{" +
        "           background-color:#333333;\n" +
        "           border-radius: 30px;\n" +
        "           padding: 0.5 em;\n" +
        "           width: 1500px;\n" +
        "       }\n" +
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
        "            font-family: Muli, sans-serif;\n" +
        "            color: #444;\n" +
        "            background: url(https://i.pinimg.com/originals/fb/9f/e1/fb9fe19fcc1f34f896862e74c1c99cfa.jpg);\n" +
        "            background-size: cover;\n" +
        "            height: auto;\n" +
        "            min-height:1300px;\n" +
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
        "            width: 270px;\n" +
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
        "            font-size: 15px;\n" +
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
        "            width: 270px;\n" +
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
        "        .DashBoard{\n" +
        "            line-height: 50px;\n" +
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
        "        .main {\n" +
        "            width: 1900px;\n" +
        "            float: right;\n" +
        "            margin-left: 221px;" +
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
        "            margin-left: 30px;\n" +
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
        "            margin-left: 15px;\n" +
        "            height: auto;\n" +
        "            margin-top: 100px;\n" +
        "        }\n" +
        "    </style>\n" +
        "    <style type=\"text/css\">\n" +
        "        @import url(\"https://fonts.googleapis.com/css?family=Open+Sans\");\n" +
        "        body {\n" +
        "            margin: 0;\n" +
        "            width: 100vw;\n" +
        "            overflow-x: hidden;\n" +
        "            background-color: #f0f0f0;\n" +
        "            font-family: 'Open Sans', sans-serif;\n" +
        "            font-size: 14.5px;\n" +
        "            line-height: 1.4em;\n" +
        "            color: #404646;\n" +
        "       }\n" +
        "\n" +
        "       * {\n" +
        "            box-sizing: border-box;\n" +
        "        }\n" +
        "        .wrapper {\n" +
        "            width: auto;\n" +
        "            max-width: 1300px;" +
        "            height: auto;\n" +
        "            margin: 550px auto auto 140px;\n" +
        "        }\n" +
        "        .container {\n" +
        "            min-height: 100vh;\n" +
        "            width: 1000px;\n" +
        "            margin: auto;\n" +
        "            padding: 1.6em;\n" +
        "            display: grid;\n" +
        "            justify-content: center;\n" +
        "            align-content: start;\n" +
        "            grid-gap: 1.6em;\n" +
        "            grid-template: auto/repeat(auto-fill, minmax(27em, 27em));\n" +
        "        }\n" +
        "\n" +
        "        .card {\n" +
        "            margin: 0;\n" +
        "            height: 15em;\n" +
        "            display: flex;\n" +
        "            background-color: white;\n" +
        "            box-shadow: 1px 3px 3px rgba(0, 10, 20, 0.06);\n" +
        "        }\n" +
        "        .card img {\n" +
        "            height: 100%;\n" +
        "            width: 50%;\n" +
        "            max-width: 50%;\n" +
        "            -o-object-fit: cover;\n" +
        "            object-fit: cover;\n" +
        "            flex: 1 1 auto;\n" +
        "        }\n" +
        "\n" +
        "        .card-body {\n" +
        "            width: 12em;\n" +
        "            max-height: 100%;\n" +
        "            flex: 1 1 auto;\n" +
        "            display: flex;\n" +
        "            flex-flow: column nowrap;\n" +
        "            justify-content: flex-start;\n" +
        "            padding: 1.6em;\n" +
        "        }\n" +
        "        button {\n" +
        "            min-width: 8.3em;\n" +
        "            flex: none;\n" +
        "            align-self: flex-start;\n" +
        "            margin-top: auto;\n" +
        "            margin-left: 20px;\n" +
        "            padding: 0.6em 1.2em;\n" +
        "            font-size: 0.92em;\n" +
        "            color: #404646;\n" +
        "            background: none;\n" +
        "            border: 1px solid #333333;\n" +
        "            border-radius: 2px;\n" +
        "        }\n" +
        "        .card-body button:hover {\n" +
        "            border-color: #d099a0;\n" +
        "        }\n" +
        "\n" +
        "        .card-text {\n" +
        "            position: relative;\n" +
        "            flex: 1;\n" +
        "            overflow: hidden;\n" +
        "            text-overflow: ellipsis;\n" +
        "            margin: 0 0 0.8em 0;\n" +
        "            padding-left: 10px;\n" +
        "        }\n" +
        "        .card-text h3, .card-text p {\n" +
        "            margin-top: 0;\n" +
        "        }\n" +
        "        .card-text:hover {\n" +
        "            background: linear-gradient(rgba(255, 255, 255, 0), #44D5AC);\n" +
        "        }\n" +
        "\n" +
        "        .review{\n" +
        "            width: 1500px;\n" +
        "            height: 500px;\n" +
        "            float: left;\n" +
        "            background-color: #333333;\n" +
        "            margin-left: 50px;\n" +
        "            margin-top: 10px;\n" +
        "        }\n" +
        "\n" +
        "        @media (max-width: 570px) {\n" +
        "           .container {\n" +
        "                grid-template: auto / 1fr;\n" +
        "                padding: 1.0666666667em;\n" +
        "           }\n" +
        "\n" +
        "           .card {\n" +
        "                flex: 1 1 auto;\n" +
        "                display: flex;\n" +
        "                background-color: white;\n" +
        "                box-shadow: 1px 3px 3px rgba(0, 10, 20, 0.06);\n" +
        "                -webkit-border-radius: 25px;-moz-border-radius: 25px;border-radius: 25px;\n" +
        "           }\n" +
        "           .card img {\n" +
        "                max-width: 45%;\n" +
        "           }\n" +
        "       }\n" +
        "\n" +
        "    </style>\n" +
        "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
        "    <script>\n" +
        "        function changeSource(url) {\n" +
        "            var video = document.getElementById('video');\n" +
        "            video.src = url;\n" +
        "            video.play();\n" +
        "        }" +
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
        "<span class=\"bckg\">\n" +
        "    <header>\n" +
        "    <a href=\"/writerpage?email=" + email + "\" id=\"home\" class=\"DashBoard\">Dashboard</a>\n" +
        "    <nav>\n" +
        "        <ul>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Các bài đăng\" onclick=\"postedrender()\">Các bài đăng</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function postedrender() {\n" +
        "                        window.location.href = \"/postedrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Các bình luận\" onclick=\"Commentrender()\">Các bình luận</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function Commentrender() {\n" +
        "                        window.location.href = \"/Commentrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Viết bài\" onclick=\"editorrender()\">Viết bài</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function editorrender() {\n" +
        "                        window.location.href = \"/editorrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <span style=\"color: red; margin-left: -5px;\">Dangerous place !</span>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Xóa bài đăng\" onclick=\"RemovePost()\">Xóa bài đăng</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function RemovePost(){\n" +
        "                        window.location.href = \"/removeposts?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Đăng xuất\" onclick=\"Signout()\">Đăng xuất</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function Signout(){\n" +
        "                        window.location.href = \"/login\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "        </ul>\n" +
        "    </nav>\n" +
        "</header>\n" +
        "</span>\n" +
        "<div class=\"main\">\n" +
        "    <div class=\"title\">\n" +
        "        <h2>Các bài đăng</h2>\n" +
        "        <a href=\"javascript:void(0);\">Hello nigga !</a>\n" +
        "    </div>\n" +
        "        <div class=\"review\">\n" +
        "            <video width='1500' height='500' id=\"video\" controls>\n" +
        "                <source src='movie.mp4' type='video/mp4'>\n" +
        "                <source src='movie.org' type='video/org'>\n" +
        "                Hey bro, your browser does not support the video tag." +
        "            </video>\n" +
        "        </div>\n" +
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
        "            <div class=\"container\">\n";

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
                PostedHTML_start += "<!--Single video here-->\n" +
                    "                <div class=\"card\">\n" +
                    "                   <img src=\"" + item.image + "\" alt=\"" + item.summary + "\">\n" +
                    "                   <div class=\"class-body\">\n" +
                    "                       <div class=\"card-text\">\n" +
                    "                           <h3>" + item.title + "</h3>\n" +
                    "                       </div>\n" +
                    "                       <button type=\"button\" onclick=\"changeSource('" + item.urlVideo + "')\">Xem</button>" +
                    "                   </div>\n" +
                    "                </div>\n" +
                    "<!--End of single video here-->\n";
            });
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
            let PostedHTML = PostedHTML_start + PostedHTML_end;
            res.send(PostedHTML);
        }
    })
};
exports.RemoveFromList = function(email,res){
    let PostedHTML_start = "\n" +
        "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>Review</title>\n" +
        "    <link rel='stylesheet' href='http://www.tinymce.com/css/codepen.min.css'>\n" +
        "    <style type=\"text/css\">\n" +
        "        #home\n" +
        "        {\n" +
        "            font-size:45px;\n" +
        "            padding-right: 10px;\n" +
        "        }\n" +
        "       .content{" +
        "           background-color:#333333;\n" +
        "           border-radius: 30px;\n" +
        "           padding: 0.5 em;\n" +
        "           width: 1500px;\n" +
        "       }\n" +
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
        "            font-family: Muli, sans-serif;\n" +
        "            color: #444;\n" +
        "            background: url(https://i.pinimg.com/originals/fb/9f/e1/fb9fe19fcc1f34f896862e74c1c99cfa.jpg);\n" +
        "            background-size: cover;\n" +
        "            height: auto;\n" +
        "            min-height:1300px;\n" +
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
        "            width: 270px;\n" +
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
        "            font-size: 15px;\n" +
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
        "            width: 270px;\n" +
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
        "        .DashBoard{\n" +
        "            line-height: 50px;\n" +
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
        "        .main {\n" +
        "            width: 1900px;\n" +
        "            float: right;\n" +
        "            margin-left: 221px;" +
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
        "            margin-left: 30px;\n" +
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
        "            margin-left: 15px;\n" +
        "            height: auto;\n" +
        "            margin-top: 100px;\n" +
        "        }\n" +
        "    </style>\n" +
        "    <style type=\"text/css\">\n" +
        "        @import url(\"https://fonts.googleapis.com/css?family=Open+Sans\");\n" +
        "        body {\n" +
        "            margin: 0;\n" +
        "            width: 100vw;\n" +
        "            overflow-x: hidden;\n" +
        "            background-color: #f0f0f0;\n" +
        "            font-family: 'Open Sans', sans-serif;\n" +
        "            font-size: 14.5px;\n" +
        "            line-height: 1.4em;\n" +
        "            color: #404646;\n" +
        "       }\n" +
        "\n" +
        "       * {\n" +
        "            box-sizing: border-box;\n" +
        "        }\n" +
        "        .wrapper {\n" +
        "            width: auto;\n" +
        "            max-width: 1300px;" +
        "            height: auto;\n" +
        "            margin: -50px auto auto 140px;\n" +
        "        }\n" +
        "        .container {\n" +
        "            min-height: 100vh;\n" +
        "            width: 1000px;\n" +
        "            margin: auto;\n" +
        "            padding: 1.6em;\n" +
        "            display: grid;\n" +
        "            justify-content: center;\n" +
        "            align-content: start;\n" +
        "            grid-gap: 1.6em;\n" +
        "            grid-template: auto/repeat(auto-fill, minmax(27em, 27em));\n" +
        "        }\n" +
        "\n" +
        "        .card {\n" +
        "            margin: 0;\n" +
        "            height: 15em;\n" +
        "            display: flex;\n" +
        "            background-color: white;\n" +
        "            box-shadow: 1px 3px 3px rgba(0, 10, 20, 0.06);\n" +
        "        }\n" +
        "        .card img {\n" +
        "            height: 100%;\n" +
        "            width: 50%;\n" +
        "            max-width: 50%;\n" +
        "            -o-object-fit: cover;\n" +
        "            object-fit: cover;\n" +
        "            flex: 1 1 auto;\n" +
        "        }\n" +
        "\n" +
        "        .card-body {\n" +
        "            width: 12em;\n" +
        "            max-height: 100%;\n" +
        "            flex: 1 1 auto;\n" +
        "            display: flex;\n" +
        "            flex-flow: column nowrap;\n" +
        "            justify-content: flex-start;\n" +
        "            padding: 1.6em;\n" +
        "        }\n" +
        "        button {\n" +
        "            min-width: 8.3em;\n" +
        "            flex: none;\n" +
        "            align-self: flex-start;\n" +
        "            margin-top: auto;\n" +
        "            margin-left: 20px;\n" +
        "            padding: 0.6em 1.2em;\n" +
        "            font-size: 0.92em;\n" +
        "            color: #404646;\n" +
        "            background: none;\n" +
        "            border: 1px solid #333333;\n" +
        "            border-radius: 2px;\n" +
        "        }\n" +
        "        .card-body button:hover {\n" +
        "            border-color: #d099a0;\n" +
        "        }\n" +
        "\n" +
        "        .card-text {\n" +
        "            position: relative;\n" +
        "            flex: 1;\n" +
        "            overflow: hidden;\n" +
        "            text-overflow: ellipsis;\n" +
        "            margin: 0 0 0.8em 0;\n" +
        "            padding-left: 10px;\n" +
        "        }\n" +
        "        .card-text h3, .card-text p {\n" +
        "            margin-top: 0;\n" +
        "        }\n" +
        "        .card-text:hover {\n" +
        "            background: linear-gradient(rgba(255, 255, 255, 0), #44D5AC);\n" +
        "        }\n" +
        "\n" +
        "        @media (max-width: 570px) {\n" +
        "           .container {\n" +
        "                grid-template: auto / 1fr;\n" +
        "                padding: 1.0666666667em;\n" +
        "           }\n" +
        "\n" +
        "           .card {\n" +
        "                flex: 1 1 auto;\n" +
        "                display: flex;\n" +
        "                background-color: white;\n" +
        "                box-shadow: 1px 3px 3px rgba(0, 10, 20, 0.06);\n" +
        "                -webkit-border-radius: 25px;-moz-border-radius: 25px;border-radius: 25px;\n" +
        "           }\n" +
        "           .card img {\n" +
        "                max-width: 45%;\n" +
        "           }\n" +
        "       }\n" +
        "\n" +
        "    </style>\n" +
        "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
        "    <script src=\"/socket.io/socket.io.js\"></script>\n" +
        "    <script>\n" +
        "        function removePost(idvideo,title){\n" +
        "            let socket = io();\n" +
        "            let video = {\n" +
        "                id: idvideo,\n" +
        "                name: title\n" +
        "            };\n" +
        "            socket.emit(\"remove\",video);\n" +
        "            alert(\"Đã gỡ thành công, tội cho mấy đứa đang xem !\")\n" +
        "            location.reload();" +
        "        }" +
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
        "<span class=\"bckg\">\n" +
        "    <header>\n" +
        "    <a href=\"/writerpage?email=" + email + "\" id=\"home\">Dashboard</a>\n" +
        "    <nav>\n" +
        "        <ul>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Các bài đăng\" onclick=\"postedrender()\">Các bài đăng</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function postedrender() {\n" +
        "                        window.location.href = \"/postedrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Các bình luận\" onclick=\"Commentrender()\">Các bình luận</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function Commentrender() {\n" +
        "                        window.location.href = \"/Commentrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Viết bài\" onclick=\"editorrender()\">Viết bài</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function editorrender() {\n" +
        "                        window.location.href = \"/editorrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <span style=\"color: red; margin-left: -5px;\">Dangerous place !</span>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Xóa bài đăng\" onclick=\"RemovePost()\">Xóa bài đăng</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function RemovePost(){\n" +
        "                        window.location.href = \"/removeposts?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Đăng xuất\" onclick=\"Signout()\">Đăng xuất</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function Signout(){\n" +
        "                        window.location.href = \"/login\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "        </ul>\n" +
        "    </nav>\n" +
        "</header>\n" +
        "</span>\n" +
        "<div class=\"main\">\n" +
        "    <div class=\"title\">\n" +
        "        <h2>Các bài đăng</h2>\n" +
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
        "            <div class=\"container\">\n";

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
                PostedHTML_start += "<!--Single video here-->\n" +
                    "                <div class=\"card\">\n" +
                    "                   <img src=\"" + item.image + "\" alt=\"" + item.summary + "\">\n" +
                    "                   <div class=\"class-body\">\n" +
                    "                       <div class=\"card-text\">\n" +
                    "                           <h3>" + item.title + "</h3>\n" +
                    "                       </div>\n" +
                    "                       <button type=\"button\" onclick=\"removePost(" + item.id + ",'" + item.title + "')\">Gỡ xuống</button>" +
                    "                   </div>\n" +
                    "                </div>\n" +
                    "<!--End of single video here-->\n";
            });
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
            let PostedHTML = PostedHTML_start + PostedHTML_end;
            res.send(PostedHTML);
        }
    })
};
exports.GetPostsByKeyWord = function(keyword,res){

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

    let GotList = "";

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
                GotList = "<div class=\"box\">\n" +
                    "            <div class=\"ProductSet ProductSet--grid\">\n" +
                    "                <!-- Product Card: vertical -->\n" +
                    "                <a href=\"/watchvideo?id=" + item.id + "&&ip=" +  item.urlVideo + "&&owner=" + item.email + "\" class=\"ProductCard ProductCard--grid\">\n" +
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
                    "        </div>" +
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
                    "</html>";
            });
            let MainPageHTML = MainPageHTML_start + GotList;
            res.send(MainPageHTML);
        }
    })
};
//loại bỏ phần tử giống nhau trong mảng
let deduplicate = function (ArrVideoID){
    let isExist = (ArrVideoID, x) => {
        for (let i=0; i< ArrVideoID.length; i++){
            if (ArrVideoID[i] === x ) return true;
        }
        return false;
    };

    let ans = [];
    ArrVideoID.forEach (element => {
        if (!isExist(ans, element)) ans.push(element);
    });
    return ans;
};
exports.GetCommentOnVideoByEmail = function (req,res,email) {
    let body = "<body>\n" +
        "<span class=\"bckg\">\n" +
        "    <header>\n" +
        "    <a href=\"/writerpage?email=" + email + "\" id=\"home\">Dashboard</a>\n" +
        "    <nav>\n" +
        "        <ul>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Các bài đăng\" onclick=\"postedrender()\">Các bài đăng</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function postedrender() {\n" +
        "                        window.location.href = \"/postedrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Các bình luận\" onclick=\"Commentrender()\">Các bình luận</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function Commentrender() {\n" +
        "                        window.location.href = \"/Commentrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Viết bài\" onclick=\"editorrender()\">Viết bài</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function editorrender() {\n" +
        "                        window.location.href = \"/editorrender?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <span style=\"color: red; margin-left: -5px;\">Dangerous place !</span>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Xóa bài đăng\" onclick=\"RemovePost()\">Xóa bài đăng</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function RemovePost(){\n" +
        "                        window.location.href = \"/removeposts?email=" + email + "\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "            <li>\n" +
        "                <a href=\"javascript:void(0);\" data-title=\"Đăng xuất\" onclick=\"Signout()\">Đăng xuất</a>\n" +
        "                <script type=\"text/javascript\">\n" +
        "                    function Signout(){\n" +
        "                        window.location.href = \"/login\"\n" +
        "                    }\n" +
        "                </script>\n" +
        "            </li>\n" +
        "        </ul>\n" +
        "    </nav>\n" +
        "</header>\n" +
        "</span>\n" +
        "<div class=\"main\">\n" +
        "    <div class=\"title\">\n" +
        "        <h2>Các bình luận</h2>\n" +
        "        <a href=\"javascript:void(0);\">Hello nigga !</a>\n" +
        "    </div>\n" +
        "    <div class=\"rendered\">\n";
    let arr = [];
    aws.config.update({
        region:'us-east-1',
        endpoint:'http://dynamodb.us-east-1.amazonaws.com',
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params0 = {
        TableName: "Comments",
        FilterExpression: "writer = :letter1",
        ExpressionAttributeValues: {
            ":letter1": email
        }
    };
    docClient.scan(params0, async (err,data) => {
        let topic_parts = "";
        if (err) {
            console.log(JSON.stringify(err,null,2));
            body += "<h3>Chưa có video nào của bạn được bình luận.</h3>\n" +
                "    </div>\n" +
                "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
                "    <script src='http://cdn.tinymce.com/4/tinymce.min.js'></script>\n" +
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
                "</div>\n" +
                "</body>\n";
        } else {
            data.Items.forEach((item)=>{
                arr.push(item.idvideo);
            });
            let new_arr = deduplicate(arr);
            let part = await CreateContent (new_arr,body,end,res);
            //console.log(part);
            //res.send(part);
        }
    });
};

let CreateContent = async (ArrID,body,end,res) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if (ArrID.length == 0)
                return reject(new Error("Mảng rỗng"));
            await ArrID.forEach(async (item) => {
                content = await RenderContent(item);
                body += content;
                if (ArrID.indexOf(item) === (ArrID.length - 1)){
                    console.log(head + body + end);
                    res.send(head + body + end);
                    resolve(body);
                }
            });
        },2000);
    });
}

//thực hiện chức năng lấy bình luận trên bài viết ở phía admin
let RenderContent = async (idvideo) => {
    console.log(idvideo);
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let result = "";
            aws.config.update({
                region:'us-east-1',
                endpoint:'http://dynamodb.us-east-1.amazonaws.com',
                "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
            });
            let docClient = new aws.DynamoDB.DocumentClient();
            let params0 = {
                TableName: "handmadevideo01",
                FilterExpression: "id = :num",
                ExpressionAttributeValues: {
                    ":num" : Number.parseInt(idvideo)
                }
            };

            docClient.scan(params0, async (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    data.Items.forEach(async (item) => {
                        result = "        <div class=\"topic\">" +
                            "             <div class=\"left\">" +
                            "                  <img src=\"" + item.image + "\" width=\"300\" height=\"300\" >" +
                            "             </div>" +
                            "             <div class=\"right\">";
                        let params2 = {
                            TableName: "Comments",
                            FilterExpression: "idvideo = :num",
                            ExpressionAttributeValues: {
                                ":num": Number.parseInt(idvideo)
                            }
                        };

                        docClient.scan(params2, (err, data) => {
                            if (err) {
                                return reject(err);
                            } else {
                                data.Items.forEach((item) => {
                                    result += "<h3 style=\"margin: 10px;\"><span style=\"background: #DA7151;color: #FFFFFF;padding: 10px;\">From:" + item.guestemail + "</span> - <span style=\"background: #44D5AC;color: #FFFFFF;padding:10px;\">" + item.content + "</span></h3>";
                                });
                                resolve(result);
                            }
                        });
                    });
                }
            });
        },1000);
    });
}
/*RenderComment (idvideo, (err,res) => {
    if (err)
        return console.log("Please review these errors: " + JSON.stringify(err,null,2));
    comment += res;
})
result += comment;*/
exports.GetDecorateBody = function (req,res) {
    let tag = "Decorate";
    let tagbody = "<body style=\"background-color: #333333;\">\n" +
        "    <header>\n" +
        "        <div class=\"container\">\n" +
        "            <h1><a href=\"/\" style=\"margin-left: 30px;\">Blyat Co.</a></h1>\n" +
        "            <span style=\"font-family: 'MV Boli'; color: #ffffff; margin-left: 100px;margin-top: 50px;\">\n" +
        "                <h1>Handmade sản phẩm trang trí</h1>\n" +
        "            </span>\n" +
        "            <nav>\n" +
        "                <a href=\"/\">Trang chủ</a>\n" +
        "                <a href=\"food\">Ẩm thực</a>\n" +
        "                <a href=\"house\">Nhà</a>\n" +
        "                <a href=\"origami\">Origami</a>\n" +
        "            </nav>\n" +
        "        </div>\n" +
        "    </header>\n" +
        "    <span>\n" +
        "        <div class=\"down_container\">\n" +
        "            <ul class=\"card-list\">";
    GetBodyOfTagPage(req,res,tag,tagbody,decorate_header);
}
exports.GetCookingBody = function (req,res) {
    let tags = "Cook";
    let tagbody = "<body style=\"background-color: #333333;\">\n" +
        "    <header>\n" +
        "        <div class=\"container\">\n" +
        "            <h1><a href=\"/\" style=\"margin-left: 30px;\">Blyat Co.</a></h1>\n" +
        "            <span style=\"font-family: 'MV Boli'; color: #ffffff; margin-left: 100px;margin-top: 50px;\">\n" +
        "                <h1>Handmade ẩm thực</h1>\n" +
        "            </span>\n" +
        "            <nav>\n" +
        "                <a href=\"/\">Trang chủ</a>\n" +
        "                <a href=\"decorate\">Trang trí</a>\n" +
        "                <a href=\"house\">Nhà</a>\n" +
        "                <a href=\"origami\">Origami</a>\n" +
        "            </nav>\n" +
        "        </div>\n" +
        "    </header>\n" +
        "    <span>\n" +
        "        <div class=\"down_container\">\n" +
        "            <ul class=\"card-list\">";
    GetBodyOfTagPage (req,res,tags,tagbody,cooking_header);
}

exports.GetOrigamiBody = function (req,res) {
    let tag = "Origami";
    let tag_body = "<body style=\"background-color: #333333;\">\n" +
        "    <header>\n" +
        "        <div class=\"container\">\n" +
        "            <h1><a href=\"/\" style=\"margin-left: 30px;\">Blyat Co.</a></h1>\n" +
        "            <span style=\"font-family: 'MV Boli'; color: #ffffff; margin-left: 100px;margin-top: 50px;\">\n" +
        "                <h1>Handmade nghệ thuật gấp giấy</h1>\n" +
        "            </span>\n" +
        "            <nav>\n" +
        "                <a href=\"/\">Trang chủ</a>\n" +
        "                <a href=\"decorate\">Trang trí</a>\n" +
        "                <a href=\"house\">Nhà</a>\n" +
        "                <a href=\"food\">Ẩm thực</a>\n" +
        "            </nav>\n" +
        "        </div>\n" +
        "    </header>\n" +
        "    <span>\n" +
        "        <div class=\"down_container\">\n" +
        "            <ul class=\"card-list\">";
    GetBodyOfTagPage(req,res,tag,tag_body,origami_header);
}

exports.GetHouseBody = function (req,res) {
    let tag = "Model";
    let tag_body = "<body style=\"background-color: #333333;\">\n" +
        "    <header>\n" +
        "        <div class=\"container\">\n" +
        "            <h1><a href=\"/\" style=\"margin-left: 30px;\">Blyat Co.</a></h1>\n" +
        "            <span style=\"font-family: 'MV Boli'; color: #ffffff; margin-left: 100px;margin-top: 50px;\">\n" +
        "                <h1>Handmade mô hình nhà</h1>\n" +
        "            </span>\n" +
        "            <nav>\n" +
        "                <a href=\"/\">Trang chủ</a>\n" +
        "                <a href=\"decorate\">Trang trí</a>\n" +
        "                <a href=\"food\">Ẩm thực</a>\n" +
        "                <a href=\"origami\">Origami</a>\n" +
        "            </nav>\n" +
        "        </div>\n" +
        "    </header>\n" +
        "    <span>\n" +
        "        <div class=\"down_container\">\n" +
        "            <ul class=\"card-list\">";
    GetBodyOfTagPage(req,res,tag,tag_body,house_header);
}
//////////////////////////////////--------------Trả về phần thân của tag cần lấy-------------------------------------////////////////////////////////////////////////////////
function GetBodyOfTagPage (req,res,tags,TagBody,HeaderCode){
    let tag = "";

    aws.config.update({
        region:'us-east-1',
        endpoint:'http://dynamodb.us-east-1.amazonaws.com',
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: "tags = :keyword",
        ExpressionAttributeValues:{
            ":keyword": tags
        }
    };
    docClient.scan(params,(err,data) => {
        if (err) {
            console.log("Have some errors in scanning " + tags + " video data for users.Please check it: " + JSON.stringify(err,null,2));
            TagBody += "<li class=\"card\"> Have some errors in scanning video for this tags.You can refresh this page or it still continue ... Please " +
                "contact this web's administrator for more detail. It's 076 981 1755 </li>\n" +
                "            </ul>\n" +
                "        </div>\n" +
                "    </span>\n" +
                "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
                "    <script>\n" +
                "        $(function(){\n" +
                "            let header = $(\"header\"),\n" +
                "                yOffset = 0,\n" +
                "                triggerPoint = 150;\n" +
                "            $(window).scroll(function(){\n" +
                "                yOffset = $(window).scrollTop();\n" +
                "\n" +
                "                if(yOffset >= triggerPoint){\n" +
                "                    header.addClass(\"minimized\");\n" +
                "                }else{\n" +
                "                    header.removeClass(\"minimized\");\n" +
                "                }\n" +
                "            });\n" +
                "        });\n" +
                "    </script>\n" +
                "    <script>\n" +
                "        let setCardTransform = function setCardTransform(cardIndex, angle) {\n" +
                "            let card = $('.card-list .card').eq(cardIndex).css('transform', 'rotate3d(1, 0, 0, ' + angle + 'deg)');\n" +
                "            $('.card-list .card').not(card).css('transform', 'none');\n" +
                "        };\n" +
                "\n" +
                "        $(function () {\n" +
                "            let $window = $(window);\n" +
                "            let windowHeight = $window.height();\n" +
                "\n" +
                "            $window.resize(function (e) {\n" +
                "                windowHeight = $window.height();\n" +
                "            });\n" +
                "            $window.scroll(function (e) {\n" +
                "                let cardPercent = window.scrollY % (windowHeight / 2) / windowHeight * 2;\n" +
                "                let cardCount = Math.floor(window.scrollY / (windowHeight / 2));\n" +
                "                setCardTransform(cardCount, cardPercent * 50);\n" +
                "            });\n" +
                "        });\n" +
                "    </script>\n" +
                "</body>\n" +
                "</html>";
        } else {
            data.Items.forEach((item) => {
                tag += "<li class=\"card\">\n" +
                    "<a href=\"/watchvideo?id=" + item.id + "&&ip=" +  item.urlVideo + "&&owner=" + item.email + "\">\n" +
                    "<img src=\"" + item.image + "\" alt=\"" + item.summary + "\" width=\"auto\" class=\"image\"/>\n" +
                    "<div class=\"card-content\">\n" +
                    "    <h1>" + item.title + "</h1>\n" +
                    "    <p>" + item.email + "</p>\n" +
                    "</div>\n" +
                    "</a> " +
                    "</li>";
            });
            let HTMLcoderesult = HeaderCode + TagBody + tag + "</ul>\n" +
                "        </div>\n" +
                "    </span>\n" +
                "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
                "    <script>\n" +
                "        $(function(){\n" +
                "            let header = $(\"header\"),\n" +
                "                yOffset = 0,\n" +
                "                triggerPoint = 150;\n" +
                "            $(window).scroll(function(){\n" +
                "                yOffset = $(window).scrollTop();\n" +
                "\n" +
                "                if(yOffset >= triggerPoint){\n" +
                "                    header.addClass(\"minimized\");\n" +
                "                }else{\n" +
                "                    header.removeClass(\"minimized\");\n" +
                "                }\n" +
                "            });\n" +
                "        });\n" +
                "    </script>\n" +
                "    <script>\n" +
                "        let setCardTransform = function setCardTransform(cardIndex, angle) {\n" +
                "            let card = $('.card-list .card').eq(cardIndex).css('transform', 'rotate3d(1, 0, 0, ' + angle + 'deg)');\n" +
                "            $('.card-list .card').not(card).css('transform', 'none');\n" +
                "        };\n" +
                "\n" +
                "        $(function () {\n" +
                "            let $window = $(window);\n" +
                "            let windowHeight = $window.height();\n" +
                "\n" +
                "            $window.resize(function (e) {\n" +
                "                windowHeight = $window.height();\n" +
                "            });\n" +
                "            $window.scroll(function (e) {\n" +
                "                let cardPercent = window.scrollY % (windowHeight / 2) / windowHeight * 2;\n" +
                "                let cardCount = Math.floor(window.scrollY / (windowHeight / 2));\n" +
                "                setCardTransform(cardCount, cardPercent * 50);\n" +
                "            });\n" +
                "        });\n" +
                "    </script>\n" +
                "</body>\n" +
                "</html>";
            res.send(HTMLcoderesult);
        }
    });
}

/*
Author : Tran The Vu
+
* Note : solution :
* * The first scan with param is writer and table comment, you should get all video id and put it into an array
* Then you will eliminate same contents and sorting it
* After have an array of video id (non-same content), you can start a loop in which you can set source into <image> tag in html code
* (above use GetImageSource() function below) and with each video id you can get its comment in second scan with id\video parameter
*/
/*"        <div class=\"topic\">" +
                    "     <div class=\"left\">" +
                    "         <img src=\"" + GetImageSource(item.idvideo) + "\">" +
                    "     </div>";*/
//phần html cho chức năng lấy comment trên bài viết phía người viết bài

let end = "</div>\n" +
    "</div>\n" +
    "    </div>\n" +
    "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
    "    <script src='http://cdn.tinymce.com/4/tinymce.min.js'></script>\n" +
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
    "</div>\n" +
    "</body>\n";
let head = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>Comments</title>\n" +
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
    "            font-family: Muli, sans-serif;\n" +
    "            color: #444;\n" +
    "            background: url(https://i.pinimg.com/originals/fb/9f/e1/fb9fe19fcc1f34f896862e74c1c99cfa.jpg);\n" +
    "            background-size: cover;\n" +
    "            height: auto;\n" +
    "            min-height:1300px;\n" +
    "        }\n" +
    "        #home\n" +
    "        {\n" +
    "            font-size:45px;\n" +
    "            padding-right: 10px;\n" +
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
    "            width: 270px;\n" +
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
    "            font-size: 15px;\n" +
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
    "        .main {\n" +
    "            width: 1900px;\n" +
    "            float: right;\n" +
    "            margin-left: 221px;" +
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
    "            margin-left: 30px;\n" +
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
    "            margin-left: 15px;\n" +
    "            height: auto;\n" +
    "            margin-top: 100px;\n" +
    "           padding: 1em;\n" +
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
    "        .topic{\n" +
    "            min-width: 1600px;\n" +
    "            width: auto;\n" +
    "            min-height: 300px;\n" +
    "            height: auto;\n" +
    "            background: #FFFFFF;\n" +
    "            -webkit-border-radius: 30px;\n" +
    "            -moz-border-radius: 30px;\n" +
    "            border-radius: 30px;\n" +
    "            float: left;\n" +
    "            margin: 20px;\n" +
    "        }\n" +
    "        .left{\n" +
    "            min-width: 300px;\n" +
    "            width: auto;\n" +
    "            height: auto;\n" +
    "            float:left;\n" +
    "            padding: 0.5em;" +
    "         }\n" +
    "       .right{\n" +
    "            margin: 1em;\n" +
    "            min-width: 1200px;\n" +
    "            width: auto;\n" +
    "            height: auto;\n" +
    "            font-family: Georgia, sans-serif;\n" +
    "            font-size: 20px;\n" +
    "            padding: 0.5em;\n" +
    "            float: left;\n" +
    "        }" +
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
    "\n" +
    "        /**\n" +
    "         * @return {number}\n" +
    "         */\n" +
    "        function RandDomNumber(max) {\n" +
    "            let boundary = Number.parseInt(max);\n" +
    "            return Math.floor(Math.random()*boundary);\n" +
    "        }\n" +
    "    </script>\n" +
    "    <link rel='stylesheet' href='http://www.tinymce.com/css/codepen.min.css'>\n" +
    "</head>\n";
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let decorate_header = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Montserrat:400,300,700\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"../CSS/style.css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://fonts.googleapis.com/css?family=Muli\" type=\"text/css\">\n" +
    "    <link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:400,300,300italic,400italic,600italic,600\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"css/master.css\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://ianlunn.github.io/Hover/css/hover.css\" type=\"text/css\">\n" +
    "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
    "    <link href=\"../CSS/slide.css\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <title>Decorate</title>\n" +
    "    <style type=\"text/css\">\n" +
    "        @import \"compass/css3\";\n" +
    "        body {\n" +
    "            background: url(https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/NGyZeGzFlijx95hou/christmas-decorations-in-the-studio-christmas-toys-wall-clocks-handmade-stylish-christmas-tree-with-white-fluffy-snow-merry-christmas-and-happy-new-year-new-year-and-christmas-decorations_vgeaddckl__F0000.png) no-repeat;\n" +
    "            -webkit-background-size: auto;\n" +
    "            background-size: auto;\n" +
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
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header h1, header nav {\n" +
    "            display: inline-block;\n" +
    "            position: relative;\n" +
    "            line-height: 150px;\n" +
    "            -webkit-transition: all 0.3s;\n" +
    "        }\n" +
    "        header a {\n" +
    "            text-decoration: none;\n" +
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header nav {\n" +
    "            float: right;\n" +
    "            line-height: 150px;\n" +
    "            font-size: 1.6em;\n" +
    "            padding-right: 20px;\n" +
    "            z-index: 99;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "        header nav a {\n" +
    "            margin-top: -10px;\n" +
    "            margin-left: 10px;\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "        header nav a:hover {\n" +
    "            border-top: 2px dotted white;\n" +
    "            border-bottom: 2px dotted white;\n" +
    "            color: red;\n" +
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
    "    <!--For card list-->\n" +
    "    <style type=\"text/css\">\n" +
    "\n" +
    "        .card-list {\n" +
    "            margin: 0 auto;\n" +
    "            max-width: 600px;\n" +
    "            -webkit-perspective: 1200px;\n" +
    "            perspective: 1200px;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "        .card-list .card:last-child {\n" +
    "            margin-bottom: 0;\n" +
    "        }\n" +
    "\n" +
    "        .card {\n" +
    "            width: 100%;\n" +
    "            padding: 10px;\n" +
    "            background: #fff;\n" +
    "            border-radius: 3px;\n" +
    "            height: 47.5vh;\n" +
    "            margin-top: 5vh;\n" +
    "            margin-bottom: 5vh;\n" +
    "            box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.5);\n" +
    "            -webkit-transform-origin: bottom center;\n" +
    "            transform-origin: bottom center;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "\n" +
    "        .image {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            float: left;\n" +
    "        }\n" +
    "\n" +
    "        .card-content {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            justify-content: center;\n" +
    "            float: left;\n" +
    "           padding-left: 20px;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1,p {\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1 {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "        .card-content p {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <!----------------->\n" +
    "</head>";
let cooking_header = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Montserrat:400,300,700\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"../CSS/style.css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://fonts.googleapis.com/css?family=Muli\" type=\"text/css\">\n" +
    "    <link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:400,300,300italic,400italic,600italic,600\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"css/master.css\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://ianlunn.github.io/Hover/css/hover.css\" type=\"text/css\">\n" +
    "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
    "    <link href=\"../CSS/slide.css\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <title>Decorate</title>\n" +
    "    <style type=\"text/css\">\n" +
    "        @import \"compass/css3\";\n" +
    "        body {\n" +
    "            background: url(http://s1.1zoom.me/b4755/677/Fast_food_Vegetables_tacos_Wood_planks_Cutting_531998_1920x1200.jpg) no-repeat;\n" +
    "            -webkit-background-size: auto;\n" +
    "            background-size: auto;\n" +
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
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header h1, header nav {\n" +
    "            display: inline-block;\n" +
    "            position: relative;\n" +
    "            line-height: 150px;\n" +
    "            -webkit-transition: all 0.3s;\n" +
    "        }\n" +
    "        header a {\n" +
    "            text-decoration: none;\n" +
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header nav {\n" +
    "            float: right;\n" +
    "            line-height: 150px;\n" +
    "            font-size: 1.6em;\n" +
    "            padding-right: 20px;\n" +
    "            z-index: 99;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "        header nav a {\n" +
    "            margin-top: -10px;\n" +
    "            margin-left: 10px;\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "        header nav a:hover {\n" +
    "            border-top: 2px dotted white;\n" +
    "            border-bottom: 2px dotted white;\n" +
    "            color: red;\n" +
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
    "    <!--For card list-->\n" +
    "    <style type=\"text/css\">\n" +
    "\n" +
    "        .card-list {\n" +
    "            margin: 0 auto;\n" +
    "            max-width: 600px;\n" +
    "            -webkit-perspective: 1200px;\n" +
    "            perspective: 1200px;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "        .card-list .card:last-child {\n" +
    "            margin-bottom: 0;\n" +
    "        }\n" +
    "\n" +
    "        .card {\n" +
    "            width: 100%;\n" +
    "            padding: 10px;\n" +
    "            background: #fff;\n" +
    "            border-radius: 3px;\n" +
    "            height: 47.5vh;\n" +
    "            margin-top: 5vh;\n" +
    "            margin-bottom: 5vh;\n" +
    "            box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.5);\n" +
    "            -webkit-transform-origin: bottom center;\n" +
    "            transform-origin: bottom center;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "\n" +
    "        .image {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            float: left;\n" +
    "        }\n" +
    "\n" +
    "        .card-content {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            justify-content: center;\n" +
    "            float: left;\n" +
    "           padding-left: 20px;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1,p {\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1 {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "        .card-content p {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <!----------------->\n" +
    "</head>";
let origami_header = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Montserrat:400,300,700\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"../CSS/style.css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://fonts.googleapis.com/css?family=Muli\" type=\"text/css\">\n" +
    "    <link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:400,300,300italic,400italic,600italic,600\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"css/master.css\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://ianlunn.github.io/Hover/css/hover.css\" type=\"text/css\">\n" +
    "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
    "    <link href=\"../CSS/slide.css\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <title>Decorate</title>\n" +
    "    <style type=\"text/css\">\n" +
    "        @import \"compass/css3\";\n" +
    "        body {\n" +
    "            background: url(https://best-wallpaper.net/wallpaper/1920x1200/1810/Art-origami-dragon_1920x1200.jpg) no-repeat;\n" +
    "            -webkit-background-size: auto;\n" +
    "            background-size: auto;\n" +
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
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header h1, header nav {\n" +
    "            display: inline-block;\n" +
    "            position: relative;\n" +
    "            line-height: 150px;\n" +
    "            -webkit-transition: all 0.3s;\n" +
    "        }\n" +
    "        header a {\n" +
    "            text-decoration: none;\n" +
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header nav {\n" +
    "            float: right;\n" +
    "            line-height: 150px;\n" +
    "            font-size: 1.6em;\n" +
    "            padding-right: 20px;\n" +
    "            z-index: 99;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "        header nav a {\n" +
    "            margin-top: -10px;\n" +
    "            margin-left: 10px;\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "        header nav a:hover {\n" +
    "            border-top: 2px dotted white;\n" +
    "            border-bottom: 2px dotted white;\n" +
    "            color: red;\n" +
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
    "    <!--For card list-->\n" +
    "    <style type=\"text/css\">\n" +
    "\n" +
    "        .card-list {\n" +
    "            margin: 0 auto;\n" +
    "            max-width: 600px;\n" +
    "            -webkit-perspective: 1200px;\n" +
    "            perspective: 1200px;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "        .card-list .card:last-child {\n" +
    "            margin-bottom: 0;\n" +
    "        }\n" +
    "\n" +
    "        .card {\n" +
    "            width: 100%;\n" +
    "            padding: 10px;\n" +
    "            background: #fff;\n" +
    "            border-radius: 3px;\n" +
    "            height: 47.5vh;\n" +
    "            margin-top: 5vh;\n" +
    "            margin-bottom: 5vh;\n" +
    "            box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.5);\n" +
    "            -webkit-transform-origin: bottom center;\n" +
    "            transform-origin: bottom center;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "\n" +
    "        .image {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            float: left;\n" +
    "        }\n" +
    "\n" +
    "        .card-content {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            justify-content: center;\n" +
    "            float: left;\n" +
    "           padding-left: 20px;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1,p {\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1 {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "        .card-content p {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <!----------------->\n" +
    "</head>";
let house_header = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Montserrat:400,300,700\">\n" +
    "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css\">\n" +
    "    <link rel=\"stylesheet\" href=\"../CSS/style.css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://fonts.googleapis.com/css?family=Muli\" type=\"text/css\">\n" +
    "    <link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:400,300,300italic,400italic,600italic,600\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"css/master.css\" type=\"text/css\">\n" +
    "    <link rel=\"Stylesheet\" href=\"https://ianlunn.github.io/Hover/css/hover.css\" type=\"text/css\">\n" +
    "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
    "    <link href=\"../CSS/slide.css\" rel=\"stylesheet\" type=\"text/css\">\n" +
    "    <title>Decorate</title>\n" +
    "    <style type=\"text/css\">\n" +
    "        @import \"compass/css3\";\n" +
    "        body {\n" +
    "            background: url(https://file.hstatic.net/1000219392/file/nha_mo_hinh_handmade_cua_thuy_linh__4_.jpg) no-repeat;\n" +
    "            -webkit-background-size: auto;\n" +
    "            background-size: auto;\n" +
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
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header h1, header nav {\n" +
    "            display: inline-block;\n" +
    "            position: relative;\n" +
    "            line-height: 150px;\n" +
    "            -webkit-transition: all 0.3s;\n" +
    "        }\n" +
    "        header a {\n" +
    "            text-decoration: none;\n" +
    "            color: #FFFFFF;\n" +
    "        }\n" +
    "        header nav {\n" +
    "            float: right;\n" +
    "            line-height: 150px;\n" +
    "            font-size: 1.6em;\n" +
    "            padding-right: 20px;\n" +
    "            z-index: 99;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "        header nav a {\n" +
    "            margin-top: -10px;\n" +
    "            margin-left: 10px;\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "        header nav a:hover {\n" +
    "            border-top: 2px dotted white;\n" +
    "            border-bottom: 2px dotted white;\n" +
    "            color: red;\n" +
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
    "    <!--For card list-->\n" +
    "    <style type=\"text/css\">\n" +
    "\n" +
    "        .card-list {\n" +
    "            margin: 0 auto;\n" +
    "            max-width: 600px;\n" +
    "            -webkit-perspective: 1200px;\n" +
    "            perspective: 1200px;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "        .card-list .card:last-child {\n" +
    "            margin-bottom: 0;\n" +
    "        }\n" +
    "\n" +
    "        .card {\n" +
    "            width: 100%;\n" +
    "            padding: 10px;\n" +
    "            background: #fff;\n" +
    "            border-radius: 3px;\n" +
    "            height: 47.5vh;\n" +
    "            margin-top: 5vh;\n" +
    "            margin-bottom: 5vh;\n" +
    "            box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.5);\n" +
    "            -webkit-transform-origin: bottom center;\n" +
    "            transform-origin: bottom center;\n" +
    "            z-index: 0;\n" +
    "        }\n" +
    "\n" +
    "        .image {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            float: left;\n" +
    "        }\n" +
    "\n" +
    "        .card-content {\n" +
    "            width: 48%;\n" +
    "            height: 98%;\n" +
    "            justify-content: center;\n" +
    "            float: left;\n" +
    "           padding-left: 20px;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1,p {\n" +
    "            color: #333333;\n" +
    "        }\n" +
    "\n" +
    "        .card-content h1 {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "        .card-content p {\n" +
    "            " +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <!----------------->\n" +
    "</head>";
///////////////////// xử lý đống socket
exports.IncreaseLike = function (id) {

    aws.config.update({
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: "id = :num",
        ExpressionAttributeValues: {
            ":num": id
        }
    };
    docClient.scan(params, (err,data) => {
        if (err)
            console.log("Cannot get like of video has id is " + id + ". Please check these JSON errors bellow: " + JSON.stringify(err,null,2));
        else {
            data.Items.forEach((item) => {
                AddLike (id,item.like_count);
            })
        }
    });
};
exports.DecreaseLike = function (id) {
    aws.config.update({
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: "id = :num",
        ExpressionAttributeValues: {
            ":num": id
        }
    };
    docClient.scan(params, (err,data) => {
        if (err)
            console.log("Cannot get like of video has id is " + id + ". Please check these JSON errors bellow: " + JSON.stringify(err,null,2));
        else {
            data.Items.forEach((item) => {
                LowLike (id,item.like_count);
            })
        }
    });
}
function LowLike(id,Like) {
    aws.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });

    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        Key: {
            "id": id
        },
        UpdateExpression: "set like_count = :num",
        ExpressionAttributeValues: {
            ":num": Like - 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err,data) => {
        if (err)
            console.log("The video didn't receive the like from client. Please check the following JSON error: " + JSON.stringify(err,null,2));
        else {
            console.log("Video has id number " + id + " increased like")
        }
    });
}
function AddLike (id,Like){

////////////////////////////////////////////////////// for like
    aws.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        Key: {
            "id": id
        },
        UpdateExpression: "set like_count = :num",
        ExpressionAttributeValues: {
            ":num": Like + 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err,data) => {
        if (err)
            console.log("The video didn't receive the like from client. Please check the following JSON error: " + JSON.stringify(err,null,2));
        else {
            console.log("Video has id number " + id + " increased like")
        }
    });
}
//////////////////////////////////////////////////////for dislike
exports.IncreaseDisLike = function (id) {
    aws.config.update({
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: "id = :num",
        ExpressionAttributeValues: {
            ":num": id
        }
    };
    docClient.scan(params, (err,data) => {
        if (err)
            console.log("Cannot get dislike of video has id is " + id + ". Please check these JSON errors bellow: " + JSON.stringify(err,null,2));
        else {
            data.Items.forEach((item) => {
                AddDisLike (id,item.dislike_count);
            })
        }
    });
}
exports.DecreaseDisLike = function (id) {
    aws.config.update({
        region: "us-east-1",
        endpoint: "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        FilterExpression: "id = :num",
        ExpressionAttributeValues: {
            ":num": id
        }
    };
    docClient.scan(params, (err,data) => {
        if (err)
            console.log("Cannot get dislike of video has id is " + id + ". Please check these JSON errors bellow: " + JSON.stringify(err,null,2));
        else {
            data.Items.forEach((item) => {
                LowDisLike (id,item.dislike_count);
            })
        }
    });
}
function LowDisLike(id,DisLike) {

    aws.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        Key: {
            "id": id
        },
        UpdateExpression: "set dislike_count = :num",
        ExpressionAttributeValues: {
            ":num": DisLike - 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err,data) => {
        if (err)
            console.log("The video didn't receive the dislike from client. Please check the following JSON error: " + JSON.stringify(err,null,2));
        else {
            console.log("Video has id number " + id + " increased dislike")
        }
    });
}

function AddDisLike (id,DisLike){
    aws.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": config.accesskeyid, "secretAccessKey": config.secretkey
    });
    let docClient = new aws.DynamoDB.DocumentClient();
    let params = {
        TableName: "handmadevideo01",
        Key: {
            "id": id
        },
        UpdateExpression: "set dislike_count = :num",
        ExpressionAttributeValues: {
            ":num": DisLike + 1
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err,data) => {
        if (err)
            console.log("The video didn't receive the like from client. Please check the following JSON error: " + JSON.stringify(err,null,2));
        else {
            console.log("Video has id number " + id + " decreased like")
        }
    });
}