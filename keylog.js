var keys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	w: 87,
	a: 65,
	s: 83,
	d: 68,
	e: 69,
	i: 73,
	_1: 49,
	_2: 50,
	_3: 51,
	_4: 52,
	_5: 53,
	_6: 54,
	_7: 55,
	_8: 56,
	_9: 57,
}
var pressedKeys = [];

onkeyup = function(event) {	
	pressedKeys[event.keyCode] = false;
}
onkeydown = function(event) {
	event.preventDefault();
	if(menuOn==5) {
		if(event.key=="Backspace") {
			ip = ip.slice(0, ip.length-1)
		}else if(event.key.length==1 && ip.length < 40) {
			ip+=event.key
		}
		menus.createMP();
	} else if(Math.floor(menuOn)==6 && event.key=="Enter") {
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.responseText) {
				if(ajax.responseText != "Login server offline" && ajax.responseText != "Invalid name or password" && ajax.responseText != "Failed to generate token") {
					loginToken = ajax.responseText;
					localStorage["name"]=name;
					localStorage["token"]=loginToken;
					menus.main();
				} else {
					alert(ajax.responseText);
				}
			} else {
				alert("Login server offline!")
			}
		}
		}
		ajax.open("POST", "index.php", true);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send("name="+name+"&pasw="+pasw+"&type=login");
	} else if(Math.floor(menuOn)==7 && event.key=="Enter") {
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.responseText) {
				if(ajax.responseText != 'Login server offline' && ajax.responseText != 'Name or password is too short (<5)' && ajax.responseText != 'Failed to generate token' && ajax.responseText != "Names can only contain alphanumeric characters" && ajax.responseText != "User with that name already exists" && ajax.responseText != "Name is too long") {
					loginToken = ajax.responseText;
					menus.main();
				} else {
					alert(ajax.responseText);
				}
			} else {
				alert('Login server offline!')
			}
		}
		}
		ajax.open("POST", "index.php", true);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send("name="+name+"&pasw="+pasw+"&type=create");
	} else if(menuOn==4) {
		if(event.key=="Backspace") {
			worldName = worldName.slice(0, worldName.length-1)
		}else if(event.key.length==1 && worldName.length < 20) {
			worldName+=event.key
		}
		menus.createSP();
	}else if(menuOn == 6.1 || menuOn == 7.1) {
		if(event.key=="Backspace") {
			name = name.slice(0, name.length-1)
		}else if(event.key.length==1 && name.length < 31) {
			name+=event.key
		}
		if(menuOn == 6.1){
			menus.login();	
		} else 
			menus.signIn();
	} else if(menuOn == 6.2 || menuOn == 7.2) {
		if(event.key=="Backspace") {
			pasw = pasw.slice(0, pasw.length-1)
		}else if(event.key.length==1 && pasw.length < 31) {
			pasw+=event.key
		}
		if(menuOn == 6.2){
			menus.login();	
		} else 
			menus.signIn();
	} else if(playing==2 && event.key=="t" && !chatOn || playing==2 && event.key=="T" && !chatOn) {
		chatOn=true;
	} else if(playing==2 && event.key=="Escape" && !chatOn) {
		menus.selectMP();
		socket.disconnect();
		remotePlayers=undefined;
		socket=undefined;
		console.log("Disconnected");
	} else if(playing==1 && event.key=="Escape") {
		saveWorld();
		menus.selectSP();
	} else if(playing==2 && chatOn) {
		if(event.key=="Backspace") {
			chatMessage = chatMessage.slice(0, chatMessage.length-1)
		}else if(event.key=="Escape") {
			chatOn=false;
		}else if(event.key=="Tab") {
			var playerNames = [name];
			var lastPart = chatMessage.split(' ').slice(-1)[0];
			for(var a of remotePlayers) {
				playerNames.push(a.name);
			}
			if(lastPart == "") {
				chatMessage+=playerNames[0];
			} else if(playerNames.includes(lastPart)) {
				var chatMSG= chatMessage.split(" ").slice(0, -1);
				chatMSG.push(playerNames[playerNames.indexOf(lastPart)+1<playerNames.length?playerNames.indexOf(lastPart)+1:0]);
				chatMessage = chatMSG.join(" ");
			}
		}else if(event.key=="Enter") {
			socket.emit("new message", chatMessage)
			chatMessage="";
			chatOn=false;
		}else if(event.key.length==1 && chatMessage.length < 100) {
			chatMessage+=event.key
		}
	} else
		pressedKeys[event.keyCode] = true;
} 
