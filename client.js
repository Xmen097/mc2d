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
			socket.disconnect();
			remotePlayers=undefined;
			socket=undefined;
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
			inventory = copyArr(inventoryPreset);
			crafting = copyArr(craftingPreset);
			craftingTable = copyArr(craftingTablePreset)
			var parsedInv = JSON.parse(data.inventory);
			var parsedCrafting = JSON.parse(data.crafting);
			var parsedCraftingTable = JSON.parse(data.craftingtable);
			for(var a=0;a<inventory.inventory.length;a++) {
				for(var b=0;b<inventory.inventory[a].length;b++) {
					inventory.inventory[a][b].count = parsedInv.inventory[a][b].count|0;
					inventory.inventory[a][b].item = parsedInv.inventory[a][b].item ? items[parsedInv.inventory[a][b].item] : undefined;
				}
			}
			for(var b=0;b<inventory.hotbar.length;b++) {
				inventory.hotbar[b].count = parsedInv.hotbar[b].count|0;
				inventory.hotbar[b].item = parsedInv.hotbar[b].item ? items[parsedInv.hotbar[b].item] : undefined;
			}
			for(var b=0;b<inventory.armor.length;b++) {
				inventory.armor[b].count = parsedInv.armor[b].count|0;
				inventory.armor[b].item = parsedInv.armor[b].item ? items[parsedInv.armor[b].item] : undefined;
			}
			for(var a=0;a<crafting.length;a++) {
				crafting[a].count = parsedCrafting[a].count|0;
				crafting[a].item = parsedCrafting[a].item ? items[parsedCrafting[a].item] : undefined;
			}
			for(var a=0;a<craftingTable.length;a++) {
				craftingTable[a].count = parsedCraftingTable[a].count|0;
				craftingTable[a].item = parsedCraftingTable[a].item ? items[parsedCraftingTable[a].item] : undefined;
			}
			checkCraftingResult();
		}

		function salt(data) {
			if(data)
		    	socket.emit("new player", {name: name, token: sha256(loginToken+data)});
		}

		function onStorageBlock(data) {
			var parsedFurnace = JSON.parse(data);
			for(var a=0;a<mpFurnace.length;a++) {
				mpFurnace[a].count = parsedFurnace[a].count|0;
				mpFurnace[a].item = parsedFurnace[a].item ? items[parsedFurnace[a].item] : undefined;
			}
			furnace = copyArr(mpFurnace);
		}

		function onBlockBreaking(data) {
			if(parseInt(data.progress) == -1) {
				delete remoteDestroingBlock[parseInt(data.id)];
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
    	socket.on("storage block", onStorageBlock);
	}, "socketIO");	
}
