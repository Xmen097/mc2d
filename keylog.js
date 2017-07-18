var keys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	w: 87,
	a: 65,
	s: 83,
	d: 68,
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
	if(menuOn==5) {
		if(event.key=="Backspace") {
			ip = ip.slice(0, ip.length-1)
		}else if(event.key.length==1 && ip.length < 40) {
			ip+=event.key
		}
		menu.createMP();
	} else if(playing==2 && event.key=="t" && !chatOn || playing==2 && event.key=="T" && !chatOn) {
		chatOn=true;
	} else if(playing==2 && chatOn) {
		if(event.key=="Backspace") {
			chatMessage = chatMessage.slice(0, chatMessage.length-1)
		}else if(event.key=="Escape") {
			chatOn=false;
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
