const express = require('express');
const request = require('request');
const zlib = require('zlib');

let app = express();
let port = process.env.PORT || 7222;





app.listen(port, function() {
    console.log("Listening on " + port);
    makeRequest();
});



function makeRequest(){
    
    let url = 'http://data.taipei/youbike';
    let headers = {'Accept-Encoding': 'gzip'};
    
    let response = request(url, headers);
    
    gunzipJSON(response);
}

function gunzipJSON(response){

    let gunzip = zlib.createGunzip();
    let json = "";

    gunzip.on('data', function(data){
        json += data.toString();
    });
        
    gunzip.on('end', function(){
        parseJSON(json);
    });

    response.pipe(gunzip);
}

function parseJSON(json){

  // if var json = ... it can pass!! Amazing!!!
    json = JSON.parse(json);
    console.log(json)
    
}