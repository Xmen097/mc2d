var menus = {
	bg: function()  {
		stopGame();
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
		menus.bg();			
		context.textAlign="center";						
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Minecraft 2D!",canvas.width/2,60)
		context.fillStyle="lightgrey";
		context.fillRect(0.28*canvas.width, 0.28*canvas.height, 0.45*canvas.width, 0.14*canvas.height)
		context.fillRect(0.28*canvas.width, 0.51*canvas.height, 0.45*canvas.width, 0.14*canvas.height)
		context.fillRect(0.28*canvas.width, 0.74*canvas.height, 0.45*canvas.width, 0.14*canvas.height)
		context.fillStyle="black";
		context.fillText("Single player",0.5*canvas.width,0.38*canvas.height)
		context.fillText("Multi player",0.5*canvas.width,0.61*canvas.height)
		context.fillText("Settings",0.5*canvas.width,0.84*canvas.height)
		},

	selectSP: function() {
		menuOn=2;
		menus.bg();
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
		context.fillRect(0.85*canvas.width, 0.1*canvas.height, 0.5*canvas.tileSize, 0.5*canvas.tileSize)
		context.fillStyle="black";
		context.font=Math.round(0.045*canvas.height)+"px Verdana";
		context.fillText("Play selected",0.18*canvas.width,0.84*canvas.height);
		context.fillText("Create new",0.60*canvas.width,0.84*canvas.height);
		(new component(0.5*canvas.tileSize, 0.5*canvas.tileSize, "textures/backArrow.png", 0.85*canvas.width, 0.1*canvas.height, "image")).update();
		},
	selectMP: function() {
		menuOn=3;
		ip="";
		if(typeof MPSelected == "undefined")
			MPSelected=0	
		savedMPs=[{name: "Official server", ip:"mc2d-officialserver.herokuapp.com"},{name: "Test server", ip:"mc2d-testserver.herokuapp.com"}]
		menus.bg();
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Play MultiPlayer!",canvas.width/2-100,60)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.25*canvas.height, 0.8*canvas.width, 0.5*canvas.height)
		context.textAlign="center"
		for(var a=0;a<savedMPs.length;a++) {
			if(MPSelected == a) {
				context.fillStyle="black";
			}else 
				context.fillStyle="grey";
			context.fillRect(0.125*canvas.width, 0.275*canvas.height+a*0.125*canvas.height, 0.75*canvas.width, 0.1*canvas.height)
			context.fillStyle="white";
			context.font=Math.round(0.045*canvas.height)+"px Verdana";
			context.fillText(savedMPs[a].name, 0.5*canvas.width, 1.5*Math.round(0.045*canvas.height)+0.275*canvas.height+a*0.125*canvas.height)
		}
		context.textAlign="start"
		context.fillRect(0.1*canvas.width, 0.75*canvas.height, 0.8*canvas.width, 0.13*canvas.height)
		context.fillStyle="lightgrey";
		context.fillRect(0.1*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillRect(0.505*canvas.width, 0.76*canvas.height, 0.395*canvas.width, 0.12*canvas.height)
		context.fillRect(0.85*canvas.width, 0.1*canvas.height, 0.5*canvas.tileSize, 0.5*canvas.tileSize)
		context.fillStyle="black";
		context.font=Math.round(0.045*canvas.height)+"px Verdana";
		context.fillText("Connect to selected",0.12*canvas.width,0.84*canvas.height)
		context.fillText("Connect to new",0.565*canvas.width,0.84*canvas.height);
		(new component(0.5*canvas.tileSize, 0.5*canvas.tileSize, "textures/backArrow.png", 0.85*canvas.width, 0.1*canvas.height, "image")).update();
	},
	createSP: function() {
		menuOn=4;
		menus.bg();
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
		context.fillRect(0.85*canvas.width, 0.1*canvas.height, 0.5*canvas.tileSize, 0.5*canvas.tileSize)
		context.fillStyle="black";
		context.font=Math.round(0.045*350)+"px Verdana";
		context.fillText("Connect to selected",canvas.width/2-75-0.21*canvas.width,0.84*canvas.height)
		context.fillText("Connect to new",70+0.41*canvas.width,0.84*canvas.height);
		(new component(0.5*canvas.tileSize, 0.5*canvas.tileSize, "textures/backArrow.png", 0.85*canvas.width, 0.1*canvas.height, "image")).update();
	},
	createMP: function() {
		menuOn=5;
		menus.bg();
		context.fillStyle="white";
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Connect to server!",canvas.width/2-110,60)
		context.fillText("IP:",canvas.width*0.125,canvas.height*0.375)
		context.fillStyle="lightgrey";
		context.fillRect(0.2*canvas.width, 0.3*canvas.height, 0.65*canvas.width, 0.1*canvas.height)
		context.fillRect(0.3*canvas.width, 0.76*canvas.height, 0.4*canvas.width, 0.12*canvas.height)
		context.fillRect(0.85*canvas.width, 0.1*canvas.height, 0.5*canvas.tileSize, 0.5*canvas.tileSize)
		context.fillStyle="black";
		context.font=Math.round(0.045*350)+"px Verdana";
		context.fillText("Connect",0.43*canvas.width,0.84*canvas.height)
		context.fillText(ip+"|",0.22*canvas.width,0.37*canvas.height);
		(new component(0.5*canvas.tileSize, 0.5*canvas.tileSize, "textures/backArrow.png", 0.85*canvas.width, 0.1*canvas.height, "image")).update();
	},
	login: function() {
		if(Math.floor(menuOn)!=6){
			menuOn=6;	
			name="";
			loginToken="";
			pasw="";
		}
		menus.bg();
		context.fillStyle="white";
		context.textAlign="center";
		context.font=Math.round(0.07*canvas.height)+"px Verdana";
		context.fillText("Login to your account",canvas.width/2,0.18*canvas.height)
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Name:",canvas.width*0.5,canvas.height*0.335)
		context.fillText("Password:",canvas.width*0.5,canvas.height*0.55)
		context.fillStyle="lightgrey";
		context.fillRect(0.175*canvas.width, 0.35*canvas.height, 0.65*canvas.width, 0.1*canvas.height)
		context.fillRect(0.175*canvas.width, 0.57*canvas.height, 0.65*canvas.width, 0.1*canvas.height)
		context.fillRect(0.3*canvas.width, 0.72*canvas.height, 0.4*canvas.width, 0.12*canvas.height)
		context.fillRect(0.3*canvas.width, 0.88*canvas.height, 0.4*canvas.width, 0.08*canvas.height)
		context.font=Math.round(0.045*canvas.height)+"px Verdana";
		context.fillStyle="black";
		context.textAlign="center";
		context.fillText("Login",0.5*canvas.width,0.8*canvas.height)
		context.font=Math.round(0.04*canvas.height)+"px Verdana";
		context.fillText("Create account",0.5*canvas.width,0.933*canvas.height)
		context.textAlign="start";
		if(menuOn == 6.1) {
			context.fillText(name+"|",0.19*canvas.width,0.41*canvas.height)
			context.fillText(pasw,0.19*canvas.width,0.63*canvas.height)
		} else if( menuOn == 6.2) {
			context.fillText(name,0.19*canvas.width,0.41*canvas.height)
			context.fillText(pasw+"|",0.19*canvas.width,0.63*canvas.height)
		}
	},
	signIn: function() {
		if(Math.floor(menuOn)!=7){
			menuOn=7;	
			name="";
			loginToken="";
			pasw="";
		}
		menus.bg();
		context.fillStyle="white";
		context.textAlign="center";
		context.font=Math.round(0.07*canvas.height)+"px Verdana";
		context.fillText("Create new account",canvas.width/2,0.18*canvas.height)
		context.font=Math.round(0.062*canvas.height)+"px Verdana";
		context.fillText("Name:",canvas.width*0.5,canvas.height*0.335)
		context.fillText("Password:",canvas.width*0.5,canvas.height*0.55)
		context.fillStyle="lightgrey";
		context.fillRect(0.175*canvas.width, 0.35*canvas.height, 0.65*canvas.width, 0.1*canvas.height)
		context.fillRect(0.175*canvas.width, 0.57*canvas.height, 0.65*canvas.width, 0.1*canvas.height)
		context.fillRect(0.3*canvas.width, 0.72*canvas.height, 0.4*canvas.width, 0.12*canvas.height)
		context.fillRect(0.3*canvas.width, 0.88*canvas.height, 0.4*canvas.width, 0.08*canvas.height)
		context.font=Math.round(0.045*canvas.height)+"px Verdana";
		context.fillStyle="black";
		context.textAlign="center";
		context.fillText("Create account",0.5*canvas.width,0.8*canvas.height)
		context.font=Math.round(0.04*canvas.height)+"px Verdana";
		context.fillText("Log in",0.5*canvas.width,0.933*canvas.height)
		context.textAlign="start";
		if(menuOn == 7.1) {
			context.fillText(name+"|",0.19*canvas.width,0.41*canvas.height)
			context.fillText(pasw,0.19*canvas.width,0.63*canvas.height)
		} else if( menuOn == 7.2) {
			context.fillText(name,0.19*canvas.width,0.41*canvas.height)
			context.fillText(pasw+"|",0.19*canvas.width,0.63*canvas.height)
		}
	}
}