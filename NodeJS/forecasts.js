let fetch = require('node-fetch');
let darksky = 'https://api.darksky.net/forecast/';
let key = '8499bfb5784b8d4294e452ea585904d7';
let lat = 38.8267;
let lng = -122.4233;

module.exports = {
    GetCityName : function (KinhDo,ViDo) {
        let uri = darksky + key + '/' + ViDo + ',' + KinhDo;
        console.log("Getting data from "+uri);

        let options = {
            method: 'GET',
            mode: 'cors'
        };
        let req = new fetch.Request(uri, options);
        fetch(req)
            .then((response) => {
                if (response.ok){
                    return response.json();
                } else {
                    throw new Error('Bad HTTP!')
                }
            }).then((j) => {
            console.log(j.currently.timeZone);
        }).catch( (err) =>{
            console.log('Error:',err.message);
        });
    }
};
