var timeout=false;
var atGround=false;
var speed = Math.round(11*tileMultiplier);
var gravity = 0.25*tileMultiplier;
var jump=false;

function checkForMove() {
    if((pressedKeys[keys.a] || pressedKeys[keys.left]) && player.x > 0) {
        var canMove=true;
        var movePos=Math.floor((player.x-speed)/canvas.tileSize)
        var startPos=Math.floor(player.x/canvas.tileSize)
        for(var a=startPos;a>=movePos;a--) {
            if(map[Math.ceil(player.y/canvas.tileSize)+1][a] != -1 || map[Math.ceil(player.y/canvas.tileSize)][a] != -1) {
                canMove=false;            
                var move= Math.min(Math.max(0, player.x - Math.round((a+0.6)*canvas.tileSize)), speed);
                player.x -= move;            
                if(camera.x-move >= 0 && player.x <= map[0].length*canvas.tileSize - (canvas.width+canvas.tileSize)/2) {   
                    camera.x -= move;
                    hotbarUI.x -= move;    
                    activeSlot.x -= move;
                } else if(camera.x > 0 && player.x <= map[0].length*canvas.tileSize - (canvas.width+canvas.tileSize)/2) {
                    hotbarUI.x -= camera.x;   
                    activeSlot.x -= camera.x;
                    camera.x = 0;
                }
                break;
            }
        }
        if(canMove) {
            if(camera.x-speed >= 0 && player.x <= map[0].length*canvas.tileSize - (canvas.width+canvas.tileSize)/2) {   
                camera.x -= speed;
                hotbarUI.x -= speed;    
                activeSlot.x -= speed;
            } else if(camera.x > 0 && player.x <= map[0].length*canvas.tileSize - (canvas.width+canvas.tileSize)/2) {
                hotbarUI.x -= camera.x;    
                activeSlot.x -= camera.x;
                camera.x = 0;
            }
            player.x -= speed;
        }
        renderMap();
        player.texture = "textures/player/playerLeft.png";
        inventoryUI = undefined;
        furnaceUI = undefined;
        craftingUI=undefined;
        chestUI=undefined;
        for(var a of furnaceSaves) {
            if(a.active)
                furnaceSaves[furnaceSaves.indexOf(a)].active=false;
        }
        furnace = copyArr(furnaceInventoryPrefab);
        inventoryOn=false;

    } 
    if((pressedKeys[keys.d] || pressedKeys[keys.right]) && player.x < map[0].length*canvas.tileSize - canvas.tileSize) {
    	var canMove=true;
        var movePos=Math.ceil((player.x+speed)/canvas.tileSize)
        var startPos=Math.ceil(player.x/canvas.tileSize)
        for(var a=startPos;a<=movePos;a++) {
            if(map[Math.ceil(player.y/canvas.tileSize)+1][a] != -1 || map[Math.ceil(player.y/canvas.tileSize)][a] != -1) {
                canMove=false;            
                var move= Math.min(Math.max(0, Math.round((a-0.6)*canvas.tileSize)-player.x), speed);
                player.x += move;            
                if(camera.x+move <= map[0].length*canvas.tileSize-canvas.width && player.x >= (canvas.width - canvas.tileSize)/2) {   
                    camera.x += move;
                    hotbarUI.x += move;    
                    activeSlot.x += move;
                } else if(camera.x < map[0].length*canvas.tileSize-canvas.width && player.x >= (canvas.width - canvas.tileSize)/2) {
                    hotbarUI.x += camera.x;   
                    activeSlot.x += camera.x;
                    camera.x = 0;
                }
                break;
            }
        }
        if(canMove) {
    		if(camera.x+speed <= map[0].length*canvas.tileSize-canvas.width && player.x >= (canvas.width - canvas.tileSize)/2) {
    			camera.x += speed;
                hotbarUI.x += speed;
                activeSlot.x += speed;
    		} else if(camera.x < map[0].length*canvas.tileSize-canvas.width && player.x >= (canvas.width - canvas.tileSize)/2) {
                var move = map[0].length*canvas.tileSize-canvas.width-camera.x
                camera.x += move;
                hotbarUI.x += move;
                activeSlot.x += move;
            }
            player.x += speed;
        }
		renderMap();
    	player.texture = "textures/player/playerRight.png";
		inventoryUI = undefined;
        furnaceUI = undefined;
        craftingUI=undefined;
        chestUI=undefined;
        for(var a of furnaceSaves) {
            if(a.active)
                furnaceSaves[furnaceSaves.indexOf(a)].active=false;
        }
        furnace = copyArr(furnaceInventoryPrefab);
		inventoryOn=false;
    } if((pressedKeys[keys.w] || pressedKeys[keys.up]) && atGround) {
    	if(map[Math.floor(player.y/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)] == -1) {
    		jump=true;	
    		timeout=true;
    		atGround=false;
			inventoryUI = undefined;
            furnaceUI = undefined;
            craftingUI=undefined;
            chestUI=undefined;
            for(var a of furnaceSaves) {
                if(a.active)
                    furnaceSaves[furnaceSaves.indexOf(a)].active=false;
            }
            furnace = furnaceInventoryPrefab;
			inventoryOn=false;
    		for(a=0;a<10;a++) {
        		setTimeout(function() {
        			if(map[Math.ceil(player.y/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)] == -1) {
        				camera.y += 2*speed;
                        hotbarUI.y -= 2*speed;
                        activeSlot.y -= 2*speed;
        				player.y -= 2*speed;
    				renderMap();
        			}else
        			return;
        		}, a*10);    
    		}
    	}

    }
}