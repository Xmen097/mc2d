var inventoryUI;
var chestUI;
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
	this.reRender = function(editX, editY) {
		editX = editX || 0;
		editY = editY || 0;
		if(this.item != undefined){
			this.render = new component(itemSize, itemSize, this.item, this.x+camera.x+editX, this.y+camera.y*-1+editY, this.item.type || "material");	
			this.render.update()
			this.text = function() {
				context.fillStyle="white";
				context.font="10px Verdana";
				context.textAlign = "left";
				if(this.count > 1){
					context.fillText(this.count,this.x+camera.x+itemSize/5+editX,this.y+itemSize+camera.y*-1+editY)
				}
			}
			this.text();
		}else {
			this.render=undefined;
		}
	}
} 

var chestSaves = [];

var chestPreset = [new inventorySpace(84, 77), new inventorySpace(117, 77), new inventorySpace(150, 77), new inventorySpace(182, 77), new inventorySpace(215, 77), new inventorySpace(247, 77), new inventorySpace(280, 77), new inventorySpace(312, 77), new inventorySpace(345, 77),
			 new inventorySpace(84, 102), new inventorySpace(117, 102), new inventorySpace(150, 102), new inventorySpace(182, 102), new inventorySpace(215, 102), new inventorySpace(247, 102), new inventorySpace(280, 102), new inventorySpace(312, 102), new inventorySpace(345, 102),
			 new inventorySpace(84, 127), new inventorySpace(117, 127), new inventorySpace(150, 127), new inventorySpace(182, 127), new inventorySpace(215, 127), new inventorySpace(247, 127), new inventorySpace(280, 127), new inventorySpace(312, 127), new inventorySpace(345, 127)]
chest = copyArr(chestPreset);

var inventoryPreset = {
	armor: [new inventorySpace(84, 62, items[14], 1), new inventorySpace(84, 88, items[20], 1), new inventorySpace(84, 113, items[26], 1), new inventorySpace(84, 139, items[32], 1)],
	inventory: [[new inventorySpace(84, 171), new inventorySpace(117, 171), new inventorySpace(150, 171), new inventorySpace(182, 171), new inventorySpace(215, 171), new inventorySpace(247, 171), new inventorySpace(280, 171), new inventorySpace(312, 171), new inventorySpace(345, 171)],
				[new inventorySpace(84, 196), new inventorySpace(117, 196), new inventorySpace(150, 196), new inventorySpace(182, 196), new inventorySpace(215, 196), new inventorySpace(247, 196), new inventorySpace(280, 196), new inventorySpace(312, 196), new inventorySpace(345, 196)],
				[new inventorySpace(84, 221), new inventorySpace(117, 221), new inventorySpace(150, 221), new inventorySpace(182, 221), new inventorySpace(215, 221), new inventorySpace(247, 221), new inventorySpace(280, 221), new inventorySpace(312, 221), new inventorySpace(345, 221)]
				],
	hotbar: [new inventorySpace(84, 253), new inventorySpace(117, 253), new inventorySpace(150, 253), new inventorySpace(182, 253), new inventorySpace(215, 253), new inventorySpace(247, 253, items[47], 1), new inventorySpace(280, 253, items[41], 1), new inventorySpace(312, 253, items[38], 1), new inventorySpace(345, 253, items[34], 1)]			
}
inventory = copyArr(inventoryPreset);

function checkForInventoryOpen() {
	if(pressedKeys[keys.i] && !inventoryOn && !inventoryTimeout || pressedKeys[keys.e] && !inventoryOn && !inventoryTimeout) {
		inventoryUI = new component(359*canvas.width/500, 337*canvas.height/500, "textures/ui/inventory.png", camera.x + (canvas.width - 359*canvas.width/500)/2, camera.y*-1 + (canvas.height - 359*canvas.height/500)/2,"image");
		furnaceUI = undefined;
		craftingUI = undefined;
        for(var a of furnaceSaves) {
            if(a.active)
                furnaceSaves[furnaceSaves.indexOf(a)].active=false;
        }
		furnace = copyArr(furnaceInventoryPrefab);
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
	}else if(pressedKeys[keys.i] && inventoryOn && !inventoryTimeout || pressedKeys[keys.e] && inventoryOn && !inventoryTimeout) {
		inventoryUI = undefined;
		inventoryTimeout=true;
		inventoryOn=false;
		setTimeout(function() {inventoryTimeout=false}, timeoutTime)
	}
}
window.addEventListener('wheel', function(event){
	if(playing!=0) {
	    var whellDirection = event.deltaY < 0 ? 'up' : 'down';
	    if(whellDirection == "up" && activeSlot.slot != 1) {
	    	wheelSelectMe = activeSlot.slot-1;
	    	checkForHotbarItemSelect();
	    }else if(whellDirection == "down" && activeSlot.slot != 9) {
	    	wheelSelectMe = activeSlot.slot+1;
	    	checkForHotbarItemSelect();
	    }
	} else if(menuOn==2) {
	    var whellDirection = event.deltaY < 0 ? 'up' : 'down';
		if(whellDirection == "up" && viewPoint > 0) {
			viewPoint--;
			menus.selectSP();
		} else if(whellDirection == "down" && viewPoint < savedSPs.length-4) {
			viewPoint++;
			menus.selectSP();
		}
	} else if(menuOn=3) {
		if(whellDirection == "up" && viewPoint > 0) {
			viewPoint--;
			menus.selectMP();
		} else if(whellDirection == "down" && viewPoint < savedMPs.length-4) {
			viewPoint++;
			menus.selectMP();
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
