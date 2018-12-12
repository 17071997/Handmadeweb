let AWS = require('aws-sdk');
let config = require('./config.json');
let email = "";

module.exports = {
    EditorPageRender : function (email,req,res) {
        let code = "\n" +
            "\n" +
            "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta charset=\"utf-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
            "    <link href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css\" rel=\"stylesheet\">\n" +
            "    <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n" +
            "    <style>\n" +
            "        .container {\n" +
            "            max-width: 1400px;\n" +
            "            margin-top: 50px;\n" +
            "            margin-left: 200px;\n" +
            "            background: #FFFFFF;\n" +
            "            -webkit-border-radius: 30px;\n" +
            "            -moz-border-radius: 30px;\n" +
            "            border-radius: 30px;\n" +
            "            padding: 20px;\n" +
            "            float: left;\n" +
            "        }\n" +
            "        div.cs-select {\n" +
            "            position: relative;\n" +
            "            z-index: 100;\n" +
            "            display: inline-block;\n" +
            "            width: 100%;\n" +
            "            max-width: 500px;\n" +
            "            -webkit-user-select: none;\n" +
            "            -moz-user-select: none;\n" +
            "            -ms-user-select: none;\n" +
            "            user-select: none;\n" +
            "            text-align: left;\n" +
            "            vertical-align: middle;\n" +
            "            background: #fff;\n" +
            "            -webkit-touch-callout: none;\n" +
            "            -khtml-user-select: none;\n" +
            "        }\n" +
            "\n" +
            "        div.cs-select:focus {\n" +
            "            outline: none;\n" +
            "            /* For better accessibility add a style for this in your skin */\n" +
            "        }\n" +
            "\n" +
            "        .cs-select select {\n" +
            "            display: none;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select span {\n" +
            "            position: relative;\n" +
            "            display: block;\n" +
            "            overflow: hidden;\n" +
            "            padding: 1em;\n" +
            "            cursor: pointer;\n" +
            "            white-space: nowrap;\n" +
            "            text-overflow: ellipsis;\n" +
            "        }\n" +
            "        /* Placeholder and selected option */\n" +
            "\n" +
            "        .cs-select > span {\n" +
            "            padding-right: 3em;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select > span::after,\n" +
            "        .cs-select .cs-selected span::after {\n" +
            "            position: absolute;\n" +
            "            top: 50%;\n" +
            "            -webkit-transform: translateY(-50%);\n" +
            "            transform: translateY(-50%);\n" +
            "            speak: none;\n" +
            "            -webkit-font-smoothing: antialiased;\n" +
            "            -moz-osx-font-smoothing: grayscale;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select > span::after {\n" +
            "            right: 1em;\n" +
            "            content: '\\25BE';\n" +
            "        }\n" +
            "\n" +
            "        .cs-select .cs-selected span::after {\n" +
            "            margin-left: 1em;\n" +
            "            content: '\\2713';\n" +
            "        }\n" +
            "\n" +
            "        .cs-select.cs-active > span::after {\n" +
            "            -webkit-transform: translateY(-50%) rotate(180deg);\n" +
            "            transform: translateY(-50%) rotate(180deg);\n" +
            "        }\n" +
            "\n" +
            "        div.cs-active {\n" +
            "            z-index: 200;\n" +
            "        }\n" +
            "        /* Options */\n" +
            "\n" +
            "        .cs-select .cs-options {\n" +
            "            position: absolute;\n" +
            "            visibility: hidden;\n" +
            "            overflow: hidden;\n" +
            "            width: 100%;\n" +
            "            background: #fff;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select.cs-active .cs-options {\n" +
            "            visibility: visible;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select ul {\n" +
            "            width: 100%;\n" +
            "            margin: 0;\n" +
            "            padding: 0;\n" +
            "            list-style: none;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select ul span {\n" +
            "            padding: 1em;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select ul li.cs-focus span {\n" +
            "            background-color: #ddd;\n" +
            "        }\n" +
            "        /* Optgroup and optgroup label */\n" +
            "\n" +
            "        .cs-select li.cs-optgroup ul {\n" +
            "            padding-left: 1em;\n" +
            "        }\n" +
            "\n" +
            "        .cs-select li.cs-optgroup > span {\n" +
            "            cursor: default;\n" +
            "        }\n" +
            "\n" +
            "        div.cs-skin-elastic {\n" +
            "            font-size: 1.5em;\n" +
            "            font-weight: 700;\n" +
            "            color: #5b8583;\n" +
            "            background: transparent;\n" +
            "        }\n" +
            "\n" +
            "        @media screen and (max-width: 30em) {\n" +
            "            div.cs-skin-elastic {\n" +
            "                font-size: 1em;\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic > span {\n" +
            "            z-index: 100;\n" +
            "            background-color: #fff;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic .cs-options {\n" +
            "            visibility: visible;\n" +
            "            overflow: visible;\n" +
            "            padding-bottom: 1.25em;\n" +
            "            pointer-events: none;\n" +
            "            opacity: 1;\n" +
            "            background: transparent;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic.cs-active .cs-options {\n" +
            "            pointer-events: auto;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic .cs-options > ul::before {\n" +
            "            position: absolute;\n" +
            "            top: 0;\n" +
            "            left: 0;\n" +
            "            width: 100%;\n" +
            "            height: 100%;\n" +
            "            content: '';\n" +
            "            -webkit-transition: -webkit-transform .3s;\n" +
            "            transition: transform .3s;\n" +
            "            -webkit-transform: scale3d(1, 0, 1);\n" +
            "            transform: scale3d(1, 0, 1);\n" +
            "            -webkit-transform-origin: 50% 0;\n" +
            "            transform-origin: 50% 0;\n" +
            "            background: #fff;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic.cs-active .cs-options > ul::before {\n" +
            "            -webkit-transition: none;\n" +
            "            transition: none;\n" +
            "            -webkit-transform: scale3d(1, 1, 1);\n" +
            "            transform: scale3d(1, 1, 1);\n" +
            "            -webkit-animation: expand .6s ease-out;\n" +
            "            animation: expand .6s ease-out;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic .cs-options ul li {\n" +
            "            -webkit-transition: opacity .15s, -webkit-transform .15s;\n" +
            "            transition: opacity .15s, transform .15s;\n" +
            "            -webkit-transform: translate3d(0, -25px, 0);\n" +
            "            transform: translate3d(0, -25px, 0);\n" +
            "            opacity: 0;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic.cs-active .cs-options ul li {\n" +
            "            -webkit-transition: none;\n" +
            "            transition: none;\n" +
            "            -webkit-transform: translate3d(0, 0, 0);\n" +
            "            transform: translate3d(0, 0, 0);\n" +
            "            -webkit-animation: bounce .6s ease-out;\n" +
            "            animation: bounce .6s ease-out;\n" +
            "            opacity: 1;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic .cs-options span {\n" +
            "            background-repeat: no-repeat;\n" +
            "            background-position: 1.5em 50%;\n" +
            "            background-size: 2em auto;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic .cs-options span:hover,\n" +
            "        .cs-skin-elastic .cs-options li.cs-focus span,\n" +
            "        .cs-skin-elastic .cs-options .cs-selected span {\n" +
            "            color: #1e4c4a;\n" +
            "        }\n" +
            "\n" +
            "        .cs-skin-elastic .cs-options .cs-selected span::after {\n" +
            "            content: '';\n" +
            "        }\n" +
            "\n" +
            "        @-webkit-keyframes expand {\n" +
            "            0% {\n" +
            "                -webkit-transform: scale3d(1, 0, 1);\n" +
            "            }\n" +
            "            25% {\n" +
            "                -webkit-transform: scale3d(1, 1.2, 1);\n" +
            "            }\n" +
            "            50% {\n" +
            "                -webkit-transform: scale3d(1, .85, 1);\n" +
            "            }\n" +
            "            75% {\n" +
            "                -webkit-transform: scale3d(1, 1.05, 1);\n" +
            "            }\n" +
            "            100% {\n" +
            "                -webkit-transform: scale3d(1, 1, 1);\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        @keyframes expand {\n" +
            "            0% {\n" +
            "                -webkit-transform: scale3d(1, 0, 1);\n" +
            "                transform: scale3d(1, 0, 1);\n" +
            "            }\n" +
            "            25% {\n" +
            "                -webkit-transform: scale3d(1, 1.2, 1);\n" +
            "                transform: scale3d(1, 1.2, 1);\n" +
            "            }\n" +
            "            50% {\n" +
            "                -webkit-transform: scale3d(1, .85, 1);\n" +
            "                transform: scale3d(1, .85, 1);\n" +
            "            }\n" +
            "            75% {\n" +
            "                -webkit-transform: scale3d(1, 1.05, 1);\n" +
            "                transform: scale3d(1, 1.05, 1);\n" +
            "            }\n" +
            "            100% {\n" +
            "                -webkit-transform: scale3d(1, 1, 1);\n" +
            "                transform: scale3d(1, 1, 1);\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        @-webkit-keyframes bounce {\n" +
            "            0% {\n" +
            "                -webkit-transform: translate3d(0, -25px, 0);\n" +
            "                opacity: 0;\n" +
            "            }\n" +
            "            25% {\n" +
            "                -webkit-transform: translate3d(0, 10px, 0);\n" +
            "            }\n" +
            "            50% {\n" +
            "                -webkit-transform: translate3d(0, -6px, 0);\n" +
            "            }\n" +
            "            75% {\n" +
            "                -webkit-transform: translate3d(0, 2px, 0);\n" +
            "            }\n" +
            "            100% {\n" +
            "                -webkit-transform: translate3d(0, 0, 0);\n" +
            "                opacity: 1;\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        @keyframes bounce {\n" +
            "            0% {\n" +
            "                -webkit-transform: translate3d(0, -25px, 0);\n" +
            "                transform: translate3d(0, -25px, 0);\n" +
            "                opacity: 0;\n" +
            "            }\n" +
            "            25% {\n" +
            "                -webkit-transform: translate3d(0, 10px, 0);\n" +
            "                transform: translate3d(0, 10px, 0);\n" +
            "            }\n" +
            "            50% {\n" +
            "                -webkit-transform: translate3d(0, -6px, 0);\n" +
            "                transform: translate3d(0, -6px, 0);\n" +
            "            }\n" +
            "            75% {\n" +
            "                -webkit-transform: translate3d(0, 2px, 0);\n" +
            "                transform: translate3d(0, 2px, 0);\n" +
            "            }\n" +
            "            100% {\n" +
            "                -webkit-transform: translate3d(0, 0, 0);\n" +
            "                transform: translate3d(0, 0, 0);\n" +
            "                opacity: 1;\n" +
            "            }\n" +
            "        }\n" +
            "    </style>\n" +
            "    <title>Happy writting</title>\n" +
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
            "            margin: 2.5em;\n" +
            "        }\n" +
            "        #home\n" +
            "        {\n" +
            "            font-size:45px;\n" +
            "            padding-right: 10px;\n" +
            "        }\n" +
            "    </style>\n" +
            "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote.js\"></script>\n" +
            "    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n" +
            "    <script>\n" +
            "        $(document).ready( function() {\n" +
            "            $(\"#description\").summernote();" +
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
            "    <link rel=\"stylesheet\" href='http://www.tinymce.com/css/codepen.min.css'>" +
            "    <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css" +
            "    /bootstrap.min.css\" integrity=\"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO\" crossorigin=\"anonymous\">\n" +
            "    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" " +
            "    crossorigin=\"anonymous\">\n" +
            "    <link href=\"http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote.css\" rel=\"stylesheet\">\n" +
            "" +
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
            "        <h2>Viết bài</h2>\n" +
            "        <a href=\"javascript:void(0);\">Hello nigga !</a>\n" +
            "    </div>\n" +
            "    <div class=\"rendered\">\n" +
            "        <!-- views/partials/editor.ejs -->\n" +
            "    <!--Upload video field-->\n" +
            "    <div class=\"container\">\n" +
            "        <div class=\"section\">\n" +
            "            <div class=\"row\">\n" +
            "                <div class=\"col s12\">\n" +
            "                    <h4 class=\"center light-blue-text\">Đăng video</h4>\n" +
            "                    <p class=\"center\" style=\"font-size: 20px;\">Tải video trực tiếp lên channel</p>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <div class=\"row\">\n" +
            "            <form class=\"col s12\" action=\"Dangbai\" method=\"post\" id=\"uploadForm\" enctype=\"multipart/form-data\">\n" +
            "\n" +
            "                <div class=\"row\">\n" +
            "                    <div class=\"input-field col m6 s12\">\n" +
            "                        <input id=\"video_title\" type=\"text\" class=\"validate\" name=\"video_title\" required>\n" +
            "                        <label for=\"video_title\">Tựa đề video</label>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"input-field col m6 s12\">\n" +
            "                        <input id=\"email\" type=\"email\" class=\"validate\" name=\"email\" required>\n" +
            "                        <label for=\"email\">Email của bạn</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"input-field col s12\">\n" +
            "                        <input id=\"video_description\" type=\"text\" class=\"validate\" name=\"video_description\" required>\n" +
            "                        <label for=\"video_description\">Mô tả video</label>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"file-field input-field col s12\">\n" +
            "                        <div class=\"btn\">\n" +
            "                            <span>Video</span>\n" +
            "                            <input type=\"file\" accept=\"video/*\" id=\"fileupload\" name=\"fileupload\" required>\n" +
            "                        </div>\n" +
            "                        <div class=\"file-path-wrapper\">\n" +
            "                            <input class=\"file-path validate\" type=\"text\" placeholder=\"Click để chọn file upload\" required>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"input-field col m6 s12\">\n" +
            "                        <input id=\"video_path\" type=\"text\" class=\"validate\" name=\"video_path\" placeholder=\"Đường dẫn video\" required />\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"input-field col m6 s12\">\n" +
            "                        <label>\n" +
            "                            <select class=\"cs-select cs-skin-elastic\" name=\"video_tags\" required>\n" +
            "                                <option value=\"\" disabled selected>Chọn loại video</option>\n" +
            "                                <option value=\"Origami\">Origami</option>\n" +
            "                                <option value=\"Cook\">Nấu ăn</option>\n" +
            "                                <option value=\"Model\">Mô hình nhà</option>\n" +
            "                                <option value=\"Decorate\">Trang trí</option>\n" +
            "                            </select>\n" +
            "                        </label>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"file-field input-field col s12\">\n" +
            "                        <div class=\"btn\">\n" +
            "                            <span>Ảnh đại diện</span>\n" +
            "                            <input type=\"file\" accept=\"image/*\" id=\"imageupload\" name=\"imageupload\" required>\n" +
            "                        </div>\n" +
            "                        <div class=\"file-path-wrapper\">\n" +
            "                            <input class=\"file-path validate\" type=\"text\" placeholder=\"Click để chọn file upload\" required>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"input-field col s12\">\n" +
            "                        <input id=\"image_path\" type=\"text\" class=\"validate\" name=\"image_path\" placeholder=\"Đường dẫn hình ảnh\" required/>\n" + "                    </div>\n" +
            "\n" +
            "                    <div class=\"input-field col m4 s12\">\n" +
            "                        <input type=\"submit\" class=\"waves-effect waves-light btn-large\" value=\"Upload Video\" name=\"submit\"/>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"input-field col m8 s12\">\n" +
            "                        <p class=\"left-align\">\n" +
            "                            <span id=\"message\"></span>\n" +
            "                            <span id=\"progress\" style=\"display:none\">\n" +
            "                                <span id=\"percent-transferred\"></span>% done (<span id=\"bytes-transferred\"></span>/<span id=\"total-bytes\"></span> KB)\n" +
            "                            </span>\n" +
            "                        </p>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </form>\n" +
            "            <div></div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <!--video player-->\n" +
            "    <video height=\"540\" width=\"1480\" controls style=\"float: left;margin-top: 50px;margin-left: 50px;\" id=\"clip\" >\n" +
            "        <source src=\"\" type=\"video/mp4\">\n" +
            "        <source src=\"\" type=\"video/ogg\">\n" +
            "        Your browser does not support the video tag\n" +
            "    </video>\n" +
            "    <!--******************************************************************************************************************-->\n" +
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js\"></script>\n" +
            "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js\"></script>\n" +
            "\n" +
            "    <script>\n" +
            "        fileupload.onchange = function(){\n" +
            "            let clip = document.getElementById('clip');\n" +
            "            let reader = new FileReader();\n" +
            "            reader.onload = function (e) {\n" +
            "                clip.src = this.result;\n" +
            "                clip.controls = true;\n" +
            "                clip.play();\n" +
            "            };\n" +
            "            reader.readAsDataURL(this.files[0]);\n" +
            "            let filename = document.getElementById(\"fileupload\").files[0].name;\n" +
            "            document.getElementById('video_path').value = filename;//document.getElementById(\"fileupload\").name;\n" +
            "        };\n" +
            "\n" +
            "        imageupload.onchange = function(){\n" +
            "            let imagename = document.getElementById(\"imageupload\").files[0].name;\n" +
            "            document.getElementById('image_path').value = imagename;//document.getElementById(\"fileupload\").name;\n" +
            "        };\n" +
            "\n" +
            "        let $message,\n" +
            "            $progress,\n" +
            "            $btn;\n" +
            "\n" +
            "        function toggleUpload(status) {\n" +
            "            if (status)\n" +
            "                $btn.removeClass(\"disabled\");\n" +
            "            else\n" +
            "                $btn.addClass(\"disabled\");\n" +
            "        }\n" +
            "\n" +
            "        $(document).ready(function() {\n" +
            "            $('select').material_select();\n" +
            "            $progress = $('#progress');\n" +
            "            $btn = $('#btnUpload');\n" +
            "        });\n" +
            "\n" +
            "        function uploadVideo() {\n" +
            "            hideProgress();\n" +
            "            $message.html(\"Uploading video, please wait..\");\n" +
            "            let uploadVideo = new UploadVideo();\n" +
            "            uploadFile($('#file').get(0).files[0]);\n" +
            "        }\n" +
            "\n" +
            "        function hideProgress() {\n" +
            "            $progress.hide();\n" +
            "        }\n" +
            "\n" +
            "        function showProgress() {\n" +
            "            $message.html(\"\");\n" +
            "            $progress.show();\n" +
            "        }\n" +
            "\n" +
            "    </script>\n" +
            "\n" +
            "    <script>\n" +
            "        ! function(e) {\n" +
            "            \"use strict\";\n" +
            "\n" +
            "            function t(e) {\n" +
            "                return new RegExp(\"(^|\\\\s+)\" + e + \"(\\\\s+|$)\")\n" +
            "            }\n" +
            "\n" +
            "            function s(e, t) {\n" +
            "                var s = l(e, t) ? i : n;\n" +
            "                s(e, t)\n" +
            "            }\n" +
            "            var l, n, i;\n" +
            "            \"classList\" in document.documentElement ? (l = function(e, t) {\n" +
            "                return e.classList.contains(t)\n" +
            "            }, n = function(e, t) {\n" +
            "                e.classList.add(t)\n" +
            "            }, i = function(e, t) {\n" +
            "                e.classList.remove(t)\n" +
            "            }) : (l = function(e, s) {\n" +
            "                return t(s).test(e.className)\n" +
            "            }, n = function(e, t) {\n" +
            "                l(e, t) || (e.className = e.className + \" \" + t)\n" +
            "            }, i = function(e, s) {\n" +
            "                e.className = e.className.replace(t(s), \" \")\n" +
            "            });\n" +
            "            var c = {\n" +
            "                hasClass: l,\n" +
            "                addClass: n,\n" +
            "                removeClass: i,\n" +
            "                toggleClass: s,\n" +
            "                has: l,\n" +
            "                add: n,\n" +
            "                remove: i,\n" +
            "                toggle: s\n" +
            "            };\n" +
            "            \"function\" == typeof define && define.amd ? define(c) : e.classie = c\n" +
            "        }(window),\n" +
            "            function(e) {\n" +
            "                \"use strict\";\n" +
            "\n" +
            "                function t(e, t) {\n" +
            "                    if (!e) return !1;\n" +
            "                    for (var s = e.target || e.srcElement || e || !1; s && s != t;) s = s.parentNode || !1;\n" +
            "                    return s !== !1\n" +
            "                }\n" +
            "\n" +
            "                function s(e, t) {\n" +
            "                    for (var s in t) t.hasOwnProperty(s) && (e[s] = t[s]);\n" +
            "                    return e\n" +
            "                }\n" +
            "\n" +
            "                function l(e, t) {\n" +
            "                    this.el = e, this.options = s({}, this.options), s(this.options, t), this._init()\n" +
            "                }\n" +
            "                l.prototype.options = {\n" +
            "                    newTab: !0,\n" +
            "                    stickyPlaceholder: !0,\n" +
            "                    onChange: function() {\n" +
            "                        return !1\n" +
            "                    }\n" +
            "                }, l.prototype._init = function() {\n" +
            "                    var e = this.el.querySelector(\"option[selected]\");\n" +
            "                    this.hasDefaultPlaceholder = e && e.disabled, this.selectedOpt = e || this.el.querySelector(\"option\"), this._createSelectEl(), this.selOpts = [].slice.call(this.selEl.querySelectorAll(\"li[data-option]\")), this.selOptsCount = this.selOpts.length, this.current = this.selOpts.indexOf(this.selEl.querySelector(\"li.cs-selected\")) || -1, this.selPlaceholder = this.selEl.querySelector(\"span.cs-placeholder\"), this._initEvents()\n" +
            "                }, l.prototype._createSelectEl = function() {\n" +
            "                    var e = \"\",\n" +
            "                        t = function(e) {\n" +
            "                            var t = \"\",\n" +
            "                                s = \"\",\n" +
            "                                l = \"\";\n" +
            "                            return !e.selectedOpt || this.foundSelected || this.hasDefaultPlaceholder || (s += \"cs-selected \", this.foundSelected = !0), e.getAttribute(\"data-class\") && (s += e.getAttribute(\"data-class\")), e.getAttribute(\"data-link\") && (l = \"data-link=\" + e.getAttribute(\"data-link\")), \"\" !== s && (t = 'class=\"' + s + '\" '), \"<li \" + t + l + ' data-option data-value=\"' + e.value + '\"><span>' + e.textContent + \"</span></li>\"\n" +
            "                        };\n" +
            "                    [].slice.call(this.el.children).forEach(function(s) {\n" +
            "                        if (!s.disabled) {\n" +
            "                            var l = s.tagName.toLowerCase();\n" +
            "                            \"option\" === l ? e += t(s) : \"optgroup\" === l && (e += '<li class=\"cs-optgroup\"><span>' + s.label + \"</span><ul>\", [].slice.call(s.children).forEach(function(s) {\n" +
            "                                e += t(s)\n" +
            "                            }), e += \"</ul></li>\")\n" +
            "                        }\n" +
            "                    });\n" +
            "                    var s = '<div class=\"cs-options\"><ul>' + e + \"</ul></div>\";\n" +
            "                    this.selEl = document.createElement(\"div\"), this.selEl.className = this.el.className, this.selEl.tabIndex = this.el.tabIndex, this.selEl.innerHTML = '<span class=\"cs-placeholder\">' + this.selectedOpt.textContent + \"</span>\" + s, this.el.parentNode.appendChild(this.selEl), this.selEl.appendChild(this.el)\n" +
            "                }, l.prototype._initEvents = function() {\n" +
            "                    var e = this;\n" +
            "                    this.selPlaceholder.addEventListener(\"click\", function() {\n" +
            "                        e._toggleSelect()\n" +
            "                    }), this.selOpts.forEach(function(t, s) {\n" +
            "                        t.addEventListener(\"click\", function() {\n" +
            "                            e.current = s, e._changeOption(), e._toggleSelect()\n" +
            "                        })\n" +
            "                    }), document.addEventListener(\"click\", function(s) {\n" +
            "                        var l = s.target;\n" +
            "                        e._isOpen() && l !== e.selEl && !t(l, e.selEl) && e._toggleSelect()\n" +
            "                    }), this.selEl.addEventListener(\"keydown\", function(t) {\n" +
            "                        var s = t.keyCode || t.which;\n" +
            "                        switch (s) {\n" +
            "                            case 38:\n" +
            "                                t.preventDefault(), e._navigateOpts(\"prev\");\n" +
            "                                break;\n" +
            "                            case 40:\n" +
            "                                t.preventDefault(), e._navigateOpts(\"next\");\n" +
            "                                break;\n" +
            "                            case 32:\n" +
            "                                t.preventDefault(), e._isOpen() && \"undefined\" != typeof e.preSelCurrent && -1 !== e.preSelCurrent && e._changeOption(), e._toggleSelect();\n" +
            "                                break;\n" +
            "                            case 13:\n" +
            "                                t.preventDefault(), e._isOpen() && \"undefined\" != typeof e.preSelCurrent && -1 !== e.preSelCurrent && (e._changeOption(), e._toggleSelect());\n" +
            "                                break;\n" +
            "                            case 27:\n" +
            "                                t.preventDefault(), e._isOpen() && e._toggleSelect()\n" +
            "                        }\n" +
            "                    })\n" +
            "                }, l.prototype._navigateOpts = function(e) {\n" +
            "                    this._isOpen() || this._toggleSelect();\n" +
            "                    var t = \"undefined\" != typeof this.preSelCurrent && -1 !== this.preSelCurrent ? this.preSelCurrent : this.current;\n" +
            "                    (\"prev\" === e && t > 0 || \"next\" === e && t < this.selOptsCount - 1) && (this.preSelCurrent = \"next\" === e ? t + 1 : t - 1, this._removeFocus(), classie.add(this.selOpts[this.preSelCurrent], \"cs-focus\"))\n" +
            "                }, l.prototype._toggleSelect = function() {\n" +
            "                    this._removeFocus(), this._isOpen() ? (-1 !== this.current && (this.selPlaceholder.textContent = this.selOpts[this.current].textContent), classie.remove(this.selEl, \"cs-active\")) : (this.hasDefaultPlaceholder && this.options.stickyPlaceholder && (this.selPlaceholder.textContent = this.selectedOpt.textContent), classie.add(this.selEl, \"cs-active\"))\n" +
            "                }, l.prototype._changeOption = function() {\n" +
            "                    \"undefined\" != typeof this.preSelCurrent && -1 !== this.preSelCurrent && (this.current = this.preSelCurrent, this.preSelCurrent = -1);\n" +
            "                    var t = this.selOpts[this.current];\n" +
            "                    this.selPlaceholder.textContent = t.textContent, this.el.value = t.getAttribute(\"data-value\");\n" +
            "                    var s = this.selEl.querySelector(\"li.cs-selected\");\n" +
            "                    s && classie.remove(s, \"cs-selected\"), classie.add(t, \"cs-selected\"), t.getAttribute(\"data-link\") && (this.options.newTab ? e.open(t.getAttribute(\"data-link\"), \"_blank\") : e.location = t.getAttribute(\"data-link\")), this.options.onChange(this.el.value)\n" +
            "                }, l.prototype._isOpen = function() {\n" +
            "                    return classie.has(this.selEl, \"cs-active\")\n" +
            "                }, l.prototype._removeFocus = function() {\n" +
            "                    var e = this.selEl.querySelector(\"li.cs-focus\");\n" +
            "                    e && classie.remove(e, \"cs-focus\")\n" +
            "                }, e.SelectFx = l\n" +
            "            }(window),\n" +
            "            function() {\n" +
            "                [].slice.call(document.querySelectorAll(\"select.cs-select\")).forEach(function(e) {\n" +
            "                    new SelectFx(e)\n" +
            "                })\n" +
            "            }();\n" +
            "    </script>\n" +
            "    <!--*********************************************************************************************************************************-->\n" +
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
            "</body>\n" +
            "</html>";
        res.send(code);
    },
    WatchingRender : function (req,res) {
        let code = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>Watching</title>\n" +
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
            "        #home\n" +
            "        {\n" +
            "            font-size:45px;\n" +
            "            padding-right: 10px;\n" +
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
            "        .users{\n" +
            "            width: 1500px;\n" +
            "            height: 300px;\n" +
            "            background: #FFFFFF;\n" +
            "            -webkit-border-radius: 30px;\n" +
            "            -moz-border-radius: 30px;\n" +
            "            border-radius: 30px;\n" +
            "            float: left;\n" +
            "            margin: 20px;\n" +
            "        }\n" +
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
            "</head>\n" +
            "<body>\n" +
            "<span class=\"bckg\">\n" +
            "    <header>\n" +
            "    <a href=\"/writerpage\" id=\"home\">Dashboard</a>\n" +
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
            "</span>\n" +
            "<div class=\"main\">\n" +
            "    <div class=\"title\">\n" +
            "        <h2>Bạn đang theo dõi </h2>\n" +
            "        <a href=\"javascript:void(0);\">Hello nigga !</a>\n" +
            "    </div>\n" +
            "    <div class=\"rendered\">\n" +
            "        <div class=\"users\"></div>\n" +
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
        res.send(code);
    },
    WriterPageRender : function (req,res,email) {
        let code = "\n" +
            "\n" +
            "<!DOCTYPE html>\n" +
            "<html lang=\"en\"><head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>Welcome back</title>\n" +
            "    <link rel=\"stylesheet\" href=\"http://www.tinymce.com/css/codepen.min.css\"><link href=\"https://fonts.googleapis.com/css?family=Lato:300,400,700\" rel=\"stylesheet\" type=\"text/css\">\n" +
            "\n" +
            "    <link href=\"https://fonts.googleapis.com/css?family=Montserrat\" rel=\"stylesheet\" type=\"text/css\">\n" +
            "    <link rel=\"stylesheet\" href=\"https://s3.amazonaws.com/codecademy-content/projects/bootstrap.min.css\">\n" +
            "\n" +
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
            "        }\n" +
            "    </style>\n" +
            "    <style>\n" +
            "        #welcome {\n" +
            "            background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);\n" +
            "            overflow: hidden;\n" +
            "            margin-left: 50px;\n" +
            "            margin-top: -50px;\n" +
            "            height: 400px;\n" +
            "        }\n" +
            "\n" +
            "        #stars {\n" +
            "            width: 1px;\n" +
            "            height: 1px;\n" +
            "            background: transparent;\n" +
            "            box-shadow: 1419px 897px #FFF , 1011px 1491px #FFF , 527px 785px #FFF , 290px 1832px #FFF , 843px 1055px #FFF , 1767px 924px #FFF , 1142px 187px #FFF , 832px 793px #FFF , 1631px 210px #FFF , 1576px 985px #FFF , 730px 206px #FFF , 1862px 1102px #FFF , 938px 1883px #FFF , 573px 1222px #FFF , 1402px 618px #FFF , 1459px 693px #FFF , 1966px 480px #FFF , 621px 669px #FFF , 1933px 1457px #FFF , 1894px 78px #FFF , 83px 14px #FFF , 627px 636px #FFF , 1920px 77px #FFF , 430px 1356px #FFF , 595px 1734px #FFF , 484px 470px #FFF , 620px 1017px #FFF , 1009px 1241px #FFF , 1710px 448px #FFF , 1770px 1039px #FFF , 808px 1976px #FFF , 920px 1099px #FFF , 897px 1399px #FFF , 1181px 1508px #FFF , 129px 1622px #FFF , 1159px 794px #FFF , 1286px 127px #FFF , 801px 985px #FFF , 167px 785px #FFF , 1495px 1586px #FFF , 191px 606px #FFF , 56px 1080px #FFF , 51px 908px #FFF , 993px 766px #FFF , 826px 1286px #FFF , 1953px 1958px #FFF , 970px 1930px #FFF , 351px 1815px #FFF , 1065px 75px #FFF , 799px 1501px #FFF , 352px 37px #FFF , 1823px 135px #FFF , 1880px 21px #FFF , 1960px 187px #FFF , 837px 1439px #FFF , 1444px 815px #FFF , 1361px 651px #FFF , 479px 1340px #FFF , 138px 575px #FFF , 270px 1357px #FFF , 1131px 658px #FFF , 13px 104px #FFF , 1302px 198px #FFF , 829px 29px #FFF , 1964px 608px #FFF , 950px 445px #FFF , 987px 1520px #FFF , 1993px 1174px #FFF , 453px 360px #FFF , 93px 1588px #FFF , 917px 124px #FFF , 673px 971px #FFF , 648px 1958px #FFF , 982px 468px #FFF , 1990px 1377px #FFF , 1638px 1545px #FFF , 1011px 997px #FFF , 1319px 193px #FFF , 893px 214px #FFF , 1090px 567px #FFF , 431px 1046px #FFF , 1599px 229px #FFF , 65px 157px #FFF , 450px 1722px #FFF , 939px 1917px #FFF , 1785px 1726px #FFF , 418px 1384px #FFF , 1199px 1408px #FFF , 1089px 353px #FFF , 1407px 464px #FFF , 639px 1829px #FFF , 1902px 1669px #FFF , 461px 1331px #FFF , 1263px 319px #FFF , 1580px 921px #FFF , 1542px 1272px #FFF , 1942px 1792px #FFF , 366px 1964px #FFF , 1841px 1022px #FFF , 588px 231px #FFF , 1757px 611px #FFF , 54px 1969px #FFF , 1014px 833px #FFF , 432px 1347px #FFF , 181px 90px #FFF , 922px 1238px #FFF , 684px 584px #FFF , 1948px 1495px #FFF , 458px 479px #FFF , 1726px 790px #FFF , 1650px 496px #FFF , 1715px 1929px #FFF , 1721px 1345px #FFF , 729px 688px #FFF , 682px 986px #FFF , 850px 199px #FFF , 879px 1754px #FFF , 636px 8px #FFF , 611px 170px #FFF , 1px 593px #FFF , 325px 296px #FFF , 35px 597px #FFF , 1035px 853px #FFF , 1565px 263px #FFF , 586px 428px #FFF , 366px 1176px #FFF , 52px 1876px #FFF , 256px 1911px #FFF , 707px 86px #FFF , 177px 1278px #FFF , 371px 1196px #FFF , 452px 329px #FFF , 870px 339px #FFF , 1101px 1127px #FFF , 296px 1882px #FFF , 1301px 1825px #FFF , 1767px 194px #FFF , 452px 584px #FFF , 1195px 936px #FFF , 146px 1221px #FFF , 1398px 1225px #FFF , 1382px 220px #FFF , 1336px 700px #FFF , 935px 1444px #FFF , 781px 817px #FFF , 187px 1264px #FFF , 997px 439px #FFF , 587px 139px #FFF , 1824px 975px #FFF , 1475px 177px #FFF , 1275px 623px #FFF , 177px 1632px #FFF , 236px 749px #FFF , 1327px 1389px #FFF , 1832px 488px #FFF , 1846px 1685px #FFF , 856px 1257px #FFF , 1359px 1669px #FFF , 115px 102px #FFF , 49px 1419px #FFF , 689px 1136px #FFF , 460px 1737px #FFF , 821px 1031px #FFF , 446px 1192px #FFF , 666px 844px #FFF , 194px 1250px #FFF , 965px 1507px #FFF , 1388px 1301px #FFF , 1924px 1013px #FFF , 758px 1070px #FFF , 1886px 1346px #FFF , 99px 670px #FFF , 794px 499px #FFF , 122px 290px #FFF , 1003px 1841px #FFF , 54px 238px #FFF , 1708px 1533px #FFF , 667px 1973px #FFF , 19px 1170px #FFF , 433px 1897px #FFF , 1661px 806px #FFF , 807px 286px #FFF , 1788px 1022px #FFF , 1401px 296px #FFF , 582px 1184px #FFF , 1194px 1619px #FFF , 716px 48px #FFF , 1065px 761px #FFF , 959px 427px #FFF , 1920px 162px #FFF , 1198px 1111px #FFF , 974px 1px #FFF , 1885px 1721px #FFF , 418px 104px #FFF , 1956px 1486px #FFF , 265px 408px #FFF , 913px 941px #FFF , 1160px 1553px #FFF , 94px 1037px #FFF , 1106px 757px #FFF , 373px 1073px #FFF , 903px 1004px #FFF , 807px 516px #FFF , 395px 1559px #FFF , 704px 1421px #FFF , 1341px 1047px #FFF , 1927px 1738px #FFF , 1531px 509px #FFF , 909px 1037px #FFF , 96px 1364px #FFF , 450px 800px #FFF , 319px 479px #FFF , 398px 1027px #FFF , 667px 1974px #FFF , 639px 703px #FFF , 707px 185px #FFF , 1625px 568px #FFF , 642px 1289px #FFF , 344px 158px #FFF , 1402px 1741px #FFF , 938px 1218px #FFF , 273px 1511px #FFF , 107px 1692px #FFF , 1619px 1379px #FFF , 405px 398px #FFF , 190px 901px #FFF , 1283px 1620px #FFF , 1966px 11px #FFF , 1163px 874px #FFF , 42px 1377px #FFF , 404px 687px #FFF , 631px 1014px #FFF , 92px 1341px #FFF , 1399px 1093px #FFF , 1609px 849px #FFF , 100px 1385px #FFF , 594px 86px #FFF , 581px 958px #FFF , 577px 55px #FFF , 1991px 516px #FFF , 1060px 1516px #FFF , 1110px 112px #FFF , 1670px 1739px #FFF , 1467px 209px #FFF , 861px 1809px #FFF , 665px 1952px #FFF , 1479px 432px #FFF , 370px 789px #FFF , 1793px 1805px #FFF , 594px 17px #FFF , 1819px 1149px #FFF , 1198px 1309px #FFF , 1330px 1555px #FFF , 1804px 1833px #FFF , 959px 1027px #FFF , 154px 591px #FFF , 1545px 384px #FFF , 1830px 281px #FFF , 1364px 115px #FFF , 800px 831px #FFF , 927px 63px #FFF , 1105px 1524px #FFF , 380px 275px #FFF , 637px 412px #FFF , 78px 794px #FFF , 173px 541px #FFF , 1903px 854px #FFF , 1622px 534px #FFF , 1835px 1718px #FFF , 1988px 301px #FFF , 667px 397px #FFF , 1603px 1861px #FFF , 1987px 232px #FFF , 726px 1653px #FFF , 1824px 495px #FFF , 1352px 301px #FFF , 276px 95px #FFF , 1564px 1454px #FFF , 921px 904px #FFF , 830px 553px #FFF , 183px 1908px #FFF , 1350px 1226px #FFF , 370px 16px #FFF , 1915px 990px #FFF , 1969px 974px #FFF , 215px 492px #FFF , 1829px 234px #FFF , 1724px 1426px #FFF , 61px 1124px #FFF , 1219px 106px #FFF , 692px 813px #FFF , 955px 1082px #FFF , 53px 907px #FFF , 1693px 1078px #FFF , 621px 860px #FFF , 251px 1709px #FFF , 86px 1678px #FFF , 1440px 333px #FFF , 48px 77px #FFF , 169px 220px #FFF , 1955px 1133px #FFF , 1529px 421px #FFF , 39px 730px #FFF , 1015px 1684px #FFF , 1480px 122px #FFF , 1258px 534px #FFF , 1830px 1463px #FFF , 1792px 1677px #FFF , 997px 10px #FFF , 1263px 1233px #FFF , 777px 1570px #FFF , 1628px 1558px #FFF , 560px 1636px #FFF , 764px 1849px #FFF , 1656px 1568px #FFF , 597px 1484px #FFF , 367px 911px #FFF , 264px 59px #FFF , 547px 1852px #FFF , 307px 1557px #FFF , 714px 1361px #FFF , 1040px 1239px #FFF , 1043px 491px #FFF , 1751px 1662px #FFF , 1660px 1472px #FFF , 543px 850px #FFF , 719px 618px #FFF , 921px 6px #FFF , 1443px 1837px #FFF , 1545px 1620px #FFF , 1107px 966px #FFF , 1927px 1214px #FFF , 1006px 1028px #FFF , 833px 1858px #FFF , 501px 650px #FFF , 648px 66px #FFF , 1818px 625px #FFF , 1095px 1474px #FFF , 1542px 1644px #FFF , 616px 1977px #FFF , 1850px 1996px #FFF , 85px 1802px #FFF , 1503px 829px #FFF , 344px 1941px #FFF , 807px 1592px #FFF , 635px 1278px #FFF , 583px 1566px #FFF , 675px 1387px #FFF , 942px 552px #FFF , 1466px 1894px #FFF , 702px 665px #FFF , 1396px 1836px #FFF , 1261px 1814px #FFF , 1836px 640px #FFF , 1931px 24px #FFF , 1293px 1852px #FFF , 190px 1122px #FFF , 24px 1117px #FFF , 261px 1808px #FFF , 64px 795px #FFF , 729px 1633px #FFF , 1676px 1887px #FFF , 674px 32px #FFF , 1543px 492px #FFF , 1268px 216px #FFF , 44px 902px #FFF , 174px 1019px #FFF , 14px 803px #FFF , 1638px 1168px #FFF , 646px 1932px #FFF , 1601px 1010px #FFF , 1426px 399px #FFF , 274px 1924px #FFF , 1019px 442px #FFF , 1587px 1700px #FFF , 1436px 397px #FFF , 42px 56px #FFF , 1616px 645px #FFF , 1670px 104px #FFF , 11px 473px #FFF , 99px 121px #FFF , 1833px 885px #FFF , 1795px 1644px #FFF , 51px 649px #FFF , 624px 187px #FFF , 1584px 315px #FFF , 834px 780px #FFF , 1597px 513px #FFF , 720px 65px #FFF , 1488px 1311px #FFF , 1854px 944px #FFF , 2000px 1827px #FFF , 1974px 1157px #FFF , 430px 511px #FFF , 1653px 447px #FFF , 110px 1075px #FFF , 1968px 1674px #FFF , 194px 130px #FFF , 550px 904px #FFF , 729px 1673px #FFF , 1383px 929px #FFF , 1204px 368px #FFF , 876px 401px #FFF , 227px 1578px #FFF , 1903px 761px #FFF , 599px 1521px #FFF , 258px 191px #FFF , 1046px 1343px #FFF , 771px 246px #FFF , 971px 939px #FFF , 1400px 761px #FFF , 643px 58px #FFF , 1670px 64px #FFF , 1270px 1354px #FFF , 515px 1431px #FFF , 1629px 798px #FFF , 1172px 2000px #FFF , 244px 1003px #FFF , 159px 839px #FFF , 529px 509px #FFF , 673px 317px #FFF , 1794px 1487px #FFF , 1359px 1246px #FFF , 1803px 1548px #FFF , 1779px 798px #FFF , 716px 1830px #FFF , 1205px 1832px #FFF , 180px 645px #FFF , 1933px 1547px #FFF , 416px 1208px #FFF , 1503px 959px #FFF , 639px 906px #FFF , 76px 1757px #FFF , 863px 830px #FFF , 928px 818px #FFF , 1455px 1670px #FFF , 1622px 1412px #FFF , 1552px 1072px #FFF , 1952px 1289px #FFF , 934px 378px #FFF , 233px 1241px #FFF , 1537px 40px #FFF , 361px 1082px #FFF , 1479px 888px #FFF , 1041px 536px #FFF , 1209px 1558px #FFF , 591px 1724px #FFF , 1060px 966px #FFF , 869px 1818px #FFF , 498px 77px #FFF , 801px 91px #FFF , 1089px 1090px #FFF , 1566px 873px #FFF , 18px 508px #FFF , 1354px 503px #FFF , 1703px 1869px #FFF , 9px 1164px #FFF , 1486px 1517px #FFF , 1859px 1365px #FFF , 1903px 430px #FFF , 721px 421px #FFF , 1422px 1573px #FFF , 1353px 880px #FFF , 1248px 1659px #FFF , 1346px 1500px #FFF , 1784px 1283px #FFF , 435px 1608px #FFF , 944px 389px #FFF , 1987px 615px #FFF , 1120px 408px #FFF , 658px 1941px #FFF , 93px 229px #FFF , 1373px 1696px #FFF , 195px 1785px #FFF , 571px 1984px #FFF , 1225px 337px #FFF , 122px 324px #FFF , 1628px 1132px #FFF , 805px 281px #FFF , 389px 233px #FFF , 722px 546px #FFF , 1858px 1591px #FFF , 557px 129px #FFF , 1212px 296px #FFF , 1132px 1235px #FFF , 773px 513px #FFF , 838px 1720px #FFF , 1367px 721px #FFF , 1703px 1520px #FFF , 234px 1374px #FFF , 1692px 368px #FFF , 687px 1690px #FFF , 904px 237px #FFF , 655px 723px #FFF , 155px 1923px #FFF , 585px 1377px #FFF , 1394px 385px #FFF , 549px 971px #FFF , 1712px 179px #FFF , 428px 1372px #FFF , 1387px 1687px #FFF , 1766px 551px #FFF , 1792px 1442px #FFF , 1224px 1690px #FFF , 1041px 306px #FFF , 243px 1365px #FFF , 88px 1992px #FFF , 1149px 1468px #FFF , 1433px 1182px #FFF , 1225px 157px #FFF , 661px 1770px #FFF , 332px 859px #FFF , 1487px 1984px #FFF , 490px 422px #FFF , 149px 1962px #FFF , 1044px 40px #FFF , 781px 430px #FFF , 1422px 633px #FFF , 1175px 423px #FFF , 1134px 979px #FFF , 431px 1576px #FFF , 256px 1133px #FFF , 1672px 441px #FFF , 606px 589px #FFF , 1343px 971px #FFF , 1234px 172px #FFF , 1490px 1002px #FFF , 803px 1271px #FFF , 1136px 1255px #FFF , 175px 1859px #FFF , 203px 1632px #FFF , 1018px 868px #FFF , 1404px 1600px #FFF , 918px 772px #FFF , 432px 778px #FFF , 608px 520px #FFF , 338px 290px #FFF , 1579px 408px #FFF , 1459px 119px #FFF , 1925px 854px #FFF , 1762px 1418px #FFF , 750px 1766px #FFF , 1109px 472px #FFF , 1021px 480px #FFF , 173px 103px #FFF , 301px 1658px #FFF , 816px 1631px #FFF , 1000px 1108px #FFF , 601px 1975px #FFF , 204px 1117px #FFF , 1396px 453px #FFF , 1121px 257px #FFF , 1407px 1296px #FFF , 146px 766px #FFF , 1551px 1053px #FFF , 56px 1646px #FFF , 1071px 669px #FFF , 280px 523px #FFF , 27px 534px #FFF , 1270px 1987px #FFF , 1810px 1311px #FFF , 832px 246px #FFF , 526px 1217px #FFF , 17px 240px #FFF , 1384px 444px #FFF , 1415px 960px #FFF , 1142px 906px #FFF , 75px 892px #FFF , 776px 1136px #FFF , 583px 1644px #FFF , 404px 453px #FFF , 1720px 1458px #FFF , 1092px 1970px #FFF , 1751px 1461px #FFF , 1036px 386px #FFF , 134px 718px #FFF , 1267px 980px #FFF , 574px 487px #FFF , 889px 1113px #FFF , 669px 419px #FFF , 72px 1061px #FFF , 1969px 1214px #FFF , 1090px 1470px #FFF , 1399px 1866px #FFF , 537px 1732px #FFF , 996px 1176px #FFF , 1993px 910px #FFF , 545px 1010px #FFF , 1430px 1506px #FFF , 1857px 1956px #FFF , 49px 1522px #FFF , 334px 687px #FFF , 988px 941px #FFF , 425px 16px #FFF , 298px 1244px #FFF , 1211px 1548px #FFF , 1100px 303px #FFF , 886px 1632px #FFF , 721px 1580px #FFF , 1794px 962px #FFF , 1309px 1091px #FFF , 1962px 1362px #FFF , 1841px 1257px #FFF , 56px 1738px #FFF , 1731px 1421px #FFF , 913px 719px #FFF , 877px 1626px #FFF , 639px 534px #FFF , 1010px 932px #FFF , 79px 1941px #FFF , 1010px 1093px #FFF , 171px 117px #FFF , 246px 258px #FFF , 703px 1983px #FFF , 631px 620px #FFF , 921px 1923px #FFF , 1033px 725px #FFF , 1631px 1596px #FFF , 286px 649px #FFF , 175px 635px #FFF , 1099px 1579px #FFF , 1135px 1910px #FFF , 812px 1918px #FFF , 914px 1003px #FFF , 1117px 905px #FFF , 882px 237px #FFF , 1908px 724px #FFF , 641px 1718px #FFF , 267px 522px #FFF , 308px 1718px #FFF , 57px 1447px #FFF , 1591px 1490px #FFF , 959px 497px #FFF , 993px 275px #FFF , 1181px 1855px #FFF , 10px 326px #FFF , 39px 460px #FFF , 643px 929px #FFF , 814px 1395px #FFF , 1843px 1598px #FFF , 1576px 463px #FFF , 827px 227px #FFF , 1461px 162px #FFF , 733px 1076px #FFF , 495px 1453px #FFF , 1082px 344px #FFF , 1967px 946px #FFF , 1720px 776px #FFF , 45px 680px #FFF , 90px 1794px #FFF , 1449px 1448px #FFF , 371px 281px #FFF , 1866px 435px #FFF , 1717px 34px #FFF , 1694px 566px #FFF , 318px 1219px #FFF , 1982px 1794px #FFF , 1104px 37px #FFF , 1124px 1104px #FFF , 1799px 1051px #FFF , 1395px 1957px #FFF , 1363px 1508px #FFF , 667px 1614px #FFF , 1644px 1573px #FFF , 676px 1522px #FFF , 1478px 1663px #FFF , 1818px 625px #FFF , 1011px 1571px #FFF , 1094px 64px #FFF , 1724px 910px #FFF , 1598px 32px #FFF , 1120px 1957px #FFF , 1537px 1956px #FFF , 1122px 58px #FFF , 151px 212px #FFF , 1509px 1405px #FFF , 846px 338px #FFF , 305px 324px #FFF , 202px 1934px #FFF , 1532px 1428px #FFF , 1395px 1657px #FFF , 569px 1169px #FFF , 1856px 1096px #FFF , 876px 1286px #FFF , 224px 1943px #FFF , 1719px 1075px #FFF , 744px 1983px #FFF , 957px 1236px #FFF , 1937px 832px #FFF , 1456px 1424px #FFF , 72px 746px #FFF , 1914px 1527px #FFF , 831px 1215px #FFF , 685px 240px #FFF , 1234px 136px #FFF , 1912px 1663px #FFF , 971px 943px #FFF , 1899px 1650px #FFF , 1670px 165px #FFF , 19px 917px #FFF;\n" +
            "            animation: animStar 50s linear infinite;\n" +
            "        }\n" +
            "        #stars:after {\n" +
            "            content: \" \";\n" +
            "            position: absolute;\n" +
            "            top: 2000px;\n" +
            "            width: 1px;\n" +
            "            height: 1px;\n" +
            "            background: transparent;\n" +
            "            box-shadow: 1419px 897px #FFF , 1011px 1491px #FFF , 527px 785px #FFF , 290px 1832px #FFF , 843px 1055px #FFF , 1767px 924px #FFF , 1142px 187px #FFF , 832px 793px #FFF , 1631px 210px #FFF , 1576px 985px #FFF , 730px 206px #FFF , 1862px 1102px #FFF , 938px 1883px #FFF , 573px 1222px #FFF , 1402px 618px #FFF , 1459px 693px #FFF , 1966px 480px #FFF , 621px 669px #FFF , 1933px 1457px #FFF , 1894px 78px #FFF , 83px 14px #FFF , 627px 636px #FFF , 1920px 77px #FFF , 430px 1356px #FFF , 595px 1734px #FFF , 484px 470px #FFF , 620px 1017px #FFF , 1009px 1241px #FFF , 1710px 448px #FFF , 1770px 1039px #FFF , 808px 1976px #FFF , 920px 1099px #FFF , 897px 1399px #FFF , 1181px 1508px #FFF , 129px 1622px #FFF , 1159px 794px #FFF , 1286px 127px #FFF , 801px 985px #FFF , 167px 785px #FFF , 1495px 1586px #FFF , 191px 606px #FFF , 56px 1080px #FFF , 51px 908px #FFF , 993px 766px #FFF , 826px 1286px #FFF , 1953px 1958px #FFF , 970px 1930px #FFF , 351px 1815px #FFF , 1065px 75px #FFF , 799px 1501px #FFF , 352px 37px #FFF , 1823px 135px #FFF , 1880px 21px #FFF , 1960px 187px #FFF , 837px 1439px #FFF , 1444px 815px #FFF , 1361px 651px #FFF , 479px 1340px #FFF , 138px 575px #FFF , 270px 1357px #FFF , 1131px 658px #FFF , 13px 104px #FFF , 1302px 198px #FFF , 829px 29px #FFF , 1964px 608px #FFF , 950px 445px #FFF , 987px 1520px #FFF , 1993px 1174px #FFF , 453px 360px #FFF , 93px 1588px #FFF , 917px 124px #FFF , 673px 971px #FFF , 648px 1958px #FFF , 982px 468px #FFF , 1990px 1377px #FFF , 1638px 1545px #FFF , 1011px 997px #FFF , 1319px 193px #FFF , 893px 214px #FFF , 1090px 567px #FFF , 431px 1046px #FFF , 1599px 229px #FFF , 65px 157px #FFF , 450px 1722px #FFF , 939px 1917px #FFF , 1785px 1726px #FFF , 418px 1384px #FFF , 1199px 1408px #FFF , 1089px 353px #FFF , 1407px 464px #FFF , 639px 1829px #FFF , 1902px 1669px #FFF , 461px 1331px #FFF , 1263px 319px #FFF , 1580px 921px #FFF , 1542px 1272px #FFF , 1942px 1792px #FFF , 366px 1964px #FFF , 1841px 1022px #FFF , 588px 231px #FFF , 1757px 611px #FFF , 54px 1969px #FFF , 1014px 833px #FFF , 432px 1347px #FFF , 181px 90px #FFF , 922px 1238px #FFF , 684px 584px #FFF , 1948px 1495px #FFF , 458px 479px #FFF , 1726px 790px #FFF , 1650px 496px #FFF , 1715px 1929px #FFF , 1721px 1345px #FFF , 729px 688px #FFF , 682px 986px #FFF , 850px 199px #FFF , 879px 1754px #FFF , 636px 8px #FFF , 611px 170px #FFF , 1px 593px #FFF , 325px 296px #FFF , 35px 597px #FFF , 1035px 853px #FFF , 1565px 263px #FFF , 586px 428px #FFF , 366px 1176px #FFF , 52px 1876px #FFF , 256px 1911px #FFF , 707px 86px #FFF , 177px 1278px #FFF , 371px 1196px #FFF , 452px 329px #FFF , 870px 339px #FFF , 1101px 1127px #FFF , 296px 1882px #FFF , 1301px 1825px #FFF , 1767px 194px #FFF , 452px 584px #FFF , 1195px 936px #FFF , 146px 1221px #FFF , 1398px 1225px #FFF , 1382px 220px #FFF , 1336px 700px #FFF , 935px 1444px #FFF , 781px 817px #FFF , 187px 1264px #FFF , 997px 439px #FFF , 587px 139px #FFF , 1824px 975px #FFF , 1475px 177px #FFF , 1275px 623px #FFF , 177px 1632px #FFF , 236px 749px #FFF , 1327px 1389px #FFF , 1832px 488px #FFF , 1846px 1685px #FFF , 856px 1257px #FFF , 1359px 1669px #FFF , 115px 102px #FFF , 49px 1419px #FFF , 689px 1136px #FFF , 460px 1737px #FFF , 821px 1031px #FFF , 446px 1192px #FFF , 666px 844px #FFF , 194px 1250px #FFF , 965px 1507px #FFF , 1388px 1301px #FFF , 1924px 1013px #FFF , 758px 1070px #FFF , 1886px 1346px #FFF , 99px 670px #FFF , 794px 499px #FFF , 122px 290px #FFF , 1003px 1841px #FFF , 54px 238px #FFF , 1708px 1533px #FFF , 667px 1973px #FFF , 19px 1170px #FFF , 433px 1897px #FFF , 1661px 806px #FFF , 807px 286px #FFF , 1788px 1022px #FFF , 1401px 296px #FFF , 582px 1184px #FFF , 1194px 1619px #FFF , 716px 48px #FFF , 1065px 761px #FFF , 959px 427px #FFF , 1920px 162px #FFF , 1198px 1111px #FFF , 974px 1px #FFF , 1885px 1721px #FFF , 418px 104px #FFF , 1956px 1486px #FFF , 265px 408px #FFF , 913px 941px #FFF , 1160px 1553px #FFF , 94px 1037px #FFF , 1106px 757px #FFF , 373px 1073px #FFF , 903px 1004px #FFF , 807px 516px #FFF , 395px 1559px #FFF , 704px 1421px #FFF , 1341px 1047px #FFF , 1927px 1738px #FFF , 1531px 509px #FFF , 909px 1037px #FFF , 96px 1364px #FFF , 450px 800px #FFF , 319px 479px #FFF , 398px 1027px #FFF , 667px 1974px #FFF , 639px 703px #FFF , 707px 185px #FFF , 1625px 568px #FFF , 642px 1289px #FFF , 344px 158px #FFF , 1402px 1741px #FFF , 938px 1218px #FFF , 273px 1511px #FFF , 107px 1692px #FFF , 1619px 1379px #FFF , 405px 398px #FFF , 190px 901px #FFF , 1283px 1620px #FFF , 1966px 11px #FFF , 1163px 874px #FFF , 42px 1377px #FFF , 404px 687px #FFF , 631px 1014px #FFF , 92px 1341px #FFF , 1399px 1093px #FFF , 1609px 849px #FFF , 100px 1385px #FFF , 594px 86px #FFF , 581px 958px #FFF , 577px 55px #FFF , 1991px 516px #FFF , 1060px 1516px #FFF , 1110px 112px #FFF , 1670px 1739px #FFF , 1467px 209px #FFF , 861px 1809px #FFF , 665px 1952px #FFF , 1479px 432px #FFF , 370px 789px #FFF , 1793px 1805px #FFF , 594px 17px #FFF , 1819px 1149px #FFF , 1198px 1309px #FFF , 1330px 1555px #FFF , 1804px 1833px #FFF , 959px 1027px #FFF , 154px 591px #FFF , 1545px 384px #FFF , 1830px 281px #FFF , 1364px 115px #FFF , 800px 831px #FFF , 927px 63px #FFF , 1105px 1524px #FFF , 380px 275px #FFF , 637px 412px #FFF , 78px 794px #FFF , 173px 541px #FFF , 1903px 854px #FFF , 1622px 534px #FFF , 1835px 1718px #FFF , 1988px 301px #FFF , 667px 397px #FFF , 1603px 1861px #FFF , 1987px 232px #FFF , 726px 1653px #FFF , 1824px 495px #FFF , 1352px 301px #FFF , 276px 95px #FFF , 1564px 1454px #FFF , 921px 904px #FFF , 830px 553px #FFF , 183px 1908px #FFF , 1350px 1226px #FFF , 370px 16px #FFF , 1915px 990px #FFF , 1969px 974px #FFF , 215px 492px #FFF , 1829px 234px #FFF , 1724px 1426px #FFF , 61px 1124px #FFF , 1219px 106px #FFF , 692px 813px #FFF , 955px 1082px #FFF , 53px 907px #FFF , 1693px 1078px #FFF , 621px 860px #FFF , 251px 1709px #FFF , 86px 1678px #FFF , 1440px 333px #FFF , 48px 77px #FFF , 169px 220px #FFF , 1955px 1133px #FFF , 1529px 421px #FFF , 39px 730px #FFF , 1015px 1684px #FFF , 1480px 122px #FFF , 1258px 534px #FFF , 1830px 1463px #FFF , 1792px 1677px #FFF , 997px 10px #FFF , 1263px 1233px #FFF , 777px 1570px #FFF , 1628px 1558px #FFF , 560px 1636px #FFF , 764px 1849px #FFF , 1656px 1568px #FFF , 597px 1484px #FFF , 367px 911px #FFF , 264px 59px #FFF , 547px 1852px #FFF , 307px 1557px #FFF , 714px 1361px #FFF , 1040px 1239px #FFF , 1043px 491px #FFF , 1751px 1662px #FFF , 1660px 1472px #FFF , 543px 850px #FFF , 719px 618px #FFF , 921px 6px #FFF , 1443px 1837px #FFF , 1545px 1620px #FFF , 1107px 966px #FFF , 1927px 1214px #FFF , 1006px 1028px #FFF , 833px 1858px #FFF , 501px 650px #FFF , 648px 66px #FFF , 1818px 625px #FFF , 1095px 1474px #FFF , 1542px 1644px #FFF , 616px 1977px #FFF , 1850px 1996px #FFF , 85px 1802px #FFF , 1503px 829px #FFF , 344px 1941px #FFF , 807px 1592px #FFF , 635px 1278px #FFF , 583px 1566px #FFF , 675px 1387px #FFF , 942px 552px #FFF , 1466px 1894px #FFF , 702px 665px #FFF , 1396px 1836px #FFF , 1261px 1814px #FFF , 1836px 640px #FFF , 1931px 24px #FFF , 1293px 1852px #FFF , 190px 1122px #FFF , 24px 1117px #FFF , 261px 1808px #FFF , 64px 795px #FFF , 729px 1633px #FFF , 1676px 1887px #FFF , 674px 32px #FFF , 1543px 492px #FFF , 1268px 216px #FFF , 44px 902px #FFF , 174px 1019px #FFF , 14px 803px #FFF , 1638px 1168px #FFF , 646px 1932px #FFF , 1601px 1010px #FFF , 1426px 399px #FFF , 274px 1924px #FFF , 1019px 442px #FFF , 1587px 1700px #FFF , 1436px 397px #FFF , 42px 56px #FFF , 1616px 645px #FFF , 1670px 104px #FFF , 11px 473px #FFF , 99px 121px #FFF , 1833px 885px #FFF , 1795px 1644px #FFF , 51px 649px #FFF , 624px 187px #FFF , 1584px 315px #FFF , 834px 780px #FFF , 1597px 513px #FFF , 720px 65px #FFF , 1488px 1311px #FFF , 1854px 944px #FFF , 2000px 1827px #FFF , 1974px 1157px #FFF , 430px 511px #FFF , 1653px 447px #FFF , 110px 1075px #FFF , 1968px 1674px #FFF , 194px 130px #FFF , 550px 904px #FFF , 729px 1673px #FFF , 1383px 929px #FFF , 1204px 368px #FFF , 876px 401px #FFF , 227px 1578px #FFF , 1903px 761px #FFF , 599px 1521px #FFF , 258px 191px #FFF , 1046px 1343px #FFF , 771px 246px #FFF , 971px 939px #FFF , 1400px 761px #FFF , 643px 58px #FFF , 1670px 64px #FFF , 1270px 1354px #FFF , 515px 1431px #FFF , 1629px 798px #FFF , 1172px 2000px #FFF , 244px 1003px #FFF , 159px 839px #FFF , 529px 509px #FFF , 673px 317px #FFF , 1794px 1487px #FFF , 1359px 1246px #FFF , 1803px 1548px #FFF , 1779px 798px #FFF , 716px 1830px #FFF , 1205px 1832px #FFF , 180px 645px #FFF , 1933px 1547px #FFF , 416px 1208px #FFF , 1503px 959px #FFF , 639px 906px #FFF , 76px 1757px #FFF , 863px 830px #FFF , 928px 818px #FFF , 1455px 1670px #FFF , 1622px 1412px #FFF , 1552px 1072px #FFF , 1952px 1289px #FFF , 934px 378px #FFF , 233px 1241px #FFF , 1537px 40px #FFF , 361px 1082px #FFF , 1479px 888px #FFF , 1041px 536px #FFF , 1209px 1558px #FFF , 591px 1724px #FFF , 1060px 966px #FFF , 869px 1818px #FFF , 498px 77px #FFF , 801px 91px #FFF , 1089px 1090px #FFF , 1566px 873px #FFF , 18px 508px #FFF , 1354px 503px #FFF , 1703px 1869px #FFF , 9px 1164px #FFF , 1486px 1517px #FFF , 1859px 1365px #FFF , 1903px 430px #FFF , 721px 421px #FFF , 1422px 1573px #FFF , 1353px 880px #FFF , 1248px 1659px #FFF , 1346px 1500px #FFF , 1784px 1283px #FFF , 435px 1608px #FFF , 944px 389px #FFF , 1987px 615px #FFF , 1120px 408px #FFF , 658px 1941px #FFF , 93px 229px #FFF , 1373px 1696px #FFF , 195px 1785px #FFF , 571px 1984px #FFF , 1225px 337px #FFF , 122px 324px #FFF , 1628px 1132px #FFF , 805px 281px #FFF , 389px 233px #FFF , 722px 546px #FFF , 1858px 1591px #FFF , 557px 129px #FFF , 1212px 296px #FFF , 1132px 1235px #FFF , 773px 513px #FFF , 838px 1720px #FFF , 1367px 721px #FFF , 1703px 1520px #FFF , 234px 1374px #FFF , 1692px 368px #FFF , 687px 1690px #FFF , 904px 237px #FFF , 655px 723px #FFF , 155px 1923px #FFF , 585px 1377px #FFF , 1394px 385px #FFF , 549px 971px #FFF , 1712px 179px #FFF , 428px 1372px #FFF , 1387px 1687px #FFF , 1766px 551px #FFF , 1792px 1442px #FFF , 1224px 1690px #FFF , 1041px 306px #FFF , 243px 1365px #FFF , 88px 1992px #FFF , 1149px 1468px #FFF , 1433px 1182px #FFF , 1225px 157px #FFF , 661px 1770px #FFF , 332px 859px #FFF , 1487px 1984px #FFF , 490px 422px #FFF , 149px 1962px #FFF , 1044px 40px #FFF , 781px 430px #FFF , 1422px 633px #FFF , 1175px 423px #FFF , 1134px 979px #FFF , 431px 1576px #FFF , 256px 1133px #FFF , 1672px 441px #FFF , 606px 589px #FFF , 1343px 971px #FFF , 1234px 172px #FFF , 1490px 1002px #FFF , 803px 1271px #FFF , 1136px 1255px #FFF , 175px 1859px #FFF , 203px 1632px #FFF , 1018px 868px #FFF , 1404px 1600px #FFF , 918px 772px #FFF , 432px 778px #FFF , 608px 520px #FFF , 338px 290px #FFF , 1579px 408px #FFF , 1459px 119px #FFF , 1925px 854px #FFF , 1762px 1418px #FFF , 750px 1766px #FFF , 1109px 472px #FFF , 1021px 480px #FFF , 173px 103px #FFF , 301px 1658px #FFF , 816px 1631px #FFF , 1000px 1108px #FFF , 601px 1975px #FFF , 204px 1117px #FFF , 1396px 453px #FFF , 1121px 257px #FFF , 1407px 1296px #FFF , 146px 766px #FFF , 1551px 1053px #FFF , 56px 1646px #FFF , 1071px 669px #FFF , 280px 523px #FFF , 27px 534px #FFF , 1270px 1987px #FFF , 1810px 1311px #FFF , 832px 246px #FFF , 526px 1217px #FFF , 17px 240px #FFF , 1384px 444px #FFF , 1415px 960px #FFF , 1142px 906px #FFF , 75px 892px #FFF , 776px 1136px #FFF , 583px 1644px #FFF , 404px 453px #FFF , 1720px 1458px #FFF , 1092px 1970px #FFF , 1751px 1461px #FFF , 1036px 386px #FFF , 134px 718px #FFF , 1267px 980px #FFF , 574px 487px #FFF , 889px 1113px #FFF , 669px 419px #FFF , 72px 1061px #FFF , 1969px 1214px #FFF , 1090px 1470px #FFF , 1399px 1866px #FFF , 537px 1732px #FFF , 996px 1176px #FFF , 1993px 910px #FFF , 545px 1010px #FFF , 1430px 1506px #FFF , 1857px 1956px #FFF , 49px 1522px #FFF , 334px 687px #FFF , 988px 941px #FFF , 425px 16px #FFF , 298px 1244px #FFF , 1211px 1548px #FFF , 1100px 303px #FFF , 886px 1632px #FFF , 721px 1580px #FFF , 1794px 962px #FFF , 1309px 1091px #FFF , 1962px 1362px #FFF , 1841px 1257px #FFF , 56px 1738px #FFF , 1731px 1421px #FFF , 913px 719px #FFF , 877px 1626px #FFF , 639px 534px #FFF , 1010px 932px #FFF , 79px 1941px #FFF , 1010px 1093px #FFF , 171px 117px #FFF , 246px 258px #FFF , 703px 1983px #FFF , 631px 620px #FFF , 921px 1923px #FFF , 1033px 725px #FFF , 1631px 1596px #FFF , 286px 649px #FFF , 175px 635px #FFF , 1099px 1579px #FFF , 1135px 1910px #FFF , 812px 1918px #FFF , 914px 1003px #FFF , 1117px 905px #FFF , 882px 237px #FFF , 1908px 724px #FFF , 641px 1718px #FFF , 267px 522px #FFF , 308px 1718px #FFF , 57px 1447px #FFF , 1591px 1490px #FFF , 959px 497px #FFF , 993px 275px #FFF , 1181px 1855px #FFF , 10px 326px #FFF , 39px 460px #FFF , 643px 929px #FFF , 814px 1395px #FFF , 1843px 1598px #FFF , 1576px 463px #FFF , 827px 227px #FFF , 1461px 162px #FFF , 733px 1076px #FFF , 495px 1453px #FFF , 1082px 344px #FFF , 1967px 946px #FFF , 1720px 776px #FFF , 45px 680px #FFF , 90px 1794px #FFF , 1449px 1448px #FFF , 371px 281px #FFF , 1866px 435px #FFF , 1717px 34px #FFF , 1694px 566px #FFF , 318px 1219px #FFF , 1982px 1794px #FFF , 1104px 37px #FFF , 1124px 1104px #FFF , 1799px 1051px #FFF , 1395px 1957px #FFF , 1363px 1508px #FFF , 667px 1614px #FFF , 1644px 1573px #FFF , 676px 1522px #FFF , 1478px 1663px #FFF , 1818px 625px #FFF , 1011px 1571px #FFF , 1094px 64px #FFF , 1724px 910px #FFF , 1598px 32px #FFF , 1120px 1957px #FFF , 1537px 1956px #FFF , 1122px 58px #FFF , 151px 212px #FFF , 1509px 1405px #FFF , 846px 338px #FFF , 305px 324px #FFF , 202px 1934px #FFF , 1532px 1428px #FFF , 1395px 1657px #FFF , 569px 1169px #FFF , 1856px 1096px #FFF , 876px 1286px #FFF , 224px 1943px #FFF , 1719px 1075px #FFF , 744px 1983px #FFF , 957px 1236px #FFF , 1937px 832px #FFF , 1456px 1424px #FFF , 72px 746px #FFF , 1914px 1527px #FFF , 831px 1215px #FFF , 685px 240px #FFF , 1234px 136px #FFF , 1912px 1663px #FFF , 971px 943px #FFF , 1899px 1650px #FFF , 1670px 165px #FFF , 19px 917px #FFF;\n" +
            "        }\n" +
            "\n" +
            "        #stars2 {\n" +
            "            width: 2px;\n" +
            "            height: 2px;\n" +
            "            background: transparent;\n" +
            "            box-shadow: 893px 1965px #FFF , 464px 279px #FFF , 410px 1520px #FFF , 233px 1286px #FFF , 1758px 1472px #FFF , 1244px 1263px #FFF , 318px 232px #FFF , 1684px 877px #FFF , 571px 859px #FFF , 714px 452px #FFF , 695px 556px #FFF , 544px 571px #FFF , 1201px 553px #FFF , 1783px 287px #FFF , 1277px 356px #FFF , 446px 1819px #FFF , 1130px 1761px #FFF , 878px 915px #FFF , 253px 528px #FFF , 382px 1095px #FFF , 331px 443px #FFF , 125px 1318px #FFF , 1575px 367px #FFF , 163px 1505px #FFF , 1980px 1943px #FFF , 1431px 288px #FFF , 178px 26px #FFF , 63px 1687px #FFF , 829px 611px #FFF , 1617px 1190px #FFF , 1722px 26px #FFF , 694px 358px #FFF , 342px 192px #FFF , 109px 1154px #FFF , 1496px 101px #FFF , 1115px 415px #FFF , 1517px 483px #FFF , 187px 427px #FFF , 140px 1395px #FFF , 335px 1410px #FFF , 1003px 942px #FFF , 231px 834px #FFF , 1141px 1415px #FFF , 1444px 939px #FFF , 353px 1176px #FFF , 1199px 1157px #FFF , 495px 1749px #FFF , 347px 1612px #FFF , 1430px 518px #FFF , 323px 3px #FFF , 1165px 514px #FFF , 710px 143px #FFF , 1096px 438px #FFF , 829px 660px #FFF , 1575px 134px #FFF , 694px 541px #FFF , 1263px 842px #FFF , 1701px 1983px #FFF , 1875px 1127px #FFF , 1407px 1886px #FFF , 514px 398px #FFF , 1106px 563px #FFF , 569px 560px #FFF , 1284px 387px #FFF , 1654px 1256px #FFF , 170px 283px #FFF , 207px 327px #FFF , 134px 1821px #FFF , 66px 770px #FFF , 1595px 1851px #FFF , 1387px 670px #FFF , 368px 1985px #FFF , 1803px 647px #FFF , 1668px 871px #FFF , 298px 1144px #FFF , 1340px 247px #FFF , 799px 1956px #FFF , 1377px 244px #FFF , 1366px 1873px #FFF , 457px 1804px #FFF , 871px 1668px #FFF , 474px 425px #FFF , 1865px 1297px #FFF , 440px 1414px #FFF , 895px 1026px #FFF , 1725px 1856px #FFF , 473px 1389px #FFF , 1190px 1064px #FFF , 1148px 1250px #FFF , 286px 1503px #FFF , 1533px 590px #FFF , 130px 923px #FFF , 911px 1640px #FFF , 1999px 655px #FFF , 274px 2px #FFF , 1670px 1973px #FFF , 568px 257px #FFF , 544px 1980px #FFF , 1829px 1384px #FFF , 661px 1458px #FFF , 1767px 1185px #FFF , 1357px 140px #FFF , 936px 223px #FFF , 1063px 1346px #FFF , 1938px 1245px #FFF , 1102px 439px #FFF , 213px 359px #FFF , 138px 396px #FFF , 1003px 1423px #FFF , 1037px 77px #FFF , 615px 752px #FFF , 1535px 1800px #FFF , 1731px 1444px #FFF , 787px 1944px #FFF , 298px 122px #FFF , 889px 1173px #FFF , 257px 1223px #FFF , 1964px 1333px #FFF , 1060px 1085px #FFF , 1205px 1186px #FFF , 293px 1420px #FFF , 659px 1718px #FFF , 1660px 1023px #FFF , 1555px 1927px #FFF , 374px 778px #FFF , 1278px 123px #FFF , 1122px 1714px #FFF , 1282px 41px #FFF , 1710px 1435px #FFF , 1419px 100px #FFF , 1129px 1410px #FFF , 516px 1645px #FFF , 755px 1460px #FFF , 886px 1837px #FFF , 1518px 993px #FFF , 761px 221px #FFF , 229px 492px #FFF , 570px 1699px #FFF , 1737px 693px #FFF , 255px 1863px #FFF , 589px 956px #FFF , 1981px 1515px #FFF , 1894px 961px #FFF , 309px 67px #FFF , 41px 1589px #FFF , 1861px 181px #FFF , 987px 1763px #FFF , 1483px 650px #FFF , 1100px 986px #FFF , 41px 1193px #FFF , 128px 200px #FFF , 1641px 1704px #FFF , 313px 709px #FFF , 1922px 1452px #FFF , 940px 866px #FFF , 1886px 1680px #FFF , 467px 1675px #FFF , 545px 590px #FFF , 1161px 582px #FFF , 651px 1703px #FFF , 1990px 1400px #FFF , 1135px 983px #FFF , 659px 1287px #FFF , 1580px 1036px #FFF , 1113px 998px #FFF , 503px 1764px #FFF , 673px 1177px #FFF , 598px 495px #FFF , 1211px 799px #FFF , 1034px 173px #FFF , 116px 1354px #FFF , 1009px 1227px #FFF , 1452px 719px #FFF , 792px 644px #FFF , 1139px 907px #FFF , 181px 599px #FFF , 1919px 559px #FFF , 265px 521px #FFF , 917px 1598px #FFF , 195px 43px #FFF , 891px 956px #FFF , 1722px 361px #FFF , 851px 969px #FFF , 802px 199px #FFF , 408px 306px #FFF , 834px 1879px #FFF , 826px 1512px #FFF , 1080px 1415px #FFF , 1533px 263px #FFF , 1620px 1962px #FFF , 98px 1657px #FFF , 881px 526px #FFF , 798px 236px #FFF , 585px 314px #FFF , 1156px 821px #FFF , 898px 792px #FFF , 296px 1613px #FFF , 1118px 542px #FFF , 484px 1672px #FFF , 1615px 445px #FFF;\n" +
            "            animation: animStar 100s linear infinite;\n" +
            "        }\n" +
            "        #stars2:after {\n" +
            "            content: \" \";\n" +
            "            position: absolute;\n" +
            "            top: 2000px;\n" +
            "            width: 2px;\n" +
            "            height: 2px;\n" +
            "            background: transparent;\n" +
            "            box-shadow: 893px 1965px #FFF , 464px 279px #FFF , 410px 1520px #FFF , 233px 1286px #FFF , 1758px 1472px #FFF , 1244px 1263px #FFF , 318px 232px #FFF , 1684px 877px #FFF , 571px 859px #FFF , 714px 452px #FFF , 695px 556px #FFF , 544px 571px #FFF , 1201px 553px #FFF , 1783px 287px #FFF , 1277px 356px #FFF , 446px 1819px #FFF , 1130px 1761px #FFF , 878px 915px #FFF , 253px 528px #FFF , 382px 1095px #FFF , 331px 443px #FFF , 125px 1318px #FFF , 1575px 367px #FFF , 163px 1505px #FFF , 1980px 1943px #FFF , 1431px 288px #FFF , 178px 26px #FFF , 63px 1687px #FFF , 829px 611px #FFF , 1617px 1190px #FFF , 1722px 26px #FFF , 694px 358px #FFF , 342px 192px #FFF , 109px 1154px #FFF , 1496px 101px #FFF , 1115px 415px #FFF , 1517px 483px #FFF , 187px 427px #FFF , 140px 1395px #FFF , 335px 1410px #FFF , 1003px 942px #FFF , 231px 834px #FFF , 1141px 1415px #FFF , 1444px 939px #FFF , 353px 1176px #FFF , 1199px 1157px #FFF , 495px 1749px #FFF , 347px 1612px #FFF , 1430px 518px #FFF , 323px 3px #FFF , 1165px 514px #FFF , 710px 143px #FFF , 1096px 438px #FFF , 829px 660px #FFF , 1575px 134px #FFF , 694px 541px #FFF , 1263px 842px #FFF , 1701px 1983px #FFF , 1875px 1127px #FFF , 1407px 1886px #FFF , 514px 398px #FFF , 1106px 563px #FFF , 569px 560px #FFF , 1284px 387px #FFF , 1654px 1256px #FFF , 170px 283px #FFF , 207px 327px #FFF , 134px 1821px #FFF , 66px 770px #FFF , 1595px 1851px #FFF , 1387px 670px #FFF , 368px 1985px #FFF , 1803px 647px #FFF , 1668px 871px #FFF , 298px 1144px #FFF , 1340px 247px #FFF , 799px 1956px #FFF , 1377px 244px #FFF , 1366px 1873px #FFF , 457px 1804px #FFF , 871px 1668px #FFF , 474px 425px #FFF , 1865px 1297px #FFF , 440px 1414px #FFF , 895px 1026px #FFF , 1725px 1856px #FFF , 473px 1389px #FFF , 1190px 1064px #FFF , 1148px 1250px #FFF , 286px 1503px #FFF , 1533px 590px #FFF , 130px 923px #FFF , 911px 1640px #FFF , 1999px 655px #FFF , 274px 2px #FFF , 1670px 1973px #FFF , 568px 257px #FFF , 544px 1980px #FFF , 1829px 1384px #FFF , 661px 1458px #FFF , 1767px 1185px #FFF , 1357px 140px #FFF , 936px 223px #FFF , 1063px 1346px #FFF , 1938px 1245px #FFF , 1102px 439px #FFF , 213px 359px #FFF , 138px 396px #FFF , 1003px 1423px #FFF , 1037px 77px #FFF , 615px 752px #FFF , 1535px 1800px #FFF , 1731px 1444px #FFF , 787px 1944px #FFF , 298px 122px #FFF , 889px 1173px #FFF , 257px 1223px #FFF , 1964px 1333px #FFF , 1060px 1085px #FFF , 1205px 1186px #FFF , 293px 1420px #FFF , 659px 1718px #FFF , 1660px 1023px #FFF , 1555px 1927px #FFF , 374px 778px #FFF , 1278px 123px #FFF , 1122px 1714px #FFF , 1282px 41px #FFF , 1710px 1435px #FFF , 1419px 100px #FFF , 1129px 1410px #FFF , 516px 1645px #FFF , 755px 1460px #FFF , 886px 1837px #FFF , 1518px 993px #FFF , 761px 221px #FFF , 229px 492px #FFF , 570px 1699px #FFF , 1737px 693px #FFF , 255px 1863px #FFF , 589px 956px #FFF , 1981px 1515px #FFF , 1894px 961px #FFF , 309px 67px #FFF , 41px 1589px #FFF , 1861px 181px #FFF , 987px 1763px #FFF , 1483px 650px #FFF , 1100px 986px #FFF , 41px 1193px #FFF , 128px 200px #FFF , 1641px 1704px #FFF , 313px 709px #FFF , 1922px 1452px #FFF , 940px 866px #FFF , 1886px 1680px #FFF , 467px 1675px #FFF , 545px 590px #FFF , 1161px 582px #FFF , 651px 1703px #FFF , 1990px 1400px #FFF , 1135px 983px #FFF , 659px 1287px #FFF , 1580px 1036px #FFF , 1113px 998px #FFF , 503px 1764px #FFF , 673px 1177px #FFF , 598px 495px #FFF , 1211px 799px #FFF , 1034px 173px #FFF , 116px 1354px #FFF , 1009px 1227px #FFF , 1452px 719px #FFF , 792px 644px #FFF , 1139px 907px #FFF , 181px 599px #FFF , 1919px 559px #FFF , 265px 521px #FFF , 917px 1598px #FFF , 195px 43px #FFF , 891px 956px #FFF , 1722px 361px #FFF , 851px 969px #FFF , 802px 199px #FFF , 408px 306px #FFF , 834px 1879px #FFF , 826px 1512px #FFF , 1080px 1415px #FFF , 1533px 263px #FFF , 1620px 1962px #FFF , 98px 1657px #FFF , 881px 526px #FFF , 798px 236px #FFF , 585px 314px #FFF , 1156px 821px #FFF , 898px 792px #FFF , 296px 1613px #FFF , 1118px 542px #FFF , 484px 1672px #FFF , 1615px 445px #FFF;\n" +
            "        }\n" +
            "\n" +
            "        #stars3 {\n" +
            "            width: 3px;\n" +
            "            height: 3px;\n" +
            "            background: transparent;\n" +
            "            box-shadow: 948px 1662px #FFF , 1560px 643px #FFF , 19px 260px #FFF , 20px 298px #FFF , 297px 429px #FFF , 134px 982px #FFF , 1605px 1114px #FFF , 986px 1637px #FFF , 853px 645px #FFF , 761px 570px #FFF , 84px 938px #FFF , 1411px 1061px #FFF , 1619px 1599px #FFF , 957px 194px #FFF , 1597px 777px #FFF , 1410px 133px #FFF , 689px 1272px #FFF , 159px 1156px #FFF , 1210px 1353px #FFF , 822px 1226px #FFF , 1574px 1598px #FFF , 1153px 774px #FFF , 1801px 8px #FFF , 958px 1029px #FFF , 729px 12px #FFF , 259px 1052px #FFF , 421px 1618px #FFF , 786px 769px #FFF , 1353px 788px #FFF , 290px 730px #FFF , 32px 995px #FFF , 1151px 306px #FFF , 25px 549px #FFF , 698px 137px #FFF , 1335px 1355px #FFF , 804px 292px #FFF , 708px 1012px #FFF , 1275px 816px #FFF , 44px 221px #FFF , 1746px 373px #FFF , 1101px 1915px #FFF , 252px 1280px #FFF , 294px 1263px #FFF , 1803px 732px #FFF , 224px 1798px #FFF , 1887px 1462px #FFF , 108px 1196px #FFF , 999px 306px #FFF , 1140px 14px #FFF , 502px 1803px #FFF , 883px 1848px #FFF , 125px 500px #FFF , 1760px 30px #FFF , 946px 1079px #FFF , 241px 636px #FFF , 623px 979px #FFF , 179px 223px #FFF , 600px 1338px #FFF , 70px 1333px #FFF , 303px 1737px #FFF , 709px 894px #FFF , 188px 1233px #FFF , 1887px 850px #FFF , 1162px 300px #FFF , 805px 997px #FFF , 392px 537px #FFF , 1788px 383px #FFF , 36px 1849px #FFF , 886px 678px #FFF , 1852px 121px #FFF , 129px 666px #FFF , 854px 547px #FFF , 1104px 1213px #FFF , 1991px 1355px #FFF , 1323px 102px #FFF , 1191px 867px #FFF , 352px 138px #FFF , 1646px 620px #FFF , 919px 1345px #FFF , 975px 1558px #FFF , 1636px 250px #FFF , 963px 1680px #FFF , 840px 859px #FFF , 25px 1675px #FFF , 1284px 357px #FFF , 846px 809px #FFF , 374px 219px #FFF , 106px 507px #FFF , 1774px 738px #FFF , 674px 109px #FFF , 332px 593px #FFF , 120px 1299px #FFF , 601px 1540px #FFF , 256px 1834px #FFF , 422px 59px #FFF , 1106px 1993px #FFF , 1202px 1164px #FFF , 1889px 751px #FFF , 1997px 1199px #FFF , 1129px 448px #FFF;\n" +
            "            animation: animStar 150s linear infinite;\n" +
            "        }\n" +
            "        #stars3:after {\n" +
            "            content: \" \";\n" +
            "            position: absolute;\n" +
            "            top: 2000px;\n" +
            "            width: 3px;\n" +
            "            height: 3px;\n" +
            "            background: transparent;\n" +
            "            box-shadow: 948px 1662px #FFF , 1560px 643px #FFF , 19px 260px #FFF , 20px 298px #FFF , 297px 429px #FFF , 134px 982px #FFF , 1605px 1114px #FFF , 986px 1637px #FFF , 853px 645px #FFF , 761px 570px #FFF , 84px 938px #FFF , 1411px 1061px #FFF , 1619px 1599px #FFF , 957px 194px #FFF , 1597px 777px #FFF , 1410px 133px #FFF , 689px 1272px #FFF , 159px 1156px #FFF , 1210px 1353px #FFF , 822px 1226px #FFF , 1574px 1598px #FFF , 1153px 774px #FFF , 1801px 8px #FFF , 958px 1029px #FFF , 729px 12px #FFF , 259px 1052px #FFF , 421px 1618px #FFF , 786px 769px #FFF , 1353px 788px #FFF , 290px 730px #FFF , 32px 995px #FFF , 1151px 306px #FFF , 25px 549px #FFF , 698px 137px #FFF , 1335px 1355px #FFF , 804px 292px #FFF , 708px 1012px #FFF , 1275px 816px #FFF , 44px 221px #FFF , 1746px 373px #FFF , 1101px 1915px #FFF , 252px 1280px #FFF , 294px 1263px #FFF , 1803px 732px #FFF , 224px 1798px #FFF , 1887px 1462px #FFF , 108px 1196px #FFF , 999px 306px #FFF , 1140px 14px #FFF , 502px 1803px #FFF , 883px 1848px #FFF , 125px 500px #FFF , 1760px 30px #FFF , 946px 1079px #FFF , 241px 636px #FFF , 623px 979px #FFF , 179px 223px #FFF , 600px 1338px #FFF , 70px 1333px #FFF , 303px 1737px #FFF , 709px 894px #FFF , 188px 1233px #FFF , 1887px 850px #FFF , 1162px 300px #FFF , 805px 997px #FFF , 392px 537px #FFF , 1788px 383px #FFF , 36px 1849px #FFF , 886px 678px #FFF , 1852px 121px #FFF , 129px 666px #FFF , 854px 547px #FFF , 1104px 1213px #FFF , 1991px 1355px #FFF , 1323px 102px #FFF , 1191px 867px #FFF , 352px 138px #FFF , 1646px 620px #FFF , 919px 1345px #FFF , 975px 1558px #FFF , 1636px 250px #FFF , 963px 1680px #FFF , 840px 859px #FFF , 25px 1675px #FFF , 1284px 357px #FFF , 846px 809px #FFF , 374px 219px #FFF , 106px 507px #FFF , 1774px 738px #FFF , 674px 109px #FFF , 332px 593px #FFF , 120px 1299px #FFF , 601px 1540px #FFF , 256px 1834px #FFF , 422px 59px #FFF , 1106px 1993px #FFF , 1202px 1164px #FFF , 1889px 751px #FFF , 1997px 1199px #FFF , 1129px 448px #FFF;\n" +
            "        }\n" +
            "\n" +
            "        #title {\n" +
            "            position: relative;\n" +
            "            top: 50%;\n" +
            "            left: 0;\n" +
            "            right: 0;\n" +
            "            color: #FFF;\n" +
            "            text-align: center;\n" +
            "            font-family: \"lato\", sans-serif;\n" +
            "            font-weight: 300;\n" +
            "            font-size: 50px;\n" +
            "            letter-spacing: 10px;\n" +
            "            margin-top: -120px;\n" +
            "            padding-left: 10px;\n" +
            "            margin-left: 250px;\n" +
            "        }\n" +
            "        #title span {\n" +
            "            background: -webkit-linear-gradient(white, #38495a);\n" +
            "            -webkit-background-clip: text;\n" +
            "            -webkit-text-fill-color: transparent;\n" +
            "        }\n" +
            "\n" +
            "        @keyframes animStar {\n" +
            "            from {\n" +
            "                transform: translateY(0px);\n" +
            "            }\n" +
            "            to {\n" +
            "                transform: translateY(-2000px);\n" +
            "            }\n" +
            "        }\n" +
            "\n" +
            "        /*weather*/\n" +
            "        #weather\n" +
            "        {\n" +
            "            background: #545456;\n" +
            "            color:#fff;\n" +
            "            font-family: 'Quicksand';\n" +
            "            width: 1500px;\n" +
            "            height:500px;\n" +
            "            margin-left: 50px;\n" +
            "            -webkit-border-radius: 30px;\n" +
            "            -moz-border-radius: 30px;\n" +
            "            border-radius: 30px;\n" +
            "            margin-top: -40px;\n" +
            "        }\n" +
            "        .btn\n" +
            "        {\n" +
            "            background-color: rgba(255, 60, 65, 1);\n" +
            "            font-size: 12px;\n" +
            "            padding-bottom: 2px;\n" +
            "            padding-top: 2px;\n" +
            "            border-radius: 2px;\n" +
            "            height: 24px;\n" +
            "            width: 40px;\n" +
            "            color: #fff;\n" +
            "            margin-top:12px;\n" +
            "            outline: 0;\n" +
            "\n" +
            "        }\n" +
            "\n" +
            "\n" +
            "        #home\n" +
            "        {\n" +
            "            font-size:45px;\n" +
            "            padding-right: 10px;\n" +
            "        }\n" +
            "        h2\n" +
            "        {\n" +
            "            font-size:30px;\n" +
            "        }\n" +
            "\n" +
            "        .container\n" +
            "        {\n" +
            "            margin:5% auto auto auto;\n" +
            "            max-width:500px;\n" +
            "            background: rgba(49, 49, 49, 0.34);\n" +
            "            box-shadow: 0 7px 7px -7px #000;\n" +
            "\n" +
            "        }\n" +
            "\n" +
            "        .iconInfo\n" +
            "        {\n" +
            "            text-align:center;\n" +
            "            padding-top:15px;\n" +
            "        }\n" +
            "\n" +
            "        .info\n" +
            "        {\n" +
            "            text-align:center;\n" +
            "            font-size:15px;\n" +
            "            padding-top:15px;\n" +
            "        }\n" +
            "\n" +
            "        .weather-body\n" +
            "        {\n" +
            "            text-transform:none;\n" +
            "        }\n" +
            "\n" +
            "        .city  {\n" +
            "            text-align:center;\n" +
            "        }\n" +
            "\n" +
            "        h5{\n" +
            "            font-size: 14px;\n" +
            "        }\n" +
            "\n" +
            "        h2 small {\n" +
            "            color: #fff;\n" +
            "        }\n" +
            "\n" +
            "        h5 small {\n" +
            "            color: #fff;\n" +
            "        }\n" +
            "\n" +
            "\n" +
            "        p {\n" +
            "            font-size:14px;\n" +
            "            text-align:center;\n" +
            "        }\n" +
            "\n" +
            "        .row {\n" +
            "            font-size:14px;\n" +
            "            text-align:center;\n" +
            "        }\n" +
            "\n" +
            "\n" +
            "        .footerholder {\n" +
            "            font-size:12px;\n" +
            "            bottom: 0px;\n" +
            "            position: fixed;\n" +
            "            width: 100%;\n" +
            "            color:#000;\n" +
            "            background:#fff;\n" +
            "            text-align:center;\n" +
            "        }\n" +
            "\n" +
            "        h6 {\n" +
            "            padding-top:10px;\n" +
            "            font-size:14px !important;\n" +
            "            text-align:center;\n" +
            "            font-weight: 300 !important;\n" +
            "        }\n" +
            "    </style>\n" +
            "    <style>\n" +
            "        @import url(\"https://fonts.googleapis.com/css?family=Lato\");\n" +
            "        @font-face {\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            font-style: normal;\n" +
            "            font-weight: normal;\n" +
            "            src: url(\"https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/font/weathericons-regular-webfont.ttf\");\n" +
            "        }\n" +
            "        body {\n" +
            "            padding: 0;\n" +
            "            margin: 0;\n" +
            "            color: #fff;\n" +
            "            font-family: 'Lato', sans-serif;\n" +
            "            font-style: normal;\n" +
            "            font-weight: normal;\n" +
            "            font-size: 20px;\n" +
            "        }\n" +
            "        .wrapper {\n" +
            "            background-color: #353535;\n" +
            "            display: flex;\n" +
            "            flex-flow: column nowrap;\n" +
            "            justify-content: center;\n" +
            "            height: 400px;\n" +
            "            width: 700px;\n" +
            "            text-align: center;\n" +
            "            max-width: 660px;\n" +
            "            margin: 20px auto auto 50px;\n" +
            "            float: left;\n" +
            "        }\n" +
            "        .wrapper .today {\n" +
            "            flex: 1;\n" +
            "            height: 10em;\n" +
            "            position: relative;\n" +
            "            justify-content: center;\n" +
            "            width: 660px;\n" +
            "        }\n" +
            "        .wrapper .today #city {\n" +
            "            color: #C1;\n" +
            "            margin: 0.1rem;\n" +
            "            width:100%;\n" +
            "            justify-content: center;\n" +
            "            margin: 10px 0;\n" +
            "        }\n" +
            "        .wrapper .today .weatherInfo {\n" +
            "            display: flex;\n" +
            "            flex-flow: row wrap;\n" +
            "            justify-content: center;\n" +
            "            width: 50%;\n" +
            "            height: 100%;\n" +
            "            background: rgb(41, 41, 41);\n" +
            "            position: absolute;\n" +
            "            top: 0;\n" +
            "            left: 0;\n" +
            "        }\n" +
            "\n" +
            "        .wrapper .today .weatherRight{\n" +
            "            display: flex;\n" +
            "            flex-flow: row wrap;\n" +
            "            justify-content: center;\n" +
            "            width: 50%;\n" +
            "            height: 100%;\n" +
            "            background: rgb(237, 237, 237);\n" +
            "            position: absolute;\n" +
            "            top: 0;\n" +
            "            left: 50%;\n" +
            "        }\n" +
            "        .wrapper .today .weatherRight #weatherIcon {\n" +
            "            font-size: 70px;\n" +
            "            justify-content: center;\n" +
            "            color:rgb(41, 41, 41);\n" +
            "            margin-top: -15px;\n" +
            "        }\n" +
            "        .wrapper .today .weatherRight  #weatherIcon:after {\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            content: attr(data-icon);\n" +
            "        }\n" +
            "        .wrapper .today .weatherRight #forecast {\n" +
            "            color: #4c4c4c;\n" +
            "            margin: 0.1rem;\n" +
            "            width:100%;\n" +
            "            margin: 10px 0;\n" +
            "        }\n" +
            "        .wrapper .today .icon-wrapper {\n" +
            "            display: flex;\n" +
            "            justify-content: center;\n" +
            "        }\n" +
            "        .wrapper .today .temperature-wrapper {\n" +
            "            display: flex;\n" +
            "            justify-content: center;\n" +
            "        }\n" +
            "        .wrapper .today #temperature {\n" +
            "            font-size: 70px;\n" +
            "            position: relative;\n" +
            "            width: 100%;\n" +
            "            justify-content: center;\n" +
            "        }\n" +
            "        .wrapper .today #temperature #metrics {\n" +
            "            position: absolute;\n" +
            "            top: -0.3em;\n" +
            "            right: -.8em;\n" +
            "            font-size: 40px;\n" +
            "        }\n" +
            "        .wrapper .today #temperature #metrics:hover {\n" +
            "            color: #f48c41;\n" +
            "            transition: color 0.2s ease;\n" +
            "\n" +
            "        }\n" +
            "        .wrapper .today #temperature #metrics:after {\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            content: attr(data-icon);\n" +
            "            transition: color 0.2s ease-out;\n" +
            "        }\n" +
            "        .wrapper .daily {\n" +
            "            display: flex;\n" +
            "            height: 6em;\n" +
            "            background: #444;\n" +
            "            flex-direction: column;\n" +
            "            justify-content: center;\n" +
            "            width: 660px;\n" +
            "        }\n" +
            "        .wrapper .daily .low-high {\n" +
            "            font-size: 1rem;\n" +
            "            color: #fff;\n" +
            "            display: flex;\n" +
            "            flex-direction: row;\n" +
            "            justify-content: center;\n" +
            "            align-items: center;\n" +
            "        }\n" +
            "\n" +
            "        .wrapper .currently .low{\n" +
            "            padding-right:2em;\n" +
            "        }\n" +
            "        .wrapper .currently .low #low {\n" +
            "            color: #0f88ff;\n" +
            "            padding-right:10px;\n" +
            "        }\n" +
            "        .wrapper .currently .high{\n" +
            "            padding-left:2em;\n" +
            "        }\n" +
            "        .wrapper .currently .high #high {\n" +
            "            color: #f95757;\n" +
            "        }\n" +
            "        .wrapper .daily .low-high span {\n" +
            "            display: block;\n" +
            "            font-size: 0.75rem;\n" +
            "            color: #C1;\n" +
            "            margin: 0 2em;\n" +
            "        }\n" +
            "        .wrapper .daily .low-high .temperature-range {\n" +
            "            width: 100%;\n" +
            "            height: 40px;\n" +
            "            padding: 0;\n" +
            "            margin: 0;\n" +
            "            background: linear-gradient(to right, #0f88ff 0%, #2989d8 10%, #207cca 20%, #207cca 30%, #ce6fc0 58%, #f48c41 100%);\n" +
            "        }\n" +
            "        .wrapper .daily .currently {\n" +
            "            display: flex;\n" +
            "            padding: 40px 0;\n" +
            "            flex-direction: row;\n" +
            "            margin-bottom: 20px;\n" +
            "            justify-content: center;\n" +
            "        }\n" +
            "        .wrapper .daily .currently .icon-wrapper {\n" +
            "            color: #C1;\n" +
            "            display: flex;\n" +
            "            padding: 25px 0;\n" +
            "            align-items: center;\n" +
            "            margin: 0 0.8rem;\n" +
            "            width: 500px;\n" +
            "        }\n" +
            "        .wrapper .daily .currently .icon-wrapper .metric-text {\n" +
            "            margin: 0 20px auto 5px;\n" +
            "            font-size: 18px;\n" +
            "        }\n" +
            "        .wrapper .daily .currently .icon-wrapper .wind:after {\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            content: attr(data-icon);\n" +
            "        }\n" +
            "        .wrapper .daily .currently .icon-wrapper .rain:after {\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            content: attr(data-icon);\n" +
            "        }\n" +
            "        .wrapper .daily .currently .icon-wrapper .humi:after {\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            content: attr(data-icon);\n" +
            "        }\n" +
            "        .wrapper .week {\n" +
            "            color: #C1;\n" +
            "            flex: 1;\n" +
            "            height: 8em;\n" +
            "            display: flex;\n" +
            "            justify-content: center;\n" +
            "            align-items: center;\n" +
            "            width: 660px;\n" +
            "        }\n" +
            "        .wrapper .week .day {\n" +
            "            margin: 0 0.8rem;\n" +
            "        }\n" +
            "        .wrapper .week .day .day-low-high {\n" +
            "            font-size: 18px;\n" +
            "            padding-top:10px;\n" +
            "        }\n" +
            "        .wrapper .week .day .day-icon:after {\n" +
            "            color: #999;\n" +
            "            padding-top: 15px;\n" +
            "            font-family: 'Weather-Icons';\n" +
            "            content: attr(data-icon);\n" +
            "        }\n" +
            "    </style>\n" +
            "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n" +
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
            "    <!-- get weather data-->\n" +
            "    <script>\n" +
            "\n" +
            "        $(document).ready(function(){\n" +
            "            $('#metrics').on(\"click\", toggleMetric);\n" +
            "            init();\n" +
            "        });\n" +
            "\n" +
            "        var apiKey = \"8499bfb5784b8d4294e452ea585904d7\";\n" +
            "\n" +
            "        var metric = \"us\";\n" +
            "        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];\n" +
            "        var icons = {\n" +
            "            'clear-day': '',\n" +
            "            'clear-night': '',\n" +
            "            'wind': '',\n" +
            "            'day-sunny': '',\n" +
            "            'night-clear': '',\n" +
            "            'rain': '',\n" +
            "            'snow': '',\n" +
            "            'sleet': '',\n" +
            "            'strong-wind': '',\n" +
            "            'fog': '',\n" +
            "            'cloudy': '',\n" +
            "            'day-cloudy': '',\n" +
            "            'night-cloudy': '',\n" +
            "            'hail': '',\n" +
            "            'thunderstorm': '',\n" +
            "            'tornado': '',\n" +
            "            'partly-cloudy-night': '',\n" +
            "            'partly-cloudy-day': '',\n" +
            "            'n/a': ''\n" +
            "        };\n" +
            "\n" +
            "        function init(){\n" +
            "            getGeoPos();\n" +
            "        }\n" +
            "\n" +
            "        function getGeoPos(){\n" +
            "            $.getJSON('https://ipinfo.io', function(data){\n" +
            "                setLocation(data);\n" +
            "                getWeather(data);\n" +
            "            });\n" +
            "        }\n" +
            "\n" +
            "        function getWeather(geo){\n" +
            "            $.ajax({\n" +
            "                url: 'https://api.forecast.io/forecast/'+apiKey+'/'+geo.loc+'?units='+metric,\n" +
            "                data: {format: 'json'},\n" +
            "                type: 'GET',\n" +
            "                dataType: 'jsonp',\n" +
            "                success: function(data) {\n" +
            "                    setWeather(data);\n" +
            "                }\n" +
            "            });\n" +
            "        }\n" +
            "\n" +
            "        function setWeather(forecast){\n" +
            "            $('#forecast').text(forecast.currently.summary);\n" +
            "            var icon = icons[forecast.currently.icon] || icons['n/a'];\n" +
            "            $('#weatherIcon').attr('data-icon', icon);\n" +
            "            $('#temperature>.temp').text(Math.ceil(forecast.currently.temperature));\n" +
            "            var windMetric = metric === 'us' ? 'mph' : 'm/s';\n" +
            "            $('#wind-text').text(Math.ceil(forecast.currently.windSpeed)+' '+windMetric);\n" +
            "            $('#rain-text').text(forecast.currently.precipProbability+'%');\n" +
            "            var humidity = Math.round(forecast.currently.humidity * 100);\n" +
            "            $('#humi-text').text(humidity+'%');\n" +
            "            $('#low').text(Math.ceil(forecast.daily.data[0].apparentTemperatureMin));\n" +
            "            $('#high').text(Math.ceil(forecast.daily.data[0].apparentTemperatureMax));\n" +
            "            console.log(forecast);\n" +
            "            var daily = getWeekdays(forecast.daily.data);\n" +
            "            $('.day').each(function(i,day){\n" +
            "                $(day).find('.day-desc').text(daily[i].day);\n" +
            "                var icon = icons[daily[i].icon] || icons['n/a'];\n" +
            "                $(day).find('.day-icon').attr('data-icon', icon);\n" +
            "                $(day).find('.day-low-high').text(daily[i].min+'°/'+daily[i].max+'°');\n" +
            "            });\n" +
            "        }\n" +
            "\n" +
            "        function getWeekdays(week){\n" +
            "            return week.map(function(day){\n" +
            "                var date = new Date(day.time*1000);\n" +
            "                return {\n" +
            "                    day: days[date.getDay()],\n" +
            "                    max: Math.ceil(day.apparentTemperatureMax),\n" +
            "                    min: Math.ceil(day.apparentTemperatureMin),\n" +
            "                    icon: day.icon\n" +
            "                };\n" +
            "            }).splice(1, week.length);\n" +
            "        }\n" +
            "\n" +
            "        function setLocation(loc){\n" +
            "            if(loc.city){\n" +
            "                $('#city').text(loc.city+', '+loc.country);\n" +
            "            }\n" +
            "        };\n" +
            "\n" +
            "        function toggleMetric(){\n" +
            "            metric = metric === 'us' ? 'si' : 'us';\n" +
            "            var icon = metric === 'us' ? '' : '';\n" +
            "            $(this).attr('data-icon', icon);\n" +
            "            init();\n" +
            "        }\n" +
            "\n" +
            "    </script>\n" +
            "    <!-- widget weather forecast-->\n" +
            "\n" +
            "    <link rel=\"stylesheet\" href=\"http://www.tinymce.com/css/codepen.min.css\">\n" +
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
            "        <h2>Viết bài</h2>\n" +
            "        <a href=\"javascript:void(0);\">Hello nigga!</a>\n" +
            "    </div>\n" +
            "    <div class=\"rendered\">\n" +
            "        <div id=\"welcome\">\n" +
            "            <div id=\"stars\"></div>\n" +
            "            <div id=\"stars2\"></div>\n" +
            "            <div id=\"stars3\"></div>\n" +
            "            <div id=\"title\">\n" +
            "            <span>\n" +
            "                HI THERE\n" +
            "            </span>\n" +
            "                <br>\n" +
            "                <span>\n" +
            "                WE ARE WAITING FOR YOU\n" +
            "            </span>\n" +
            "                <br>\n" +
            "                <br>\n" +
            "                <span style=\"color:#44D5AC;\">\n" +
            "                " +email+"\n" +
            "            </span>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <!--Tab setting here-->\n" +
            "\n" +
            "        <!---->\n" +
            "        <div class=\"wrapper\">\n" +
            "            <div class=\"today\">\n" +
            "                <div class=\"weatherInfo\">\n" +
            "                    <div id=\"city\"></div>\n" +
            "\n" +
            "                    <div class=\"temperature-wrapper\">\n" +
            "                        <div id=\"temperature\">\n" +
            "                            <div class=\"temp\"></div>\n" +
            "                            <div id=\"metrics\" data-icon=\"\"></div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"weatherRight\">\n" +
            "                    <div id=\"forecast\"></div>\n" +
            "                    <div class=\"icon-wrapper\">\n" +
            "                        <div id=\"weatherIcon\" data-icon=\"\"></div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"daily\">\n" +
            "                <div class=\"low-high\">\n" +
            "                    <div class=\"temperature-range\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"currently\">\n" +
            "                    <div class=\"low\">\n" +
            "                        <div id=\"low\"></div><span>Low</span>\n" +
            "                    </div>\n" +
            "                    <div class=\"icon-wrapper\">\n" +
            "                        <div>\n" +
            "                            <div class=\"wind\" data-icon=\"\"></div>\n" +
            "                            <div class=\"metric-text\">Wind</div>\n" +
            "                        </div>\n" +
            "                        <div class=\"metric-text\" id=\"wind-text\"></div>\n" +
            "                    </div>\n" +
            "                    <div class=\"icon-wrapper\">\n" +
            "                        <div>\n" +
            "                            <div class=\"rain\" data-icon=\"\"></div>\n" +
            "                            <div class=\"metric-text\">Rain</div>\n" +
            "                        </div>\n" +
            "                        <div class=\"metric-text\" id=\"rain-text\"> </div>\n" +
            "                    </div>\n" +
            "                    <div class=\"icon-wrapper\">\n" +
            "                        <div>\n" +
            "                            <div class=\"humi\" data-icon=\"\"></div>\n" +
            "                            <div class=\"metric-text\">Humidity</div>\n" +
            "                        </div>\n" +
            "                        <div class=\"metric-text\" id=\"humi-text\"></div>\n" +
            "                    </div>\n" +
            "                    <div class=\"high\">\n" +
            "                        <div id=\"high\"></div><span>High</span>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"week\">\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Mon</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Tue</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Wed</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Thu</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Fri</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Sat</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "                <div class=\"day\">\n" +
            "                    <div class=\"day-desc\">Sun</div>\n" +
            "                    <div class=\"day-icon\" data-icon=\"\"></div>\n" +
            "                    <div class=\"day-low-high\"></div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "\n" +
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
            "</div>\n" +
            "</body>\n" +
            "</html>";
        res.send(code);
    },

    MainPageRender : function (req,res){
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

        AWS.config.update({
            region: "us-east-1",
            endpoint: "http://dynamodb.us-east-1.amazonaws.com"
        });

        AWS.config.accessKeyId = config.accesskeyid;
        AWS.config.secretAccessKey = config.secretkey;

        let docClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "handmadevideo01",
            ProjectionExpression:"id,email,HandleName,image,urlVideo,summary,title"
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
                        "                <a href=\"/watchvideo?id=" + clips.id + "&&ip=" +  clips.urlVideo + "&&owner=" + clips.email + "\" class=\"ProductCard ProductCard--grid\">\n" +
                        "                    <div class=\"ProductCard__img-wrapper\">\n" +
                        "                        <img src=\""+clips.image+"\" alt=\"\" class=\"ProductCard__img\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"ProductCard__details\">\n" +
                        "                        <div class=\"ProductCard__details__header\">\n" +
                        "                            <div class=\"ProductCard__titles\">\n" +
                        "                                <h4 class=\"ProductCard__title\">"+clips.summary+"</h4>\n" +
                        "                                <h5 class=\"ProductCard__price\">"+clips.email+"</h5>\n" +
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
    },

    WatchedRender : function (req,res) {
        let code = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>Watched</title>\n" +
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
            "        #home\n" +
            "        {\n" +
            "            font-size:45px;\n" +
            "            padding-right: 10px;\n" +
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
            "        .users{\n" +
            "            width: 1500px;\n" +
            "            height: 300px;\n" +
            "            background: #FFFFFF;\n" +
            "            -webkit-border-radius: 30px;\n" +
            "            -moz-border-radius: 30px;\n" +
            "            border-radius: 30px;\n" +
            "            float: left;\n" +
            "            margin: 20px;\n" +
            "        }\n" +
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
            "</head>\n" +
            "<body>\n" +
            "<span class=\"bckg\">\n" +
            "    <header>\n" +
            "    <a href=\"/writerpage\" id=\"home\">Dashboard</a>\n" +
            "    <nav>\n" +
            "        <ul>\n" +
            "            <li>\n" +
            "                <a href=\"javascript:void(0);\" data-title=\"Các bài đăng\" onclick=\"postedrender()\">Các bài đăng</a>\n" +
            "                <script type=\"text/javascript\">\n" +
            "                    function postedrender() {\n" +
            "                        window.location.href = \"/postedrender?email=tranthevu.iuh@gmail.com\"\n" +
            "                    }\n" +
            "                </script>\n" +
            "            </li>\n" +
            "            <li>\n" +
            "                <a href=\"javascript:void(0);\" data-title=\"Các bình luận\" onclick=\"Commentrender()\">Các bình luận</a>\n" +
            "                <script type=\"text/javascript\">\n" +
            "                    function Commentrender() {\n" +
            "                        window.location.href = \"/Commentrender?email=tranthevu.iuh@gmail.com\"\n" +
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
            "</span>\n" +
            "<div class=\"main\">\n" +
            "    <div class=\"title\">\n" +
            "        <h2>Những người đang theo dõi bạn </h2>\n" +
            "        <a href=\"javascript:void(0);\">Hello nigga !</a>\n" +
            "    </div>\n" +
            "    <div class=\"rendered\">\n" +
            "        <div class=\"users\"></div>\n" +
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
        res.send(code);
    }
};