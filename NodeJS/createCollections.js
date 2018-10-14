const MongoCLient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoCLient.connect(url,function (err,db) {
    if (err) throw err;
    const dbo = db.db("handmadedata");
    dbo.createCollection("customersprofile",function (err,res) {
        if (err)
            throw err;
        console.log("Collection created !");
        db.close();
    });
});