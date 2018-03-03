function connectToServer() {
	socket=undefined;
	var elementToDelete = document.getElementById("socketIO");
	if(elementToDelete)
		elementToDelete.parentNode.removeChild(elementToDelete);
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

		function onDisconnect(data) {
			menus.selectMP();
			if(data && data != "booted")
				alert(data);
			remotePlayers=undefined;
			socket=undefined;
			var elementToDelete = document.getElementById("socketIO");
			if(elementToDelete)
				elementToDelete.parentNode.removeChild(elementToDelete);
		};

		function onNewPlayer(data) {
			console.log("New player has connected to server")
			remotePlayers.push(new Player(parseInt(data.x), parseInt(data.y), parseInt(data.id), String(data.name)))
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
				messagesList[maxSavedMessages-1]=String(data.name)+": "+String(data.message);
			}else
				messagesList.push(String(data.name)+": "+String(data.message));
		}

		function onMovePlayer(data) {
			var movePlayer=playerById(parseInt(data.id));
			if(movePlayer) {
				movePlayer.x=parseInt(data.x);
				movePlayer.component.x=parseInt(data.x);
				movePlayer.y=parseInt(data.y);
				movePlayer.component.y=parseInt(data.y);
				movePlayer.component.texture=parseInt(data.texture) ? "textures/player/steveRight.png" : "textures/player/steveLeft.png";
			}
		}

		function onMapEdit(data) {
			map[parseInt(data.x)][parseInt(data.y)] = parseInt(data.block)
			renderMap();
		}

		function onNewMap(data) {
			map=data;
			renderMap();
	    	startMP();
		}

		function onInventory(data) {
			console.log(data);
			for(var a of data) {
				if(a.amount) {
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
				} else {
					item = undefined;
				}
				if(a.y < 3) {
					inventory.inventory[a.y][a.x].item=item;
					inventory.inventory[a.y][a.x].count=a.amount;
				} else if(a.y == 3) {
					inventory.hotbar[a.x].item=item;
					inventory.hotbar[a.x].count=a.amount;
				} else if(a.y == 4) {
					inventory.armor[a.x].item=item;
					inventory.armor[a.x].count=a.amount;
				}
			}

		}

		function salt(data) {
		    socket.emit("new player", {name: name, token: sha256(loginToken+data)});
		}

		function onBlockBreaking(data) {
			if(parseInt(data.progress) == -1) {
				delete remoteDestroingBlock[parseInt(data.id)];
				console.log("dwd")
			} else {
				remoteDestroingBlock[parseInt(data.id)] = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/"+parseInt(data.progress)+".png", parseInt(data.y)*canvas.tileSize, parseInt(data.x)*canvas.tileSize, "image");
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
	}, "socketIO");	
}
