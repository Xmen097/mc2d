var menu = {
	bg: function()  {
		context.setTransform(1,0,0,1,0,0);
    	context.translate(0,0);
		canvas.clear();
		camera.y=0;
		camera.x=0;
		map = [[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5]];
		renderMap();
		for(var a of renderedTile) {
			for(var b of a) {
				b.update()
			}	
		}				
	},
	main: function() {		
		menuOn=1;
		menu.bg();									
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Minecraft 2D!",canvas.width/2-75,60)
		context.fillStyle="lightgrey";
		context.fillRect(0.28*canvas.width, 0.28*canvas.height, 0.45*canvas.width, 0.14*canvas.height)
		context.fillRect(0.28*canvas.width, 0.51*canvas.height, 0.45*canvas.width, 0.14*canvas.height)
		context.fillRect(0.28*canvas.width, 0.74*canvas.height, 0.45*canvas.width, 0.14*canvas.height)
		context.fillStyle="black";
		context.fillText("Single player",0.345*canvas.width,0.38*canvas.height)
		context.fillText("Multi player",0.36*canvas.width,0.61*canvas.height)
		context.fillText("Settings",0.4*canvas.width,0.84*canvas.height)
		},

	selectSP: function() {
		menuOn=2;
		menu.bg();
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Play SinglePlayer!",0.29*canvas.width,0.17*canvas.height)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.25*canvas.height, 0.8*canvas.width, 0.5*canvas.height)
		context.fillStyle="grey";
		context.fillRect(0.1*canvas.width, 0.75*canvas.height, 0.8*canvas.width, 0.13*canvas.height)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillRect(0.505*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillStyle="black";
		context.font=Math.round(0.045*350)+"px Verdana";
		context.fillText("Play selected",0.18*canvas.width,0.84*canvas.height)
		context.fillText("Create new",0.60*canvas.width,0.84*canvas.height)
		},
	selectMP: function() {
		menuOn=3;
		ip=""
		menu.bg();
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Play MultiPlayer!",canvas.width/2-100,60)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.25*canvas.height, 0.8*canvas.width, 0.5*canvas.height)
		context.fillStyle="grey";
		context.fillRect(0.1*canvas.width, 0.75*canvas.height, 0.8*canvas.width, 0.13*canvas.height)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillRect(0.505*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillStyle="black";
		context.font=Math.round(0.045*350)+"px Verdana";
		context.fillText("Connect to selected",0.12*canvas.width,0.84*canvas.height)
		context.fillText("Connect to new",0.565*canvas.width,0.84*canvas.height)
	},
	createSP: function() {
		menuOn=4;
		menu.bg();
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Play MultiPlayer!",canvas.width/2-100,60)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.25*canvas.height, 0.8*canvas.width, 0.5*canvas.height)
		context.fillStyle="grey";
		context.fillRect(0.1*canvas.width, 0.75*canvas.height, 0.8*canvas.width, 0.13*canvas.height)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillRect(0.505*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillStyle="black";
		context.font=Math.round(0.045*350)+"px Verdana";
		context.fillText("Connect to selected",canvas.width/2-75-0.21*canvas.width,0.84*canvas.height)
		context.fillText("Connect to new",70+0.41*canvas.width,0.84*canvas.height)
	},
	createMP: function() {
		menuOn=5;
		menu.bg();
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Connect to server!",canvas.width/2-110,60)
		context.fillText("IP:",canvas.width*0.125,canvas.height*0.375)
		context.fillStyle="lightgrey";
		context.fillRect(0.2*canvas.width, 0.3*canvas.height, 0.65*canvas.width, 0.1*canvas.height)
		context.fillRect(0.3*canvas.width, 0.76*canvas.height, 0.4*canvas.width, 0.12*canvas.height)
		context.fillStyle="black";
		context.font=Math.round(0.045*350)+"px Verdana";
		context.fillText("Connect",0.43*canvas.width,0.84*canvas.height)
		context.fillText(ip+"|",0.22*canvas.width,0.37*canvas.height)
	}
}