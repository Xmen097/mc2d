var inventoryUI;
var chestUI;
var inventoryOn;
var inventoryTimeout;
var timeoutTime=150;
var itemSize=20*tileMultiplier;
var wheelSelectMe=1;

function inventorySpace(x, y, item, count) {
	this.item = item;
	this.x = x*tileMultiplier || 0;
	this.y = y*tileMultiplier || 0;
	this.count = count || 0;
	this.reRender = function(editX, editY, absolute, turn) {
		absolute = absolute ? 0 : 1
		editX = editX*tileMultiplier || 0;
		editY = editY*tileMultiplier || 0;
		if(this.item != undefined){
			this.render = new component(itemSize*(this.item.type&&!absolute&&this.item.type!="item"?2:1), itemSize*(this.item.type&&!absolute&&this.item.type!="item"?2:1), this.item, (this.item.type&&!absolute&&this.item.type!="item"?0:1)*(absolute*this.x+camera.x+editX), (this.item.type&&!absolute&&this.item.type!="item"?0:1)*(absolute*this.y+camera.y*-1+editY), this.item.type || "material");	
			if(this.item.type&&!absolute&&this.item.type!="item") {
				context.save()
				context.transform(1,0,0,1,camera.x+editX-10*tileMultiplier,camera.y*-1+editY-35*tileMultiplier);
				if(typeof turn == "undefined" && player.texture != "textures/player/playerRight.png" || turn) {
					context.scale(-1,1)
				}
				context.transform(1,0,0,1,20*tileMultiplier,0);
				context.rotate(0.6);
			} else if(!absolute) {
				this.render.x-=20*tileMultiplier;
			}
			this.render.update()
			if(this.item.type&&!absolute&&this.item.type!="item") {
				context.restore();
			}
			this.text = function() {
				context.fillStyle="white";
				context.font=Math.round(7.5*tileMultiplier)+"px Verdana";
				context.textAlign = "left";
				if(this.count > 1 && absolute){
					context.fillText(this.count,absolute*this.x+camera.x+itemSize/5+editX,absolute*this.y+itemSize+camera.y*-1+editY)
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
	armor: [new inventorySpace(84, 62), new inventorySpace(84, 88), new inventorySpace(84, 113), new inventorySpace(84, 139)],
	inventory: [[new inventorySpace(84, 170), new inventorySpace(117, 170), new inventorySpace(150, 170), new inventorySpace(181, 170), new inventorySpace(214, 170), new inventorySpace(246, 170), new inventorySpace(279, 170), new inventorySpace(311, 170), new inventorySpace(343, 170)],
				[new inventorySpace(84, 196), new inventorySpace(117, 196), new inventorySpace(150, 196), new inventorySpace(181, 196), new inventorySpace(214, 196), new inventorySpace(246, 196), new inventorySpace(279, 196), new inventorySpace(311, 196), new inventorySpace(343, 196)],
				[new inventorySpace(84, 222), new inventorySpace(117, 222), new inventorySpace(150, 222), new inventorySpace(181, 222), new inventorySpace(214, 222), new inventorySpace(246, 222), new inventorySpace(279, 222), new inventorySpace(311, 222), new inventorySpace(343, 222)]
				],
	hotbar: [new inventorySpace(84, 253), new inventorySpace(117, 253), new inventorySpace(150, 253), new inventorySpace(181, 253), new inventorySpace(214, 253), new inventorySpace(246, 253, items[47], 1), new inventorySpace(279, 253, items[41], 1), new inventorySpace(311, 253, items[38], 1), new inventorySpace(343, 253, items[34], 1)]			
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
function checkForHotbarItemSelect() {
	if(pressedKeys[keys._1] && activeSlot.slot != 1 || wheelSelectMe == 1) {
		activeSlot.slot = 1;
		activeItem = inventory.hotbar[0]
		activeSlot.x -= (131*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = -131*tileMultiplier;
	}else if(pressedKeys[keys._2] && activeSlot.slot != 2 || wheelSelectMe == 2) {
		activeSlot.slot = 2;
		activeItem = inventory.hotbar[1]
		activeSlot.x -= (98*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = -98*tileMultiplier;
	}else if(pressedKeys[keys._3] && activeSlot.slot != 3 || wheelSelectMe == 3) {
		activeSlot.slot = 3;
		activeItem = inventory.hotbar[2]
		activeSlot.x -= (65*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = -65*tileMultiplier;
	}else if(pressedKeys[keys._4] && activeSlot.slot != 4 || wheelSelectMe == 4) {
		activeSlot.slot = 4;
		activeItem = inventory.hotbar[3]
		activeSlot.x -= (32*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = -32*tileMultiplier;
	}else if(pressedKeys[keys._5] && activeSlot.slot != 5 || wheelSelectMe == 5) {
		activeSlot.slot = 5;
		activeItem = inventory.hotbar[4]
		activeSlot.x -= (0 + activeSlot.slotPosition);
		activeSlot.slotPosition = 0;
	}else if(pressedKeys[keys._6] && activeSlot.slot != 6 || wheelSelectMe == 6) {
		activeSlot.slot = 6;
		activeItem = inventory.hotbar[5]
		activeSlot.x -= (-32*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = 32*tileMultiplier;
	}else if(pressedKeys[keys._7] && activeSlot.slot != 7 || wheelSelectMe == 7) {
		activeSlot.slot = 7;
		activeItem = inventory.hotbar[6]
		activeSlot.x -= (-64*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = 64*tileMultiplier;
	}else if(pressedKeys[keys._8] && activeSlot.slot != 8 || wheelSelectMe == 8) {
		activeSlot.slot = 8;
		activeItem = inventory.hotbar[7]
		activeSlot.x -= (-97*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = 97*tileMultiplier;
	}else if(pressedKeys[keys._9] && activeSlot.slot != 9 || wheelSelectMe == 9) {
		activeSlot.slot = 9;
		activeItem = inventory.hotbar[8]
		activeSlot.x -= (-130*tileMultiplier + activeSlot.slotPosition);
		activeSlot.slotPosition = 130*tileMultiplier;
	}
	wheelSelectMe=undefined;

}
