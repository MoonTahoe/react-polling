var express = require('express');
var path = require('path');
var colors = require('colors');
var app = express().use(express.static(path.join(__dirname, 'dist')));
var server = app.listen(process.env.port || 3000);
var io = require('socket.io').listen(server);
var state = require('./app-sockets')(io);

app.get('/state', function (req, res) {
    console.log(colors.grey(req.method + " request for " + req.url + " status:200"));
    res.json({
        audience: state.audience,
        speaker: state.speaker
    });
});

app.use(function (req, res) {
    var err = new Error();
    err.message = "Route '" + req.url + "' Not Found";
    err.status = 404;
    console.log(colors.red(req.method + " request for " + req.url + " status:404"));
    res.json(err);
});

console.log('Socket Polling App listening on %s', process.env.port || 3000);

module.exports = app;