var fs = require('fs');

module.exports = {
    PostedRender : function (req,res) {
        fs.readFile('Posted.ejs',function (err,data) {
            if (err)
                throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });
    },
};