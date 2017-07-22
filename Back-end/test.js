var express = require('express');
var app = express();
var http = require("http").Server(app);
var request = require('request');
var urlencode = require('urlencode');
var zlib = require('zlib');

function getYoubikeData(cb){
    
    var url = 'http://data.taipei/youbike';
    var headers = {'Accept-Encoding': 'gzip'};

    var response = request(url, headers);
    
    gunzipJSON(response, cb);
}

function gunzipJSON(response, cb) {

    var gunzip = zlib.createGunzip();
    var json = "";

    gunzip.on('data', function(data){
        json += data.toString();
    });
        
    gunzip.on('end', function(){
      cb(json);
    });

    response.pipe(gunzip);
}

function getGoogleDirectionAPIData(origin, destination, cb) {
 
  var url = "https://maps.googleapis.com/maps/api/directions/json?";
  url += "origin=" + origin;
  url += "&destination=" + destination;
  url += "&key=AIzaSyARuYIoss7TZUSvt_NrWSxbI5yhDKiE9RA";
  url += "&mode=transit";
  request(url , function (error, response, body) {
    cb(body);
  });
  
}


app.use(express.static(__dirname + '/public'));

app.get('/google_api', function(req, res) {
  
  getYoubikeData(function(jsonStr){
    console.log(jsonStr);
  });
  
  getGoogleDirectionAPIData(origin, destination, function(jsonStr){
    console.log("????");
  });
  
});

http.listen(process.env.PORT, process.env.IP);