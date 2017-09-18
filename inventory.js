var inventoryUI;
var inventoryOn;
var inventoryTimeout;
var timeoutTime=150;
var itemSize=20;
var wheelSelectMe=1;

function inventorySpace(x, y, item, count) {
	this.item = item;
	this.x = x || 0;
	this.y = y || 0;
	this.count = count || 0;
	this.reRender = function() {
		if(this.item != undefined){
			this.render = new component(itemSize, itemSize, this.item, this.x+camera.x, this.y+camera.y*-1, this.item.type || "material");	
			this.text = function() {
				context.fillStyle="white";
				context.font="10px Verdana";
				if(this.count > 1){
					context.fillText(this.count,this.x+camera.x+itemSize/5,this.y+itemSize+camera.y*-1)
				}
			}
		}else {
			this.render=undefined;
		}
	}
} 

var inventory = {
	armor: [new inventorySpace(84, 62, items.leatherHelmet, 1), new inventorySpace(84, 88, items.chainChestplate, 1), new inventorySpace(84, 113, items.ironTrousers, 1), new inventorySpace(84, 139, items.goldenShoes, 1)],
	inventory: [[new inventorySpace(84, 171), new inventorySpace(117, 171), new inventorySpace(150, 171), new inventorySpace(182, 171), new inventorySpace(215, 171), new inventorySpace(247, 171), new inventorySpace(280, 171), new inventorySpace(312, 171), new inventorySpace(345, 171)],
				[new inventorySpace(84, 196), new inventorySpace(117, 196), new inventorySpace(150, 196), new inventorySpace(182, 196), new inventorySpace(215, 196), new inventorySpace(247, 196), new inventorySpace(280, 196), new inventorySpace(312, 196), new inventorySpace(345, 196)],
				[new inventorySpace(84, 221), new inventorySpace(117, 221), new inventorySpace(150, 221), new inventorySpace(182, 221), new inventorySpace(215, 221), new inventorySpace(247, 221), new inventorySpace(280, 221), new inventorySpace(312, 221), new inventorySpace(345, 221)]
				],
	hotbar: [new inventorySpace(84, 253), new inventorySpace(117, 253), new inventorySpace(150, 253), new inventorySpace(182, 253), new inventorySpace(215, 253), new inventorySpace(247, 253, items.ironShovel, 1), new inventorySpace(280, 253, items.ironAxe, 1), new inventorySpace(312, 253, items.diamondPickaxe, 1), new inventorySpace(345, 253, items.scissors, 1)]			
}

var hotbar= [new inventorySpace(84, 298), new inventorySpace(117, 298), new inventorySpace(150, 298), new inventorySpace(182, 298), new inventorySpace(215, 298), new inventorySpace(247, 298), new inventorySpace(280, 298), new inventorySpace(312, 298), new inventorySpace(345, 298)]

function checkForInventoryOpen() {
	if(pressedKeys[keys.i] && !inventoryOn && !inventoryTimeout) {
		inventoryUI = new component(359*canvas.width/500, 337*canvas.height/500, "textures/ui/inventory.png", camera.x + (canvas.width - 359*canvas.width/500)/2, camera.y*-1 + (canvas.height - 359*canvas.height/500)/2,"image");
		furnaceUI = undefined;
		craftingUI = undefined;
        for(var a of furnaceSaves) {
            if(a.active)
                furnaceSaves[furnaceSaves.indexOf(a)].active=false;
        }
		furnace = furnaceInventoryPrefab;
		for(var a of inventory.armor) {
			if(a.item != undefined)
				a.reRender();
		}	
		for(var a of inventory.hotbar) {
			if(a.item != undefined)
				a.reRender();
		}	
		for(var a of crafting) {
			if(a.item != undefined)
				a.reRender();
		}	
		for (var m of inventory.inventory) {
			for(var a of m) {
				if(a.item != undefined)
					a.reRender();
			}				
		}
		inventoryTimeout=true;
		inventoryOn=true;
		setTimeout(function() {inventoryTimeout=false;}, timeoutTime);
	}else if(pressedKeys[keys.i] && inventoryOn && !inventoryTimeout) {
		inventoryUI = undefined;
		inventoryTimeout=true;
		inventoryOn=false;
		setTimeout(function() {inventoryTimeout=false}, timeoutTime)
	}
}
window.addEventListener('mousewheel', function(event){
	console.log("Mouse wheel " + event.wheelDelta)
	if(playing!=0) {
	    var whellDirection = event.wheelDelta < 0 ? 'down' : 'up';
	    if(whellDirection == "up" && activeSlot.slot != 1) {
	    	wheelSelectMe = activeSlot.slot-1;
	    	checkForHotbarItemSelect();
	    }else if(whellDirection == "down" && activeSlot.slot != 9) {
	    	wheelSelectMe = activeSlot.slot+1;
	    	checkForHotbarItemSelect();
	    }
	}
});
function checkForHotbarItemSelect() {
	if(pressedKeys[keys._1] && activeSlot.slot != 1 || wheelSelectMe == 1) {
		activeSlot.slot = 1;
		activeItem = inventory.hotbar[0]
		activeSlot.x -= (131 + activeSlot.slotPosition);
		activeSlot.slotPosition = -131;
	}else if(pressedKeys[keys._2] && activeSlot.slot != 2 || wheelSelectMe == 2) {
		activeSlot.slot = 2;
		activeItem = inventory.hotbar[1]
		activeSlot.x -= (98 + activeSlot.slotPosition);
		activeSlot.slotPosition = -98;
	}else if(pressedKeys[keys._3] && activeSlot.slot != 3 || wheelSelectMe == 3) {
		activeSlot.slot = 3;
		activeItem = inventory.hotbar[2]
		activeSlot.x -= (65 + activeSlot.slotPosition);
		activeSlot.slotPosition = -65;
	}else if(pressedKeys[keys._4] && activeSlot.slot != 4 || wheelSelectMe == 4) {
		activeSlot.slot = 4;
		activeItem = inventory.hotbar[3]
		activeSlot.x -= (32 + activeSlot.slotPosition);
		activeSlot.slotPosition = -32;
	}else if(pressedKeys[keys._5] && activeSlot.slot != 5 || wheelSelectMe == 5) {
		activeSlot.slot = 5;
		activeItem = inventory.hotbar[4]
		activeSlot.x -= (0 + activeSlot.slotPosition);
		activeSlot.slotPosition = 0;
	}else if(pressedKeys[keys._6] && activeSlot.slot != 6 || wheelSelectMe == 6) {
		activeSlot.slot = 6;
		activeItem = inventory.hotbar[5]
		activeSlot.x -= (-34 + activeSlot.slotPosition);
		activeSlot.slotPosition = 34;
	}else if(pressedKeys[keys._7] && activeSlot.slot != 7 || wheelSelectMe == 7) {
		activeSlot.slot = 7;
		activeItem = inventory.hotbar[6]
		activeSlot.x -= (-67 + activeSlot.slotPosition);
		activeSlot.slotPosition = 67;
	}else if(pressedKeys[keys._8] && activeSlot.slot != 8 || wheelSelectMe == 8) {
		activeSlot.slot = 8;
		activeItem = inventory.hotbar[7]
		activeSlot.x -= (-100 + activeSlot.slotPosition);
		activeSlot.slotPosition = 100;
	}else if(pressedKeys[keys._9] && activeSlot.slot != 9 || wheelSelectMe == 9) {
		activeSlot.slot = 9;
		activeItem = inventory.hotbar[8]
		activeSlot.x -= (-133 + activeSlot.slotPosition);
		activeSlot.slotPosition = 133;
	}
	wheelSelectMe=undefined;

}
