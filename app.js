var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Where the server stores all final scores
var scores = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  // var socketIds = Object.keys(io.engine.clients);
  console.log("a user connected");

  //upon connecting, emit that a new player has joined
  socket.broadcast.emit('joined', {id: socket.id});

  //Send the location of the user's mouse pointer to others
  socket.on("coordinates", function(coordinates){
    socket.broadcast.emit("otherPlayerMove", { coordinates: coordinates, id: socket.id });
  });

  //Remove that user's pointer
  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected', {id: socket.id});
  });

  //Gather the scores from each socket on the server
  socket.on('submit-score', function(data) {
  	var id = socket.id;
  	scores[id] = data.score;
    console.log(scores);
  });

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
};

// Start the game loop. Speed in ms.
function playGame(turns, speed) {
	scores = {};
	var moveCount = 0;
	var turns = turns; 
	var gameLoop = setInterval(function() { 
		if (moveCount == turns){
			console.log('ending game loop');
			io.emit('gameover');
			clearInterval(gameLoop);
		}
		else {
			moveTarget();
			moveCount++;
		}
	}, speed);
};

playGame(10,2000);
