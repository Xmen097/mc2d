var destroingBlock = [];
var destroingTexture;
var breakMultiplier;

function breakBlock(event) { 
	var startX = Math.floor((event.pageX - document.getElementById('canvas').offsetLeft + camera.x)/canvas.tileSize);
	var startY = Math.floor((event.pageY - document.getElementById('canvas').offsetTop + camera.y*-1)/canvas.tileSize);
	if(map[startY][startX] == -1 || items[map[startY][startX]].durability == Infinity && breakMultiplier!=Infinity)
		return;
	if(breakMultiplier==Infinity) {
		items[map[startY][startX]].drop.drop()
		map[startY][startX] = -1;
		renderMap();	
		if(playing==2)
			socket.emit("map edit", {x:startY, y:startX, block: -1, active: inventory.hotbar.indexOf(activeItem)})	
		return;
	}
	if(activeItem.item != undefined && activeItem.item.type == items[map[startY][startX]].favType){
		breakMultiplier=activeItem.item.multiplier;
	}else if(activeItem.item != undefined && activeItem.item.type == items[map[startY][startX]].favType2 &&  items[map[startY][startX]].favType2 != undefined) {
		breakMultiplier=activeItem.item.multiplier;
	}else
		breakMultiplier= 1;
	for (let i=0; i < 10;i++) {
		destroingBlock[i] = setTimeout(function() {
			destroingTexture = new component(canvas.tileSize, canvas.tileSize, "textures/breaking/"+i+".png", startX*canvas.tileSize, startY*canvas.tileSize, "image");
			if(playing==2)
				socket.emit("block breaking", {x:startY, y:startX, progress: i});
		}, i*(items[map[startY][startX]].durability/breakMultiplier))
	}
	destroingBlock[10] = setTimeout(function() {
		destroingTexture = undefined;
		items[map[startY][startX]].drop.drop()
		console.log(items[map[startY][startX]].drop);
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
			socket.emit("map edit", {x:startY, y:startX, block: -1, active: inventory.hotbar.indexOf(activeItem)})
			socket.emit("block breaking", {x:0, y:0, progress: -1});
		}
		renderMap();
	}, 10*(items[map[startY][startX]].durability)/breakMultiplier)
}