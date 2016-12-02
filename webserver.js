var connect = require('connect');
var serveStatic = require('serve-static');
var http = require('http');
var finalhandler = require('finalhandler');
var querystring = require('querystring');

var serve = serveStatic("./client/");

var LocationMapper = require('./LocationMapper')

function handleTransmit(req, res) {
    console.log('transmit request');

    if (req.method == 'POST') {
        console.log("[200] " + req.method + " to " + req.url);
        var fullBody = '';

        req.on('data', function (chunk) {
            fullBody += chunk.toString();
        });

        req.on('end', function () {

            res.writeHead(200, "OK", {'Content-Type': 'text/html'});

            var decodedBody = querystring.parse(fullBody);
            LocationMapper.serve('id', decodedBody);
            res.end();
        });

    } else {
        console.log("[405] " + req.method + " to " + req.url);
        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
        res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
    }
}
var server = http.createServer(function (req, res) {
    switch (req.url) {
        case '/transmit':
            handleTransmit(req, res);
            break;

        default:
            var done = finalhandler(req, res);
            serve(req, res, done);
    }
});

module.exports = {
    start: function () {
        server.listen(8080);
    }
};

