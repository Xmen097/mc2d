var timeout=false;
var atGround=false;
var speed = 10; //Values bigger, than 10 are buggy. 5 is ideal
var gravity = 0.25;
var jump=false;

function checkForMove() {
    if(pressedKeys[keys.a] && player.x > 0 || pressedKeys[keys.left] && player.x > 0) {
    	if(map[Math.ceil((player.y + player.height)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)-1] == -1 && map[Math.ceil((player.y + player.height)/canvas.tileSize)-2][Math.round(player.x/canvas.tileSize)-1] == -1 || map[Math.ceil((player.y + player.height)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)-1] == undefined || Math.round((Math.round(player.x/canvas.tileSize)-player.x/canvas.tileSize)*10)/10 != 0.4) {
    		if(camera.x >0 && player.x <= map[0].length*canvas.tileSize - (canvas.width+canvas.tileSize)/2 ) {	
    			camera.x -= speed;
                hotbarUI.x -= speed;	
                activeSlot.x -= speed;
    		}
    		player.x -= speed;
			renderMap();
       		player.texture = "textures/player/steveLeft.png";
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

    } if(pressedKeys[keys.d] && player.x < map[0].length*canvas.tileSize - canvas.tileSize || pressedKeys[keys.right] && player.x < map[0].length*canvas.tileSize - canvas.tileSize) {
    	if(map[Math.ceil((player.y + player.height)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)+1] == -1 && map[Math.ceil((player.y + player.height)/canvas.tileSize)-2][Math.round(player.x/canvas.tileSize)+1] == -1 || Math.round((Math.round(player.x/canvas.tileSize)-player.x/canvas.tileSize)*10)/10 != -0.4) {
    		if(camera.x < map[0].length*canvas.tileSize-canvas.width && player.x >= (canvas.width - canvas.tileSize)/2) {
    			camera.x += speed;
                hotbarUI.x += speed;
                activeSlot.x += speed;
    		}
			player.x += speed;
			renderMap();
        	player.texture = "textures/player/steveRight.png";
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
    } if(pressedKeys[keys.w] && atGround || pressedKeys[keys.up] && atGround) {
    	if(map[Math.floor((player.y)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)] == -1) {
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
    			if(map[Math.ceil((player.y + player.height)/canvas.tileSize)-3][Math.round(player.x/canvas.tileSize)] == -1) {
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