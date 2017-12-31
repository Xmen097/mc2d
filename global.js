/*var map = [  //That's the default map
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,03,03,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,03,03,03,03,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,03,02,02,03,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,03,02,02,03,-1,-1,-1],
[13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,02,02,-1,-1,-1,-1],
[12,-1,-1,-1,-1,-1,04,04,04,04,04,04,04,04,04,04,04,04,04,04],
[04,04,04,04,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05],
[05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05],
[05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05],
[07,10,09,08,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[07,10,09,08,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[07,10,09,08,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[07,10,09,08,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[07,10,09,08,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,08,08,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,08,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,07,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,07,07,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,09,09,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,09,09,09,00,00,00,00,00],
[00,00,00,00,10,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06],
[06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06],
[06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06,06]
]*/         
var activeItem, menuOn, playing;


//code for including js files from: http://zcourts.com/2011/10/06/dynamically-requireinclude-a-javascript-file-into-a-page-and-be-notified-when-its-loaded/
function include(filename, onload, id) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    if(id) {
    	script.id = id;
    }
    script
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;onload();}
            } else {
                onload();
            }
        };
    head.appendChild(script);
}


//code for loading sprites from: http://jlongster.com/Making-Sprite-based-Games-with-Canvas
var resourceCache = {};
var loading = [];
var readyCallbacks = [];

// Load an image url or an array of image urls
function load(urlOrArr) {
    if(urlOrArr instanceof Array) {
        urlOrArr.forEach(function(url) {
            _load(url);
        });
    }
    else {
        _load(urlOrArr);
    }
}

function _load(url) {
    if(resourceCache[url]) {
        return resourceCache[url];
    }
    else {
        var img = new Image();
        img.onload = function() {
            resourceCache[url] = img;

            if(isReady()) {
                readyCallbacks.forEach(function(func) { func(); });
            }
        };
        resourceCache[url] = false;
        img.src = url;
    }
}

function get(url) {
    return resourceCache[url];
}

function isReady() {
    var ready = true;
    for(var k in resourceCache) {
        if(resourceCache.hasOwnProperty(k) &&
           !resourceCache[k]) {
            ready = false;
        }
    }
    return ready;
}

function onReady(func) {
    readyCallbacks.push(func);
}

window.resources = { 
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
};
//end

function giveItemToBestInventoryPosition(item, count) {
	for(var a of inventory.hotbar) {
		if(a.item == item) {
			a.count += count;
			a.reRender();
			return inventory.hotbar.indexOf(a);		
		}
	}
	for (var m of inventory.inventory) {
		for(var a of m) {
			if(a.item == item) {
				a.count += count;
				a.reRender();
				return inventory.inventory.indexOf(a);				
			}
		}				
	}
	for(var a of inventory.hotbar) {
		if(a.item == undefined) {
			a.count = count;
			a.item = item;
			a.reRender();
			return inventory.hotbar.indexOf(a);		
		}
	}
	for (var m of inventory.inventory) {
		for(var a of m) {
			if(a.item == undefined) {
				a.count = count;
				a.item = item;
				a.reRender();
				return inventory.inventory.indexOf(a);				
			}
		}				
	}
}

function drop(item1, count1, condition, item2, count2) {
	this.item1 = item1;
	this.count1 = count1 || 1;
	this.condition = condition || undefined;
	this.item2 = item2 || undefined;
	this.count2 = count2 || 1;
	this.drop = function() {
		if(activeItem.item!= undefined && this.condition != undefined && activeItem.item.type == this.condition && this.item2 != undefined) {
			var pos = giveItemToBestInventoryPosition(this.item2, this.count2)
		} else if(item1 != undefined){
			var pos = giveItemToBestInventoryPosition(this.item1, this.count1)
		}
		if(playing == 2) {
			return pos;
		}
	}
}

var items = {
	leatherHelmet:{name: "Leather helmet", stack: 1, x:0, y:0, durability: 200, type: "helmet", id:14},
	chainHelmet:{name: "Chain helmet", stack: 1, x:1, y:0, durability: 400, type: "helmet", id:15},
	ironHelmet:{name: "Iron helmet", stack: 1, x:2, y:0, durability: 600, type: "helmet", id:16},
	diamondHelmet:{name: "Diamond helmet", stack: 1, x:3, y:0, durability: 800, type: "helmet", id:17},
	goldenHelmet:{name: "Golden helmet", stack: 1, x:4, y:0, durability: 1000, type: "helmet", id:18},

	leatherChestplate:{name: "Leather chestplate", stack: 1, x:0, y:1, durability: 200, type: "chestplate", id:19},
	chainChestplate:{name: "Chain chestplate", stack: 1, x:1, y:1, durability: 400, type: "chestplate", id:20},
	ironChestplate:{name: "Iron chestplate", stack: 1, x:2, y:1, durability: 600, type: "chestplate", id:21},
	diamondChestplate:{name: "Diamond chestplate", stack: 1, x:3, y:1, durability: 800, type: "chestplate", id:22},
	goldenChestplate:{name: "Golden chestplate", stack: 1, x:4, y:1, durability: 1000, type: "chestplate", id:23},

	leathertrousers:{name: "Leather trousers", stack: 1, x:0, y:2, durability: 200, type: "trousers", id:24},
	chainTrousers:{name: "Chain trousers", stack: 1, x:1, y:2, durability: 400, type: "trousers", id:25},
	ironTrousers:{name: "Iron trousers", stack: 1, x:2, y:2, durability: 600, type: "trousers", id:26},
	diamondTrousers:{name: "Diamond trousers", stack: 1, x:3, y:2, durability: 800, type: "trousers", id:27},
	goldenTrousers:{name: "Golden trousers", stack: 1, x:4, y:2, durability: 1000, type: "trousers", id:28},

	leatherShoes:{name: "Leather shoes", stack: 1, x:0, y:3, durability: 200, type: "shoes", id:29},
	chainShoes:{name: "Chain shoes", stack: 1, x:1, y:3, durability: 400, type: "shoes", id:30},
	ironShoes:{name: "Iron shoes", stack: 1, x:2, y:3, durability: 600, type: "shoes", id:31},
	diamondShoes:{name: "Diamond shoes", stack: 1, x:3, y:3, durability: 800, type: "shoes", id:32},
	goldenShoes:{name: "Golden shoes", stack: 1, x:4, y:3, durability: 1000, type: "shoes", id:33},

	scissors:{name: "Scissors", stack:1, x:13, y:5, durability: 200, type: "scissors", multiplier:2, id:34},

	woodPickaxe:{name: "Wood pickaxe", stack:1, x:0, y:6, durability: 500, type: "pickaxe", multiplier:6, id:35},
	stonePickaxe:{name: "Stone pickaxe", stack:1, x:1, y:6, durability: 500, type: "pickaxe", multiplier:8, id:36},
	ironPickaxe:{name: "Iron pickaxe", stack:1, x:2, y:6, durability: 500, type: "pickaxe", multiplier:10, id:37},
	diamondPickaxe:{name: "Diamond pickaxe", stack:1, x:3, y:6, durability: 500, type: "pickaxe", multiplier:12, id:38},
	goldPickaxe:{name: "Gold pickaxe", stack:1, x:4, y:6, durability: 500, type: "pickaxe", multiplier:12, id:39},

	woodAxe:{name: "Wood axe", stack:1, x:0, y:7, durability: 500, type: "axe", multiplier:3, id:40},
	stoneAxe:{name: "Stone axe", stack:1, x:1, y:7, durability: 500, type: "axe", multiplier:4, id:41},
	ironAxe:{name: "Iron axe", stack:1, x:2, y:7, durability: 500, type: "axe", multiplier:5, id:42},
	diamondAxe:{name: "Diamond axe", stack:1, x:3, y:7, durability: 500, type: "axe", multiplier:6, id:43},
	goldAxe:{name: "Gold axe", stack:1, x:4, y:7, durability: 500, type: "axe", multiplier:6, id:44},

	woodShovel:{name: "Wooden shovel", stack:1, x:0, y:5, durability: 50, type: "shovel", multiplier:2, id:45},
	stoneShovel:{name: "Stone shovel", stack:1, x:1, y:5, durability: 200, type: "shovel", multiplier:3, id:46},
	ironShovel:{name: "Iron shovel", stack:1, x:2, y:5, durability: 500, type: "shovel", multiplier:4, id:47},
	diamondShovel:{name: "Diamond shovel", stack:1, x:3, y:5, durability: 1000, type: "shovel", multiplier:5, id:48},
	goldShovel:{name: "Gold shovel", stack:1, x:4, y:5, durability: 100, type: "shovel", multiplier:5, id:49},

	diamond:{name: "Diamond", stack: 64, x:7, y:3, type: "item", id:50},
	coal:{name: "Coal", stack: 64, x:7, y:0, type: "item", smelting: 4000, id:51},
	iron:{name: "Iron ingot", stack: 64, x:7, y:1, type: "item", id:52},
	gold:{name: "Gold ingot", stack: 64, x:7, y:2, type: "item", id:53},
	stick:{name: "Stick", stack: 64, x:5, y:3, type: "item", smelting: 50, id:54},
}

var materials = [
	{name: "stone", durability: 500, stack: 64, x:13, favType:"pickaxe", id:0},                            					    //0
	{name: "cobblestone", durability: 500, stack: 64, x:7, favType:"pickaxe", id:1},											//1
	{name: "wood", durability: 300, stack: 64, x:11, favType: "axe", smelting: 1000, id:2},										//2
	{name: "leaves", durability: 50, stack: 64, x:12, favType:"scissors", smelting: 300, id:3},									//3
	{name: "grass", durability: 100, stack: 64, x:10, favType:"scissors", favType2: "shovel", id:4},							//4
	{name: "dirt", durability: 100, stack: 64, x:9, favType:"shovel", id:5},													//5
	{name: "bedrock", durability: Infinity, x:6, id:6},																			//6
	{name: "iron ore", durability: 700, stack: 64, x:3, favType:"pickaxe", id:7},												//7
	{name: "coal ore", durability: 600, stack: 64, x:0, favType:"pickaxe", id:8},		 										//8
	{name: "diamond ore", durability: 1000, stack: 64, x:1, favType:"pickaxe", id:9},  											//9
	{name: "gold ore", durability: 800, stack: 64, x:2, favType:"pickaxe", id:10},			 									//10
	{name: "wooden planks", durability: 200, stack: 64, x:5, favType: "axe", smelting: 500, id:11},								//11
	{name: "crafting table", durability: 200, stack: 64, x:8, favType: "axe", active:"crafting", smelting: 1000, id:12},		//12
	{name: "furnace", durability: 500, stack: 64, x:4, favType: "pickaxe", active:"furnace", id:13},							//13
]

materials[0].drop=new drop(undefined, 0, "pickaxe", materials[1]);
materials[1].drop=new drop(undefined, 0, "pickaxe", materials[1]);
materials[2].drop=new drop(materials[2]);
materials[3].drop=new drop(undefined, 0, "scissors", materials[3]);
materials[4].drop=new drop(materials[5], 1, "scissors", materials[4]);
materials[5].drop=new drop(materials[5]);
materials[6].drop=new drop(undefined);
materials[7].drop=new drop(undefined, 0, "pickaxe", materials[7]);
materials[8].drop=new drop(undefined, 0, "pickaxe", items.coal);
materials[9].drop=new drop(undefined, 0, "pickaxe", items.diamond);
materials[10].drop=new drop(undefined, 0, "pickaxe", materials[10]);
materials[11].drop=new drop(materials[11]);
materials[12].drop=new drop(materials[12]);
materials[13].drop=new drop(undefined, 0, "pickaxe", materials[13]);

var camera = {
	x: 0,
	y: 0
}



window.onload = function() {
	playing=0
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.tileSize = 50;
	canvas.width = 450;
	canvas.height =  350;
	canvas.clear = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	resources.load([
	    'textures/backArrow.png',
	    'textures/itemSheet.png',
	    'textures/breaking/0.png',
	    'textures/breaking/1.png',
	    'textures/breaking/2.png',
	    'textures/breaking/3.png',
	    'textures/breaking/4.png',
	    'textures/breaking/5.png',
	    'textures/breaking/6.png',
	    'textures/breaking/7.png',
	    'textures/breaking/8.png',
	    'textures/breaking/9.png',
	    'textures/player/steveFront.png',
	    'textures/player/steveLeft.png',
	    'textures/player/steveRight.png',
	    'textures/ui/crafting.png',
	    'textures/ui/furnace.png',
	    'textures/ui/furnaceArrow.png',
	    'textures/ui/furnaceFire.png',
	    'textures/ui/hotbar.png',
	    'textures/ui/inventory.png',
	    'textures/ui/inventory.png',
	    'textures/backArrow.png',
	    'textures/blockSheet.png'
	]);
	resources.onReady(function() {
		document.addEventListener('contextmenu', event => event.preventDefault()); // disable right click menu
		menus.login();
	});
}

function setupGame() {
	menuOn=0;
	craftingUI=undefined;
	furnaceUI=undefined;
	camera.y=50;
	activeSlot = new component(63*canvas.width/820, 63*canvas.height/820, "textures/ui/selected.png", camera.x + (canvas.width - 63*canvas.width/820)/2, camera.y*-1 + (canvas.height - 63*canvas.height/820)/1.1,"image");
    activeSlot.slot=5;
    activeSlot.slotPosition=0;
    hotbarUI = new component(546*canvas.width/820, 64*canvas.height/820, "textures/ui/hotbar.png", camera.x + (canvas.width - 546*canvas.width/820)/2, camera.y*-1 + (canvas.height - 64*canvas.height/820)/1.1,"image");
    player = new component(canvas.tileSize, 2*canvas.tileSize, "textures/player/steveRight.png", (canvas.width+canvas.tileSize)/2-canvas.tileSize, 50, "image");
	activeItem=new inventorySpace()
}

function stopGame() {
	camera.y=0;
	activeSlot = undefined;
    hotbarUI = undefined;
    player = undefined;
	activeItem = undefined;
	clearInterval(canvas.interval);
}

function startSP() {
	setupGame();
	playing=1;
	menu=0;
	mapGenerator.generate();
	renderMap();
	canvas.interval = setInterval(update, 30);
}

function startMP() {
	setupGame()
	prevPos={x:player.x, y:player.y};
	playing=2;
	menu=0;
	remoteDestroingBlock={};
	maxDisplayMessages=7
	maxSavedMessages=20
	chatOn=false;
	chatMessage=""
	messagesList=[]
	canvas.interval = setInterval(update, 30);
}

window.blur(function(){ // delete all pressed keys, if can't check for release
	pressedKeys=[];
});

function update() {
	context.setTransform(1,0,0,1,0,0);
	canvas.clear();
    context.translate( -1*camera.x, camera.y );
	for(var a of renderedTile) {
		if( typeof a == "object") {
			for(var b of a) {
				if(b != undefined)
					b.update();
			}	
		}
	}
	if(playing==2) {
		for(var a of remotePlayers) {
			a.component.update()
		}
		for(var a in remoteDestroingBlock) {
			remoteDestroingBlock[a].update();
		}
	}
	if(destroingTexture != undefined)
		destroingTexture.update();
	hotbarUI.update();
	activeSlot.update();
	if(playing==2) {
		context.fillStyle="white";
		context.font="10px Verdana";
		if(messagesList.length>maxDisplayMessages && !chatOn) {
			var a=messagesList.length-maxDisplayMessages;
		} else if(messagesList.length>maxSavedMessages && chatOn) {
			var a=messagesList.length-maxSavedMessages;
		}else 
			var a=0
		for(var b=0;a<messagesList.length;a++,b++) {
			context.fillText(messagesList[a],0.05*canvas.width+camera.x,0.05*canvas.width+camera.y*-1+12*b)
		}
		if(chatOn) {
			context.fillText(chatMessage+"|",0.05*canvas.width+camera.x,0.8*canvas.height+camera.y*-1)
		}
	}
	
	for(var a=0; a<hotbar.length; a++) {
		if(inventory.hotbar[a].item != undefined && inventory.hotbar[a].count != hotbar[a].count || inventory.hotbar[a].item != undefined && inventory.hotbar[a].item != hotbar[a].item) {
			hotbar[a].count = inventory.hotbar[a].count;
			hotbar[a].itemType = inventory.hotbar[a].itemType;
			hotbar[a].item = inventory.hotbar[a].item;
		}
		if(inventory.hotbar[a].item != undefined) {
			hotbar[a].reRender();
			hotbar[a].render.update();
			if(hotbar[a].count > 1)
				hotbar[a].text();
		}
	}   
	checkForMove();
	checkForHotbarItemSelect();
	checkForInventoryOpen();
	checkForFurnaceSmelting();
	player.gravity();
	player.update();
	if(typeof furnaceUI != "undefined") {
		furnaceUI.update();
		furnaceFireUI.update();
		furnaceArrowUI.update();
		for(var a of inventory.hotbar) {
			if(a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		for(var a of furnace) {
			if(a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		for (var m of inventory.inventory) {
			for(var a of m) {
				if(a.render != undefined){
					a.render.update();
					a.text();
				}
			}				
		}
		if(holding.render != undefined){
			holding.render.update();
			holding.text();
		}
	} else if(typeof craftingUI != "undefined") {
		craftingUI.update();
		for(var a of inventory.hotbar) {
			if(a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		for (var m of inventory.inventory) {
			for(var a of m) {
				if(a.render != undefined){
					a.render.update();
					a.text();
				}			
			}				
		}
		for(var a of craftingTable) {
			if(a!=undefined && a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		if(holding.render != undefined){
			holding.render.update();
			holding.text();
		}
	} else if(typeof inventoryUI != "undefined") {
		inventoryUI.update();
		for(var a of inventory.armor) {
			if(a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		for(var a of inventory.hotbar) {
			if(a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		for(var a of crafting) {
			if(a.render != undefined) {
				a.render.update();
				a.text();
			}
		}
		for (var m of inventory.inventory) {
			for(var a of m) {
				if(a.render != undefined){
					a.render.update();
					a.text();
				}
			}				
		}
		if(holding.render != undefined){
			holding.render.update();
			holding.text();
		}
	}
	if(playing==2) {
		if(prevPos != undefined && prevPos.x != player.x || prevPos != undefined && prevPos.y != player.y) {
			socket.emit("move player", {x: player.x, y: player.y, texture: player.texture == "textures/player/steveLeft.png" ? 0 : 1})
		}
		prevPos={x:player.x, y:player.y}
	}
}
