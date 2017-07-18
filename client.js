
function connectToServer() {
	include("https://"+ip+"/socket.io/socket.io.js", function() {
		//map=undefined;
		remotePlayers=[];

		function Player(gtX, gtY, gtID, gtName) {
			this.id = gtID,
			this.name = gtName,
			this.x = gtX,
			this.y = gtY;
			this.component = new component(canvas.tileSize, 2*canvas.tileSize, "textures/player/steveRight.png", this.x, this.y, "image");
		}

		function playerById(id) {
		    for (var i = 0; i < remotePlayers.length; i++) {
		        if (remotePlayers[i].id == id)
		            return remotePlayers[i];
		    };
		}

		function onConnected() {
		    console.log("Connected to server");
		    socket.emit("new player", {x: player.x, y: player.y});
		};

		function onDisconnect() {
		    console.log("Disconnected from server");
		};

		function onNewPlayer(data) {
			console.log("New player has connected to server")
			remotePlayers.push(new Player(data.x, data.y, data.id, data.name))
		}

		function onRemovePlayer(data) {
			console.log("Player has disconnected")
			var removePlayer = playerById(data.id);

			if (removePlayer) {
				remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
			};

		}

		function onNewMessage(data) {
			if(messagesList.length==maxSavedMessages) {
				var tempMessagesList=[];
				for(var a=maxSavedMessages-1; a>0; a--) {
					tempMessagesList[a-1] = messagesList[a]
				}
				messagesList=tempMessagesList;
				messagesList[maxSavedMessages-1]=data.name+": "+data.message
			}else
				messagesList.push(data.name+": "+data.message)
		}

		function onMovePlayer(data) {
			var movePlayer=playerById(data.id)
			if(movePlayer) {
				movePlayer.x=data.x;
				movePlayer.component.x=data.x;
				movePlayer.y=data.y;
				movePlayer.component.y=data.y;
				movePlayer.component.texture=data.texture;
			}
		}

		function onMapEdit(data) {
			map=data;
			renderMap();
		}

		function onBlockBreaking(data) {
			if(data.progress == -1) {
				delete remoteDestroingBlock[data.id];
				console.log("dwd")
			} else {
				remoteDestroingBlock[data.id] = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/"+data.progress+".png", data.y*canvas.tileSize, data.x*canvas.tileSize, "image");
			}
		}
		if(parseInt(ip.split(":")[1])) {
			socket = io.connect(ip.split(":")[0], {port: parseInt(ip.split(":")[1]), transports: ["websocket"]});
		}else {
			socket = io.connect(ip.split(":")[0], {transports: ["websocket"]});
		}
		socket.on("connect", onConnected);
	    socket.on("disconnect", onDisconnect);
	    socket.on("new player", onNewPlayer);
	    socket.on("remove player", onRemovePlayer);
	    socket.on("move player", onMovePlayer);
	    socket.on("map edit", onMapEdit);
    	socket.on("new message", onNewMessage);
    	socket.on("block breaking", onBlockBreaking);
	    if(map) {
	    	startMP();
	    }
	});	
}
