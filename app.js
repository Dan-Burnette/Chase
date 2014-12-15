var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Where the server stores all final scores
var scores;
var socketIds;
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  socketIds = Object.keys(io.engine.clients);
  console.log("a user connected");

  //upon connecting, emit that a new player has joined
  socket.broadcast.emit('joined', {id: socket.id});

  //When a new client joins it will request players
  socket.on('request-players', function(){
    socket.emit('recieve-players', {players: socketIds.slice(1) } );
  });

  //Send the location of the user's mouse pointer to others
  socket.on("coordinates", function(coordinates){
    socket.broadcast.emit("otherPlayerMove", { coordinates: coordinates, id: socket.id });
  });

  //Remove that user's pointer
  socket.on('disconnect', function () {
  	socketIds = Object.keys(io.engine.clients);
    io.sockets.emit('user disconnected', {id: socket.id});
  });

  //Gather the scores from each socket on the server
  socket.on('submit-score', function(data) {
  	var id = socket.id;
  	scores[id] = data.score;
    //if the last score to be submitted (socketIds-1 because server counts as a socket)
    if (Object.keys(scores).length == socketIds.length-1) {
    	console.log(scores);
    	io.sockets.emit('recieve-scores', { scores: scores});
    }
  });

});

server.listen(3000, function() {
	console.log("Listening on port 3000...");
});


var makeNewMultipliers = function(){
	// height multiplier; width multiplier
	hm = Math.random();
	wm = Math.random();
    return [hm,wm];    
}

//Send movement information to client
var moveTarget = function(){
    var newMultipliers = makeNewMultipliers();
	  io.emit('movement', {hm: newMultipliers[0], wm: newMultipliers[1]});
};

// Start the game loop. Speed in ms. Resets game variables.
var playGame = function(turns, speed) {
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

playGame(100,3000);
