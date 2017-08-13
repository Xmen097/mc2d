function connectToServer() {//f
	include("https://"+ip+"/socket.io/socket.io.js", function() {
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
			map[data.x][data.y] = data.block
			renderMap();
		}

		function onNewMap(data) {
			map=data;
			renderMap();
		}

		function onInventory(data) {
			for(var a of data) {
				if(a.id < materials.length) {
					var item=materials[a.id];	
				} else {
					for(var b of items) {
						if(b.id == a.id) {
							item = b;
							break;
						}
					}
				}
				inventory.inventory[a.y][a.x].count=data.amount;

				if(a.y < 3) {
					inventory.inventory[a.y][a.x].item = item;
				} else if(a.y == 3) {
					inventory.hotbar[a.x].item = item;
				} else if(a.y == 4) {
					inventory.armor[a.x].item = item;
				}
			}

		}

		function salt(data) {
		    socket.emit("new player", {x: player.x, y: player.y, name: name, token: sha256(loginToken+data)});
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
    	socket.on("new map", onNewMap);
    	socket.on("salt", salt);
    	socket.on("inventory", onInventory);
	    if(map) {
	    	startMP();
	    }
	});	
}
