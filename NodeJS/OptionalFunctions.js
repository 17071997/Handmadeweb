let session = require('express-session');
let config = require('./config.json');

exports.createSession = function (app) {
    app.use(session({
        secret: config.jwtsecretkey,
        resave: true,
        saveUninitialized: true,
        cookie:{
            maxAge: 300000
        }
    }))
};