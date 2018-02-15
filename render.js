var renderedTile = []

function component(width, height, texture, x, y, itemType, percent) {
   	this.image = new Image();
	this.itemType = itemType;
    this.width = width;
    this.percent = percent||0;
    this.height = height;
    this.texture = texture;
    this.x = x;
    this.y = y; ;
    this.update = function() {
        if(this.itemType == "image") {
            this.image.src = this.texture;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }else if(this.itemType == "material") {
      	    this.image.src = "textures/blockSheet.png";
            context.drawImage(this.image, (this.texture.x%14)*70+1, Math.floor(this.texture.x/14)*70+1, 69, 69, this.x, this.y, this.width, this.height);
        } else if(this.itemType == "furnaceArrow") {
            this.image.src = "textures/ui/furnaceArrow.png";
            context.drawImage(this.image, 0, 0, Math.round(this.percent/2.27272727273), 30, this.x, this.y, this.percent/(100/this.width), this.height);
        } else if(this.itemType == "furnaceFire") {
            this.image.src = "textures/ui/furnaceFire.png";
            context.drawImage(this.image, 0, 26-Math.round(this.percent/3.84615384615), 26, Math.round(this.percent/3.84615384615), this.x, this.y+this.height-Math.round(this.percent/Math.round(100/this.height)), this.width, this.percent/(100/this.height));
        }else if(this.itemType != undefined){
            this.image.src = "textures/itemSheet.png";
            context.drawImage(this.image, this.texture.x*32, this.texture.y*32, 32, 32, this.x, this.y, this.width, this.height);
        }
    }
    this.gravity = function() {
    	if(jump && timeout) {
    		timeout=false;
    		setTimeout(function(){jump=false;}, 150);
    	}
    	if(jump) {
			return;
    	}
		if(map[Math.floor((this.y + this.height)/canvas.tileSize)][Math.round(this.x/canvas.tileSize)] != -1) {
			atGround=true;
			return;
		}
		if(this.x/canvas.tileSize - Math.floor(this.x/canvas.tileSize) == 0.5 && map[Math.floor((this.y + this.height)/canvas.tileSize)][Math.round(this.x/canvas.tileSize)-1] != -1) {
			atGround=true;
			return;
		}
        var canFall=true;
        var fallHeight=Math.floor((this.y + Math.ceil(deltaTime/50)*gravity*50 + this.height)/canvas.tileSize)
        var startHeight=Math.floor((this.y + this.height)/canvas.tileSize);
        for(var a=startHeight;a<=fallHeight;a++) {
            if(map[a][Math.round(this.x/canvas.tileSize)] != -1) {
                canFall=false;            
                var move= (Math.ceil((this.y + this.height)/canvas.tileSize) - (this.y + this.height)/canvas.tileSize)*canvas.tileSize + (a-startHeight-1)*canvas.tileSize;
                player.y = Math.round(move + player.y);
                hotbarUI.y = Math.round(move + hotbarUI.y);
                activeSlot.y = Math.round(move + activeSlot.y);
                camera.y = Math.round(camera.y - move);
                console.log((a-startHeight-1)+" , "+(Math.ceil((this.y + this.height)/canvas.tileSize) - (this.y + this.height)/canvas.tileSize)*canvas.tileSize);
                break;
            }
        }
        if(canFall) {
            dropDistance = Math.ceil(deltaTime/50)*gravity*50;
            player.y += dropDistance;
            hotbarUI.y += dropDistance;
            activeSlot.y += dropDistance;
            camera.y -= dropDistance;
        }
        inventoryUI = undefined;
        furnaceUI = undefined;
        craftingUI = undefined;
        for(var a of furnaceSaves) {
            if(a.active)
                furnaceSaves[furnaceSaves.indexOf(a)].active=false;
        }
        furnace = copyArr(furnaceInventoryPrefab);
        inventoryOn=false
		renderMap();
	}
}

function renderMap() {
    renderedTile = [];
	for(a=0+Math.floor(Math.abs(camera.y)/canvas.tileSize); a<(canvas.height/canvas.tileSize)+Math.ceil(Math.abs(camera.y)/canvas.tileSize);a++) {
		for(b=0+Math.floor(camera.x/canvas.tileSize); b<(canvas.width/canvas.tileSize)+Math.ceil(camera.x/canvas.tileSize);b++) {
			if(map[a][b] != -1)
			{
				if(renderedTile[a] == undefined)
					renderedTile[a] = [];
				renderedTile[a][b] = new component(canvas.tileSize, canvas.tileSize, materials[map[a][b]], b*canvas.tileSize, a*canvas.tileSize, "material");		
			}
		}
	}
}
