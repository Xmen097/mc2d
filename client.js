function connectToServer() {
	socket=undefined;
	var elementToDelete = document.getElementById("socketIO");
	if(elementToDelete)
		elementToDelete.parentNode.removeChild(elementToDelete);
	include("https://"+ip+"/socket.io/socket.io.js", function() {
		remotePlayers=[];

		function Player(gtX, gtY, gtID, gtName, gtSlot) {
			this.id = gtID,
			this.name = gtName,
			this.x = gtX,
			this.y = gtY;
			this.component = new component(canvas.tileSize, 2*canvas.tileSize, "textures/player/playerRight.png", this.x, this.y, "image");
			this.slot = new inventorySpace(0, 0, items[parseInt(gtSlot)]);
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
			remotePlayers.push(new Player(parseInt(data.x*canvas.tileSize), parseInt(data.y*canvas.tileSize), parseInt(data.id), String(data.name), data.slot))
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
				movePlayer.component.texture=parseInt(data.texture) ? "textures/player/playerRight.png" : "textures/player/playerLeft.png";
				movePlayer.slot.item = items[data.slot]
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
					inventory.inventory[a][b].item = typeof parsedInv.inventory[a][b].item == "number" ? items[parsedInv.inventory[a][b].item] : undefined;
				}
			}
			for(var b=0;b<inventory.hotbar.length;b++) {
				inventory.hotbar[b].count = parsedInv.hotbar[b].count|0;
				inventory.hotbar[b].item = typeof parsedInv.hotbar[b].item == "number" ? items[parsedInv.hotbar[b].item] : undefined;
			}
			for(var b=0;b<inventory.armor.length;b++) {
				inventory.armor[b].count = parsedInv.armor[b].count|0;
				inventory.armor[b].item = typeof parsedInv.armor[b].item  == "number" ? items[parsedInv.armor[b].item] : undefined;
			}
			for(var a=0;a<crafting.length;a++) {
				crafting[a].count = parsedCrafting[a].count|0;
				crafting[a].item = typeof parsedCrafting[a].item  == "number" ? items[parsedCrafting[a].item] : undefined;
			}
			for(var a=0;a<craftingTable.length;a++) {
				craftingTable[a].count = parsedCraftingTable[a].count|0;
				craftingTable[a].item = typeof parsedCraftingTable[a].item  == "number" ? items[parsedCraftingTable[a].item] : undefined;
			}
			checkCraftingResult();
		}

		function salt(data) {
			if(data)
		    	socket.emit("new player", {name: name, token: sha256(loginToken+data)});
		}

		function onStorageBlock(data) {
			var parsedBlock = data.content;
			if(parsedBlock.length == 3) {
				for(var a=0;a<mpFurnace.length;a++) {
					mpFurnace[a].count = parsedBlock[a].count|0;
					mpFurnace[a].item = typeof parsedBlock[a].item == "number" ? items[parsedBlock[a].item] : undefined;
				}
				mpFurnace.x = data.x;
				mpFurnace.y = data.y;
				furnace = mpFurnace;
				furnaceArrowUI.percent=100*(data.smeltProgress/smeltingTime)
				furnaceFireUI.percent = Math.round((data.fuelProgress/data.maxFuel)*10)*10;
			} else if(parsedBlock.length == 27) {
				for(var a=0;a<mpChest.length;a++) {
					mpChest[a].count = parsedBlock[a].count|0;
					mpChest[a].item = typeof parsedBlock[a].item == "number" ? items[parsedBlock[a].item] : undefined;
				}
				mpChest.x = data.x;
				mpChest.y = data.y;
				chest = mpChest;		
			} 
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
