let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User',new Schema({
    name:String,
    phoneContact: String,
    email:String,
    birthday:Date
}));