var http = require('http');
var fs = require('fs');
var url = require('url');
var authenticate = require('../3/NodeJS/GetItem');

http.createServer( function (request, response) {
    var query = url.parse(request.url,true);
    console.log("Request cho " + query.pathname + " da duoc nhan.");
    if (query.pathname == "/index"){
        fs.readFile('public/view/index.html', function (err, data) {
            if (err) {
                console.log(err);
                fs.readFile('public/view/404NotFound.html',function (err,data) {
                    if (err)
                        console.log(err);
                    else{
                        response.writeHead(404,{'Content-Type':'text/html'});
                        response.write(data);
                    }
                });
            }else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data.toString());
                return response.end();
            }
        });
    }
    if (query.pathname == "/login"){
        var query2 = url.parse(request.url,true).query;
        const email = query2.username;
        const pass = query2.pass;
        if (authenticate.verify(email,pass)){
            fs.readFile('public/view/login.html',function (err,data) {
                if (err){
                    console.log(err);
                    fs.readFile('public/view/404NotFound.html',function (err,data) {
                        if (err)
                            console.log(err);
                        else{
                            response.writeHead(404,{'Content-Type':'text/html'});
                            response.write(data);
                        }
                    });
                    return;
                }
                else{
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.write(data);
                    return response.end();
                }
            });
        } else {
            fs.readFile('public/view/EditorPage.html',function (err,data) {
                if (err){
                    console.log(err);
                    fs.readFile('public/view/404NotFound.html',function (err,data) {
                        if (err)
                            console.log(err);
                        else{
                            response.writeHead(404,{'Content-Type':'text/html'});
                            response.write(data);
                        }
                    });
                    return;
                }
                else{
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.write(data);
                    return response.end();
                }

            });
        }
    }
    fs.readFile('public/view/index.html', function (err, data) {
        if (err) {
            console.log(err);
            fs.readFile('public/view/404NotFound.html',function (err,data) {
                if (err)
                    console.log(err);
                else{
                    response.writeHead(404,{'Content-Type':'text/html'});
                    response.write(data);
                }
            });
        }else{
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        return response.end();
    });
}).listen(8080);
console.log('Server dang chay tai dia chi: http://localhost:8080/');