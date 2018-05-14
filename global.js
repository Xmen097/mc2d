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
var activeItem, menuOn, playing=0;


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

function copyArr(arr){
	if(arr == undefined || arr.constructor == String || arr.constructor == Number|| arr.constructor == Boolean) {
		return arr;
	} else if(arr.constructor == Array) {
	    var newArr = arr.slice(0);
	    for(var i = 0; i<newArr.length; i++)
	            newArr[i] = copyArr(arr[i]);
	    return newArr;
	} else if(arr.constructor != Function) {
		var newArr = new arr.constructor();
		for(var a in arr) {
			newArr[a] = copyArr(arr[a]);
		}
		return newArr;
	} else {
		return arr;
	}
}

function world(getName, getInventory, getPosition, getMap, getFurnaces, getCraftingTable, getCrafting, getChests, getHolding) {
	this.name = getName; 
	this.inventory = getInventory;
	this.position = getPosition;
	this.map = getMap;
	this.furnaces = getFurnaces;
	this.craftingTable = getCraftingTable;
	this.crafting = getCrafting;
	this.chests = getChests;
	this.holding = getHolding;
}


function giveItemToBestInventoryPosition(item, count) {
	for(var a of inventory.hotbar) {
		if(a.item == item) {
			a.count += count;
			return inventory.hotbar.indexOf(a);		
		}
	}
	for (var m of inventory.inventory) {
		for(var a of m) {
			if(a.item == item) {
				a.count += count;
				return inventory.inventory.indexOf(a);				
			}
		}				
	}
	for(var a of inventory.hotbar) {
		if(a.item == undefined) {
			a.count = count;
			a.item = item;
			return inventory.hotbar.indexOf(a);		
		}
	}
	for (var m of inventory.inventory) {
		for(var a of m) {
			if(a.item == undefined) {
				a.count = count;
				a.item = item;
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
			var pos = giveItemToBestInventoryPosition(items[this.item2], this.count2)
		} else if(item1 != undefined){
			var pos = giveItemToBestInventoryPosition(items[this.item1], this.count1)
		}
		if(playing == 2) {
			return pos;
		}
	}
}
var items = [
	{name: "stone", durability: 500, stack: 64, x:13, favType:"pickaxe", drop: new drop(undefined, 0, "pickaxe", 1), id:0},   					    
	{name: "cobblestone", durability: 500, stack: 64, x:7, favType:"pickaxe", drop: new drop(undefined, 0, "pickaxe", 1), id:1},												
	{name: "wood", durability: 300, stack: 64, x:11, favType: "axe", smelting: 1000, drop: new drop(2), id:2},
	{name: "leaves", durability: 50, stack: 64, x:12, favType:"scissors", smelting: 250, drop: new drop(undefined, 0, "scissors", 3), id:3},		
	{name: "grass", durability: 100, stack: 64, x:10, favType:"scissors", favType2: "shovel", drop: new drop(5, 1, "scissors", 4), id:4},
	{name: "dirt", durability: 100, stack: 64, x:9, favType:"shovel", drop: new drop(5), id:5},
	{name: "bedrock", durability: Infinity, stack: 64, favType:"pickaxe", x:6, drop: new drop(undefined), id:6},
	{name: "iron ore", durability: 1000, stack: 64, x:3, favType:"pickaxe", drop: new drop(undefined, 0, "pickaxe", 7), id:7},			
	{name: "coal ore", durability: 750, stack: 64, x:0, favType:"pickaxe", drop: new drop(undefined, 0, "pickaxe", 54), id:8},				
	{name: "diamond ore", durability: 2000, stack: 64, x:1, favType:"pickaxe", drop: new drop(undefined, 0, "pickaxe", 53), id:9},				
	{name: "gold ore", durability: 1500, stack: 64, x:2, favType:"pickaxe", drop: new drop(undefined, 0, "pickaxe", 10), id:10},				
	{name: "wooden planks", durability: 200, stack: 64, x:5, favType: "axe", smelting: 500, drop: new drop(11), id:11},
	{name: "crafting table", durability: 200, stack: 64, x:8, favType: "axe", active:"crafting", smelting: 1000, drop: new drop(12), id:12},
	{name: "furnace", durability: 500, stack: 64, x:4, favType: "pickaxe", active:"furnace", drop: new drop(undefined, 0, "pickaxe", 13), id:13},			
	{name: "Leather helmet", stack: 1, x:0, y:0, durability: 200, type: "helmet", id:14},
	{name: "Chain helmet", stack: 1, x:1, y:0, durability: 400, type: "helmet", id:15},
	{name: "Iron helmet", stack: 1, x:2, y:0, durability: 600, type: "helmet", id:16},
	{name: "Diamond helmet", stack: 1, x:3, y:0, durability: 800, type: "helmet", id:17},
	{name: "Golden helmet", stack: 1, x:4, y:0, durability: 1000, type: "helmet", id:18},
	{name: "Leather chestplate", stack: 1, x:0, y:1, durability: 200, type: "chestplate", id:19},
	{name: "Chain chestplate", stack: 1, x:1, y:1, durability: 400, type: "chestplate", id:20},
	{name: "Iron chestplate", stack: 1, x:2, y:1, durability: 600, type: "chestplate", id:21},
	{name: "Diamond chestplate", stack: 1, x:3, y:1, durability: 800, type: "chestplate", id:22},
	{name: "Golden chestplate", stack: 1, x:4, y:1, durability: 1000, type: "chestplate", id:23},
	{name: "Leather trousers", stack: 1, x:0, y:2, durability: 200, type: "trousers", id:24},
	{name: "Chain trousers", stack: 1, x:1, y:2, durability: 400, type: "trousers", id:25},
	{name: "Iron trousers", stack: 1, x:2, y:2, durability: 600, type: "trousers", id:26},
	{name: "Diamond trousers", stack: 1, x:3, y:2, durability: 800, type: "trousers", id:27},
	{name: "Golden trousers", stack: 1, x:4, y:2, durability: 1000, type: "trousers", id:28},
	{name: "Leather shoes", stack: 1, x:0, y:3, durability: 200, type: "shoes", id:29},
	{name: "Chain shoes", stack: 1, x:1, y:3, durability: 400, type: "shoes", id:30},
	{name: "Iron shoes", stack: 1, x:2, y:3, durability: 600, type: "shoes", id:31},
	{name: "Diamond shoes", stack: 1, x:3, y:3, durability: 800, type: "shoes", id:32},
	{name: "Golden shoes", stack: 1, x:4, y:3, durability: 1000, type: "shoes", id:33},
	{name: "Scissors", stack:1, x:3, y:11, durability: 200, type: "scissors", multiplier:2, id:34},
	{name: "Wood pickaxe", stack:1, x:0, y:9, durability: 500, type: "pickaxe", multiplier:4, id:35},
	{name: "Stone pickaxe", stack:1, x:0, y:6, durability: 500, type: "pickaxe", multiplier:8, id:36},
	{name: "Iron pickaxe", stack:1, x:0, y:5, durability: 500, type: "pickaxe", multiplier:15, id:37},
	{name: "Diamond pickaxe", stack:1, x:0, y:8, durability: 500, type: "pickaxe", multiplier:20, id:38},
	{name: "Gold pickaxe", stack:1, x:0, y:7, durability: 500, type: "pickaxe", multiplier:17, id:39},
	{name: "Admin pickaxe", stack:1, x:3, y:14, durability: Infinity, type: "pickaxe", multiplier:Infinity, id:40},
	{name: "Wood axe", stack:1, x:3, y:0, durability: 500, type: "axe", multiplier:2, id:41},
	{name: "Stone axe", stack:1, x:2, y:12, durability: 500, type: "axe", multiplier:3, id:42},
	{name: "Iron axe", stack:1, x:2, y:11, durability: 500, type: "axe", multiplier:5, id:43},
	{name: "Diamond axe", stack:1, x:2, y:14, durability: 500, type: "axe", multiplier:7, id:44},
	{name: "Gold axe", stack:1, x:2, y:13, durability: 500, type: "axe", multiplier:6, id:45},
	{name: "Admin axe", stack:1, x:3, y:13, durability: Infinity, type: "axe", multiplier:Infinity, id:46},
	{name: "Wooden shovel", stack:1, x:0, y:3, durability: 50, type: "shovel", multiplier:1.5, id:47},
	{name: "Stone shovel", stack:1, x:0, y:0, durability: 200, type: "shovel", multiplier:2, id:48},
	{name: "Iron shovel", stack:1, x:1, y:12, durability: 500, type: "shovel", multiplier:3, id:49},
	{name: "Diamond shovel", stack:1, x:0, y:2, durability: 1000, type: "shovel", multiplier:5, id:50},
	{name: "Gold shovel", stack:1, x:0, y:1, durability: 100, type: "shovel", multiplier:4, id:51},
	{name: "Admin shovel", stack:1, x:3, y:12, durability: Infinity, type: "shovel", multiplier:Infinity, id:52},
	{name: "Diamond", stack: 64, x:1, y:1, type: "item", id:53},
	{name: "Coal", stack: 64, x:1, y:2, type: "item", smelting: 4000, id:54},
	{name: "Iron ingot", stack: 64, x:0, y:10, type: "item", id:55},
	{name: "Gold ingot", stack: 64, x:0, y:14, type: "item", id:56},
	{name: "Stick", stack: 64, x:1, y:0, type: "item", smelting: 50, id:57},
	{name: "Chest", durability: 200, stack: 64, x:14, favType: "axe", active:"chest", drop: new drop(58), id:58},	
]
var camera = {
	x: 0,
	y: 0
}

var tileMultiplier = 2;

window.onload = function() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.tileSize = 50*tileMultiplier;
	canvas.width = 450*tileMultiplier;
	canvas.height =  350*tileMultiplier;
	canvas.clear = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	context.fillStyle="white";
	context.font="22px Verdana";
	context.textAlign = "center";
	context.fillText("Loading",canvas.width/2,canvas.height/2)
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
	    'textures/blockSheet.png',
	    'textures/ui/chest.png'
	]);
	resources.onReady(function() {
		document.addEventListener('contextmenu', event => event.preventDefault()); // disable right click menu
		if(localStorage["token"] && localStorage["name"]) {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if(ajax.responseText == "true") {
					loginToken = localStorage["token"];
					name = localStorage["name"];
					menus.main();
				} else 
					menus.login();
			}else
				menus.login();
			}
			ajax.open("POST", "index.php", true);
			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			var random = sha256(""+Math.random());
			ajax.send("name="+localStorage["name"]+"&token="+sha256(localStorage["token"]+random)+"&salt="+random);
		} else
			menus.login();
	});
}

function saveWorld() {
	try {
		worlds=JSON.parse(localStorage["worlds"]);
		if(worlds.constructor != Array)
			throw new DOMException;
	}catch(e) {
		worlds=[]
	}
	worlds[SPSelected] = new world(worldName, inventory, {x: player.x, y: player.y}, map, furnaceSaves, craftingTable, crafting, chestSaves, holding)
	localStorage["worlds"] = JSON.stringify(worlds);
	console.log("autoSaved")
}

function setupGame() {
	clearInterval(canvas.interval);
	menuOn=0;
	craftingUI=undefined;
	furnaceUI=undefined;
	camera.y=50;
	activeSlot = new component(63*canvas.width/820, 63*canvas.height/820, "textures/ui/selected.png", camera.x + (canvas.width - 63*canvas.width/820)*tileMultiplier/2, camera.y*-1 + (canvas.height - 63*canvas.height/820)*tileMultiplier/1.1,"image");
    activeSlot.slot=5;
    activeSlot.slotPosition=0;
    hotbarUI = new component(0.655*canvas.width, 64*canvas.height/820, "textures/ui/hotbar.png", camera.x + (canvas.width - 146*canvas.width/820)/2, camera.y*-1*tileMultiplier + (canvas.height - 64*canvas.height/820)/1.1,"image");
    player = new component(canvas.tileSize, 2*canvas.tileSize, "textures/player/steveRight.png", (canvas.width+canvas.tileSize)/2, 50, "image");
	activeItem=inventory.hotbar[activeSlot.slot]
}

function stopGame() {
	camera.y=0;
	activeSlot = undefined;
    hotbarUI = undefined;
    player = undefined;
    holding.item=undefined;
    holding.count=0;
	activeItem = undefined;
	playing = 0;
	clearInterval(canvas.interval);
	if(typeof autoSave == "number")
	clearInterval(autoSave);
}

function startSP() {
	if(localStorage["worlds"])  {
		var world = JSON.parse(localStorage["worlds"])[SPSelected];
		if(world) {
			setupGame();
			inventory = copyArr(inventoryPreset);
			crafting = copyArr(craftingPreset);
			craftingTable = copyArr(craftingTablePreset);
			furnaceSaves=[];
			chestSaves=[];
			playing=1;
			menu=0;
			map = world.map;
			for(var a=0;a<inventory.inventory.length;a++) {
				for(var b=0;b<inventory.inventory[a].length;b++) {
					inventory.inventory[a][b].count = world.inventory.inventory[a][b].count|0;
					inventory.inventory[a][b].item = world.inventory.inventory[a][b].item ? items[world.inventory.inventory[a][b].item.id] : undefined;
				}
			}
			for(var b=0;b<inventory.hotbar.length;b++) {
				inventory.hotbar[b].count = world.inventory.hotbar[b].count|0;
				inventory.hotbar[b].item = world.inventory.hotbar[b].item ? items[world.inventory.hotbar[b].item.id] : undefined;
			}
			for(var b=0;b<inventory.armor.length;b++) {
				inventory.armor[b].count = world.inventory.armor[b].count|0;
				inventory.armor[b].item = world.inventory.armor[b].item ? items[world.inventory.armor[b].item.id] : undefined;
			}
			for(var b=0;b<world.furnaces.length;b++) {
				furnaceSaves[b] = copyArr(world.furnaces[b])
				furnaceSaves[b].inventory = copyArr(furnaceInventoryPrefab);
				for(var c=0;c<world.furnaces[b].inventory.length;c++) {
					furnaceSaves[b].inventory[c].count = world.furnaces[b].inventory[c].count|0;
					furnaceSaves[b].inventory[c].item = world.furnaces[b].inventory[c].item ? items[world.furnaces[b].inventory[c].item.id] : undefined;
				}
			}
			for(var b=0;b<world.chests.length;b++) {
				chestSaves[b] = copyArr(world.chests[b])
				chestSaves[b].inventory = copyArr(chestPreset);
				for(var c=0;c<world.chests[b].inventory.length;c++) {
					chestSaves[b].inventory[c].count = world.chests[b].inventory[c].count|0;
					chestSaves[b].inventory[c].item = world.chests[b].inventory[c].item ? items[world.chests[b].inventory[c].item.id] : undefined;
				}
			}
			player.x = world.position.x;
			player.y = world.position.y;
			camera.y = -player.y+200
			camera.x = Math.max(player.x-400, 0);
			hotbarUI.y = player.y+(388);
			hotbarUI.x = Math.max(player.x-248, 153);
			activeSlot.x = Math.max(player.x+13, 83+activeSlot.slot*66);
			activeSlot.y = player.y+388;
			holding = new inventorySpace();
			holding.count = world.holding.count|0;
			holding.x = world.holding.x|0;
			holding.y = world.holding.y|0;
			holding.item = world.holding.item ? items[world.holding.item.id] : undefined;
			for(var a=0;a<craftingTable.length;a++) {
				craftingTable[a].count = world.craftingTable[a].count|0;
				craftingTable[a].item = world.craftingTable[a].item ? items[world.craftingTable[a].item.id] : undefined;
			}
			for(var a=0;a<crafting.length;a++) {
				crafting[a].count = world.crafting[a].count|0;
				crafting[a].item = world.crafting[a].item ? items[world.crafting[a].item.id] : undefined;
			}
			renderMap();
			autoSave = setInterval(saveWorld, 60000);
			lastTime = Date.now();
			canvas.interval = setInterval(update, 30);
		}
	}
}

function startMP() {
	setupGame()
	prevPos={x:player.x, y:player.y};
	camera.y = -player.y+200
	camera.x = Math.max(player.x-400, 0);
	hotbarUI.y = player.y+(388);
	hotbarUI.x = Math.max(player.x-248, 153);
	activeSlot.x = Math.max(player.x+13, 83+activeSlot.slot*66);
	activeSlot.y = player.y+388;
	playing=2;
	menu=0;
	remoteDestroingBlock={};
	maxDisplayMessages=7
	maxSavedMessages=20
	chatOn=false;
	chatMessage=""
	messagesList=[]
	mpFurnace = copyArr(furnaceInventoryPrefab);
	mpChest = copyArr(chestPreset);
	lastTime = Date.now();
	canvas.interval = setInterval(update, 30);
}

function update() {
	if(!document.hasFocus()){ // delete all pressed keys, if can't check for release
		pressedKeys=[];
	};
	deltaTime = Date.now() - lastTime; //used in gravity math
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
			context.fillStyle="white";
			context.font="10px Verdana";
			context.textAlign = "center";
			a.slot.reRender(35+(a.x-camera.x)/2-(a.x-player.x)/2, 70+(a.y-camera.y*-1)/2-(a.y-player.y)/2, true, a.component.texture != "textures/player/steveRight.png");
			context.fillText(a.name, a.x+canvas.tileSize/2, a.y-canvas.tileSize/10)
		}
		for(var a in remoteDestroingBlock) {
			remoteDestroingBlock[a].update();
		}
	}
	if(destroingTexture != undefined)
		destroingTexture.update();
	hotbarUI.update();
	if(playing==2) {
		context.fillStyle="white";
		context.font="10px Verdana";
		context.textAlign = "left";
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
	
	for(var a=0; a<inventory.hotbar.length; a++) {
		if(inventory.hotbar[a].item != undefined) {
			inventory.hotbar[a].reRender(0, 45);
		}
	}   
	activeSlot.update();
	checkForMove();
	checkForHotbarItemSelect();
	checkForInventoryOpen();
	checkForFurnaceSmelting();
	player.gravity();
	player.update();
	if(activeItem.item) {
		activeItem.reRender(35+(player.x-camera.x)/2, 70+(player.y-camera.y*-1)/2, true);
	}
	if(typeof furnaceUI != "undefined") {
		furnaceUI.update();
		furnaceFireUI.update();
		furnaceArrowUI.update();
		for(var a of inventory.hotbar) {
			a.reRender();
		}
		for(var a of furnace) {
			if(holding.getFrom != a || playing != 2) {
				a.reRender();	
			} else {
				a.count-=holding.count;
				if(a.count<=0)
					a.item=undefined;
				a.reRender();
			}
		}
		for (var m of inventory.inventory) {
			for(var a of m) {
				a.reRender();
			}				
		}
		holding.reRender();
	} else if(typeof craftingUI != "undefined") {
		craftingUI.update();
		for (var m of inventory.inventory) {
			for(var a of m) {
				a.reRender();
			}				
		}
		for(var a of inventory.hotbar) {
			a.reRender();
		}
		for(var a of craftingTable) {
			a.reRender();
		}
		holding.reRender()
	} else if(typeof inventoryUI != "undefined") {
		inventoryUI.update();
		for(var a of inventory.armor) {
			a.reRender();
		}
		for(var a of inventory.hotbar) {
			a.reRender();
		}
		for(var a of crafting) {
			a.reRender();
		}
		for (var m of inventory.inventory) {
			for(var a of m) {
				a.reRender();
			}				
		}
		holding.reRender()
	}else if(typeof chestUI != "undefined") {
		chestUI.update();
		for(var a of inventory.hotbar) {
			a.reRender();
		}
		for (var m of inventory.inventory) {
			for(var a of m) {
				a.reRender();
			}				
		}
		for(var a of chest) {
			if(holding.getFrom != a || playing != 2) {
				a.reRender();	
			} else {
				a.count-=holding.count;
				if(a.count<=0)
					a.item=undefined;
				a.reRender();
			}
		}
		holding.reRender()
	}
	if(playing==2) {
		if(prevPos != undefined && prevPos.x != player.x || prevPos != undefined && prevPos.y != player.y || prevPos!= undefined && prevPos.slot != activeSlot.slot) {
			socket.emit("move player", {x: player.x, y: player.y, texture: player.texture == "textures/player/steveLeft.png" ? 0 : 1, slot: activeSlot.slot-1})
		}
		prevPos={x:player.x, y:player.y, slot: activeSlot.slot}
	}
	lastTime = Date.now();
}
