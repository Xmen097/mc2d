var keys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40
}
var timeout;
var tilesOffset;
var speed = 5;
var gravity = 5;

var materials = [
{name: "stone", durability: 500, texture: "stone.jpg"},
{name: "cobblestone", durability: 500, texture: "cobblestone.jpg"},
{name: "wood", durability: 300, texture: "wood.jpg"},
{name: "leaves", durability: 30, texture: "leaves.jpg"},
{name: "grass", durability: 100, texture: "grass.jpg"},
{name: "dirt", durability: 100, texture: "dirt.jpg"}
]

var map = [
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,03,03,03,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,03,02,03,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,02,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,04,-1,04,04,04,04,04,04,04,04,04,04,04,04,04,04],
[04,04,04,04,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05],
[05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05],
[05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05,05],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
[00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00]
]

var renderedTile = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],]

var camera = {
	x: 0,
	y: 0
}

function component(width, height, color, x, y, type) {
    if (type == "image") {
   		this.image = new Image();
    }
	this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y; ;
    this.update = function() {
    	if (type == "image") {
    		this.image.src = this.color;
      		context.drawImage(this.image, this.x, this.y, this.width, this.height);
    	} else {
      		context.fillStyle = this.color;
      		context.fillRect(this.x, this.y, this.width, this.height);
    	}
    }
    this. gravity = function() {
		if(map[Math.floor((player.y + player.height)/canvas.tileSize)][Math.round(this.x/canvas.tileSize)] == -1) {
			player.y +=gravity;
			camera.y -=gravity;
		}
	}
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}

document.addEventListener('keydown', function(event) {	
    if(event.keyCode == keys.left && player.x > 0) {
    	console.log("a");
    	if(map[Math.floor((player.y + player.height)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)-1] == -1 || map[Math.floor((player.y + player.height)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)-1] == undefined) {
    		if(camera.x >0 && player.x <= map[0].length*canvas.tileSize - (canvas.width+canvas.tileSize)/2 )
    		camera.x -= speed;	
    		player.x -= speed;
			renderMap();
       		player.color = "textures/steveLeft.png";
    	}

    } if(event.keyCode == keys.right && player.x < map[0].length*canvas.tileSize - canvas.tileSize) {
    	if(map[Math.floor((player.y + player.height)/canvas.tileSize)-1][Math.round(player.x/canvas.tileSize)+1] == -1) {
    		if(camera.x < map[0].length*canvas.tileSize-canvas.width && player.x >= (canvas.width - canvas.tileSize)/2)
    			camera.x += speed;
			player.x += speed;
			renderMap();
        	player.color = "textures/steveRight.png";
    	}
    } if(event.keyCode == keys.up) {
    	if(map[Math.floor((player.y + player.height)/canvas.tileSize)-3][Math.round(player.x/canvas.tileSize)] == -1) {
    		camera.y += 15*speed;	
    		player.y -= 15*speed;
			renderMap();
    	}

    }
})

window.onload = function() {
	start();
    player = new component(canvas.tileSize, 2*canvas.tileSize, "textures/steveFront.png", (canvas.width+canvas.tileSize)/2-canvas.tileSize, 50, "image");
    player.colliderWidth = 30;
}

function start() {
	canvas = document.getElementById("canvas");
	canvas.width = 450;
	canvas.height = 350;
	canvas.tileSize = 50;
	context = canvas.getContext("2d");
	canvas.interval = setInterval(update, 33.3);
	canvas.clear = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	renderMap();
}

function renderMap() {
    renderedTile = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],]
	for(a=0+Math.floor(Math.abs(camera.y)/canvas.tileSize); a<(canvas.height/canvas.tileSize)+Math.ceil(Math.abs(camera.y)/canvas.tileSize);a++) {
		for(b=0+Math.floor(camera.x/canvas.tileSize); b<(canvas.width/canvas.tileSize)+Math.ceil(camera.x/canvas.tileSize);b++) {
			if(map[a][b] != -1)
			{
				renderedTile[a][b] = new component(canvas.tileSize, canvas.tileSize, "textures/"+materials[map[a][b]].texture, b*canvas.tileSize, a*canvas.tileSize, "image");		
			}
		}
	}
}

function update() {
	context.setTransform(1,0,0,1,0,0);
	canvas.clear();
    context.translate( -1*camera.x, camera.y );   
	for(var a of renderedTile) {
		for(var b of a) {
			if(b != undefined)
				b.update();
		}	
	}
	player.gravity();
	player.update();
}

