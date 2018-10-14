const mongoose = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

mongoose.connect(url,function (err,db) {
    if (err)
        throw err;
    const dbo = db.db("handmadedata");
    const myobj = {name:"Trần Thế Vũ",phoneContact:"0769811755",email:"tranthevu.iuh@gmail.com",birthday:"05/03/1997"};
    dbo.collection("customersprofile").insertOne(myobj,function (err,res) {
        if (err)
            throw err;
        console.log("1 document has been created !");
        db.close();
    });
});