var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

// io.on('connection', function (socket) {
//   // Get current div location
//   serverEmitter.emit('movement');

//   //For broadcasting the div location 
//   serverEmitter.on('movement', function(coordinates){

//   });

//   socket.on('disconnect', function () {
//     io.sockets.emit('user disconnected');
//   });

// });


app.listen(3000, function() {
	console.log("Listening on port 3000...");
});
