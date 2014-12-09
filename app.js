var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log("a user connected");

  // Update client screen with current div location
  // serverEmitter.emit('movement');

  //Everytime it moves recieve a movement event
  // serverEmitter.on('movement', function(coordinates){

  // });

  //Send the location of the user's mouse pointer to others
  // socket.on("coordinate", function(coordinate){
  // 	console.log('recieved coordinate');
  //   socket.broadcast.emit("move", { coordinate:coordinate });
  // });

  //Remove that user's pointer
  // socket.on('disconnect', function () {
  //   io.sockets.emit('user disconnected');
  // });

});


server.listen(3000, function() {
	console.log("Listening on port 3000...");
});
