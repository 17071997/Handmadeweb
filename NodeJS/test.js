var authentication = require('../NodeJS/GetItem');

test = {
    authenticate : function (email,pass) {
        if (authentication.verify(email,pass)) {
            console.log("failure");
        }else {
            console.log("pass");
        }
    }
}
