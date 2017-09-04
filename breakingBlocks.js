var destroingBlock;
var destroingTexture;
var breakMultiplier;

function breakBlock() {
	var startX = Math.floor((event.pageX - document.getElementById('canvas').offsetLeft + camera.x)/canvas.tileSize);
	var startY = Math.floor((event.pageY - document.getElementById('canvas').offsetTop + camera.y*-1)/canvas.tileSize);
	if(map[startY][startX] == -1 || materials[map[startY][startX]].durability == Infinity)
		return;
	if(breakMultiplier==Infinity) {
		materials[map[startY][startX]].drop.drop()
		map[startY][startX] = -1;
		renderMap();		
		return;
	}
	if(activeItem.item != undefined && activeItem.item.type == materials[map[startY][startX]].favType){
		breakMultiplier=activeItem.item.multiplier;
	}else if(activeItem.item != undefined && activeItem.item.type == materials[map[startY][startX]].favType2 &&  materials[map[startY][startX]].favType2 != undefined) {
		breakMultiplier=activeItem.item.multiplier;
	}else
		breakMultiplier= 1;
	destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/0.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
	socket.emit("block breaking", {x:startY, y:startX, progress: 0});
	destroingBlock = setTimeout(function() {
		destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/1.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
		socket.emit("block breaking", {x:startY, y:startX, progress: 1});
		destroingBlock = setTimeout(function() {
			destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/2.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
			socket.emit("block breaking", {x:startY, y:startX, progress: 2});	
			destroingBlock = setTimeout(function() {
				destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/3.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
				socket.emit("block breaking", {x:startY, y:startX, progress: 3});
				destroingBlock = setTimeout(function() {
					destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/4.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
					socket.emit("block breaking", {x:startY, y:startX, progress: 4});
					destroingBlock = setTimeout(function() {
						destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/5.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
						socket.emit("block breaking", {x:startY, y:startX, progress: 5});
						destroingBlock = setTimeout(function() {
							destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/6.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
							socket.emit("block breaking", {x:startY, y:startX, progress: 6});
							destroingBlock = setTimeout(function() {
								destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/7.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
								socket.emit("block breaking", {x:startY, y:startX, progress: 7});
								destroingBlock = setTimeout(function() {
									destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/8.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
									socket.emit("block breaking", {x:startY, y:startX, progress: 8});
									destroingBlock = setTimeout(function() {
										destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/9.png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
										socket.emit("block breaking", {x:startY, y:startX, progress: 9});
										destroingBlock = setTimeout(function() {
											destroingTexture = undefined;
											var pos = materials[map[startY][startX]].drop.drop()
											if(map[startY][startX] == 13) {
												for(var g=0; g<furnaceSaves.length; g++) {
													if(furnaceSaves[g].x == startX && furnaceSaves[g].y == startY) {
														for(var p of furnaceSaves[g].inventory) {
															if(p.item != undefined && p.count != 0)
																giveItemToBestInventoryPosition(p.item, p.count);
														}
														furnaceSaves.splice(g, 1);
														break;
													}
												}
											}
											map[startY][startX] = -1;
											if(playing==2) {
												socket.emit("map edit", {x:startY, y:startX, block: -1, pos: pos, active: inventory.hotbar.indexOf(activeItem)})//p
												socket.emit("block breaking", {x:0, y:0, progress: -1});
											}
											renderMap();
										}, (materials[map[startY][startX]].durability)/breakMultiplier)
									}, (materials[map[startY][startX]].durability)/breakMultiplier)
								}, (materials[map[startY][startX]].durability)/breakMultiplier)
							}, (materials[map[startY][startX]].durability)/breakMultiplier)
						}, (materials[map[startY][startX]].durability)/breakMultiplier)
					}, (materials[map[startY][startX]].durability)/breakMultiplier)
				}, (materials[map[startY][startX]].durability)/breakMultiplier)
			}, (materials[map[startY][startX]].durability)/breakMultiplier)
		}, (materials[map[startY][startX]].durability)/breakMultiplier)
	}, (materials[map[startY][startX]].durability)/breakMultiplier)
}