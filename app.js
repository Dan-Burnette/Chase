var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  console.log("a user connected");

  //Send the location of the user's mouse pointer to others
  socket.on("coordinates", function(coordinates){
  	console.log('recieved coordinates', coordinates);
    socket.broadcast.emit("otherPlayerMove", { coordinates: coordinates });
  });

  //Remove that user's pointer
  // socket.on('disconnect', function () {
  //   io.sockets.emit('user disconnected');
  // });

});

server.listen(3000, function() {
	console.log("Listening on port 3000...");
});

function makeNewMultipliers(){
	// height multiplier; width multiplier
	hm = Math.random();
	wm = Math.random();
    return [hm,wm];    
}

//Send movement information to client
function moveTarget(){
    var newMultipliers = makeNewMultipliers();
	io.emit('movement', {hm: newMultipliers[0], wm: newMultipliers[1]});
	setTimeout(function(){
		moveTarget();
	}, 2000);
};

// Start the game loop
function startGame() {
	moveTarget();
}
