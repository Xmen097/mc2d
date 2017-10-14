var holding=new inventorySpace();
var clickedItem;
var findSth;

onmousedown = function(event) {
	var x = event.pageX - document.getElementById('canvas').offsetLeft;
	var y = event.pageY - document.getElementById('canvas').offsetTop;
	if(menuOn==1) {
		if(x>0.28*canvas.width && y>0.28*canvas.height && x<0.73*canvas.width && y<0.42*canvas.height) {
			menu.selectSP();
		} else if(x>0.28*canvas.width && y>0.51*canvas.height && x<0.73*canvas.width && y<0.65*canvas.height) {
			menu.selectMP();
		} else if(x>0.28*canvas.width && y>0.74*canvas.height && x<0.73*canvas.width && y<0.88*canvas.height) {
			console.log("Set")
		}

	}else if(menuOn==2) {
		if(x>0.1*canvas.width && y>0.76*canvas.height && x<0.495*canvas.width && y<0.88*canvas.height) {
			//play SP game
		} else if(x>0.505*canvas.width && y>0.76*canvas.height && x<0.9*canvas.width && y<0.88*canvas.height) {
			menu.createSP();
		} 
	} else if(menuOn==3){
		for(var a=0;a<savedMPs.length;a++) {
			if(x>0.125*canvas.width && y>0.275*canvas.height+a*0.125*canvas.height && x<0.875*canvas.width && y<0.375*canvas.height+a*0.125*canvas.height) { 
				MPSelected=a;
				menu.selectMP();
			}
		}
		if(x>0.1*canvas.width && y>0.76*canvas.height && x<0.495*canvas.width && y<0.88*canvas.height) {
			ip=savedMPs[MPSelected].ip;
			connectToServer();
		} else if(x>0.505*canvas.width && y>0.76*canvas.height && x<0.9*canvas.width && y<0.88*canvas.height) {
			menu.createMP();
		} 
	} else if(menuOn == 4) {

	} else if(menuOn == 5) {
		if(x>0.3*canvas.width && y>0.76*canvas.height && x<0.7*canvas.width && y<0.88*canvas.height) {
			connectToServer();	
		}
	} else if(Math.floor(menuOn) == 6) {
		if(x>0.3*canvas.width && y>0.72*canvas.height && x<0.7*canvas.width && y<0.84*canvas.height) {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if (ajax.responseText) {
					if(ajax.responseText != 'Login server offline!' && ajax.responseText != 'Invalid name or password!' && ajax.responseText != 'Failed to generate token!') {
						loginToken = ajax.responseText;
						menu.main();
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
			ajax.send("name="+name+"&pasw="+pasw+"&type=login");	//sending plane-text password, later should be one-way encrypted (sha-256)
		} else if(x>0.3*canvas.width && y>0.88*canvas.height && x<0.7*canvas.width && y<0.96*canvas.height) {
			menu.signIn();
		} else if(x>0.175*canvas.width && y>0.35*canvas.height && x<0.825*canvas.width && y<0.45*canvas.height) {
			menuOn=6.1;
			menu.login()
		} else if(x>0.175*canvas.width && y>0.57*canvas.height && x<0.825*canvas.width && y<0.67*canvas.height) {
			menuOn=6.2;
			menu.login()
		}
	} else if(Math.floor(menuOn) == 7) {
		if(x>0.3*canvas.width && y>0.72*canvas.height && x<0.7*canvas.width && y<0.84*canvas.height) {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if (ajax.responseText) {
					if(ajax.responseText != 'Login server offline!' && ajax.responseText != 'Name or password is too short (<5)' && ajax.responseText != 'Failed to generate token!') {
						loginToken = ajax.responseText;
						menu.main();
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
		} else if(x>0.3*canvas.width && y>0.88*canvas.height && x<0.7*canvas.width && y<0.96*canvas.height) {
			menu.login();
		} else if(x>0.175*canvas.width && y>0.35*canvas.height && x<0.825*canvas.width && y<0.45*canvas.height) {
			menuOn=7.1;
			menu.signIn()
		} else if(x>0.175*canvas.width && y>0.57*canvas.height && x<0.825*canvas.width && y<0.67*canvas.height) {
			menuOn=7.2;
			menu.signIn()
		}
	} else if(craftingUI==undefined && furnaceUI==undefined && !inventoryOn && x <= canvas.width && y <= canvas.height && x >= 0 && y >= 0) {
		if(event.button == 0){
			breakBlock(event);
		}else if(event.button == 2){
			var x=Math.floor((event.pageX - document.getElementById('canvas').offsetLeft + camera.x)/canvas.tileSize);
			var y=Math.floor((event.pageY - document.getElementById('canvas').offsetTop + camera.y*-1)/canvas.tileSize);
			if(map[y][x] != -1 && materials[map[y][x]].active != undefined) {
				if(materials[map[y][x]].active == "furnace") {
					inventoryUI=undefined;
					for(var a of furnaceSaves) {
						if(a.x == x && a.y == y)
							furnaceSaves[furnaceSaves.indexOf(a)].active=true;
					}
					inventoryOn = false;
					furnaceArrowUI = new component(72*canvas.width/820, 45*canvas.height/820, "textures/ui/furnaceArrow.png", camera.x + (canvas.width*0.469), camera.y*-1 + (canvas.height*0.294),"furnaceArrow");
					furnaceFireUI = new component(40*canvas.width/820, 40*canvas.height/820, "textures/ui/furnaceFire.png", camera.x + (canvas.width*0.378), camera.y*-1 + (canvas.height*0.299),"furnaceFire");
					furnaceUI = new component(359*canvas.width/500, 337*canvas.height/500, "textures/ui/furnace.png", camera.x + (canvas.width - 359*canvas.width/500)/2, camera.y*-1 + (canvas.height - 359*canvas.height/500)/2,"image");
					for(var a of furnaceSaves) {
						if(a.x == x && a.y == y) {
							furnace=a.inventory;
						}
					}
					for (var m of inventory.inventory) {
						for(var a of m) {
							a.reRender();
						}
					}
					for(var a of inventory.hotbar) {
						a.reRender();
					}	
					for(var a of furnace) {
						a.reRender();
					}	
				}else if(materials[map[y][x]].active == "crafting") {
					craftingUI = new component(359*canvas.width/500, 337*canvas.height/500, "textures/ui/crafting.png", camera.x + (canvas.width - 359*canvas.width/500)/2, camera.y*-1 + (canvas.height - 359*canvas.height/500)/2,"image");
					for (var m of inventory.inventory) {
						for(var a of m) {
							a.reRender();
						}
					}
					for(var a of inventory.hotbar) {
						a.reRender();
					}	
					for(var a of craftingTable) {
						if(a!=undefined && typeof a!= "number")
						a.reRender();
					}	
					inventoryOn = false;
					inventoryUI=undefined;
				}
			}else if(activeItem.item != undefined && activeItem.item.type == undefined && map[y][x] == -1) {
				if(y == (Math.ceil(player.y/canvas.tileSize)) && x == Math.round(player.x/canvas.tileSize) || y == Math.ceil(player.y/canvas.tileSize)+1 && x == Math.round(player.x/canvas.tileSize)){return;}
				if(playing==2) {
					for(var p of remotePlayers) {
						if(y == (Math.ceil(p.y/canvas.tileSize)) && x == Math.round(p.x/canvas.tileSize) || y == Math.ceil(p.y/canvas.tileSize)+1 && x == Math.round(p.x/canvas.tileSize)){return;}		
					}
				}
				for(var a=0;a<materials.length;a++) {
					if(materials[a] == activeItem.item) {
						map[y][x] = a;
						if(playing==2)
							socket.emit("map edit", {x:y, y:x, block: a})
						if(materials[a].active == "furnace") {
							furnaceSaves[furnaceSaves.length] = {x:x, y:y, smelting:0, fuel:0, inventory:[new inventorySpace(172, 78), new inventorySpace(172, 128), new inventorySpace(280, 103)]};
						}
						inventory.hotbar[activeSlot.slot-1].count-=1;
						if(inventory.hotbar[activeSlot.slot-1].count == 0)
							inventory.hotbar[activeSlot.slot-1].item=undefined;
						renderMap();
					}
				}
			}
		}
	} else if(inventoryOn || furnaceUI != undefined || craftingUI != undefined) {
		for(var a of inventory.inventory) { // search what item was clicked
			for(var b of a) {
				if(b.x <= x && x <= b.x+itemSize && b.y <= y && y <= b.y+itemSize) {
					clickedItem = b;
					findSth=true;
					break;
				}
			}
		}
		for(var b of inventory.hotbar) {
			if(b.x <= x && x <= b.x+itemSize && b.y <= y && y <= b.y+itemSize) {
				clickedItem = b;
				findSth=true;
				break;
			}
		}
		if(inventoryOn) {
			for(var b of crafting) {
				if(b.x <= x && x <= b.x+itemSize && b.y <= y && y <= b.y+itemSize) {
					clickedItem = b;
					findSth=true;
					break;
				}
			}
			for(var b of inventory.armor) {
				if(b.x <= x && x <= b.x+itemSize && b.y <= y && y <= b.y+itemSize) {
					clickedItem = b;
					findSth=true;
					break;
				}
			}
		} else if(furnaceUI != undefined) {
			for(var b of furnace) {
				if(b.x <= x && x <= b.x+itemSize && b.y <= y && y <= b.y+itemSize) {
					clickedItem = b;
					findSth=true;
					break;
				}
			}
		} else if(craftingUI != undefined) {
			for(var b of craftingTable) {
				if(b!=undefined && b.x <= x && x <= b.x+itemSize && b.y <= y && y <= b.y+itemSize) {
					clickedItem = b;
					findSth=true;
					break;
				}
			}
		}
		if(findSth) {findSth=false;} else return;
//sebrani
		if(holding.item == undefined && clickedItem.item != undefined || holding.item == clickedItem.item && clickedItem==crafting[4] || holding.item == clickedItem.item && clickedItem==furnace[2] || holding.item == clickedItem.item && clickedItem==craftingTable[99]){ // pick-up clicked item
			if(event.button == 0) {
				holding.count += clickedItem.count;
				holding.item = clickedItem.item;
				if(clickedItem == crafting[4]) {
					for(var a=0;a<4;a++) {
						if(crafting[a].count > 0)
							crafting[a].count -= 1;
						if(crafting[a].count == 0)
							crafting[a].item = undefined;
						crafting[a].reRender()
					}
				}
				if(clickedItem == craftingTable[99]) {
					for(var a=0;a<9;a++) {
						if(craftingTable[a].count > 0)
							craftingTable[a].count -= 1;
						if(craftingTable[a].count == 0)
							craftingTable[a].item = undefined;
						craftingTable[a].reRender();
					}
				}
				holding.reRender();
				clickedItem.item=undefined;
				clickedItem.count = 0;
				clickedItem.reRender();
				checkCraftingResult()
			} else if (event.button == 2 && clickedItem != crafting[4]) {
				holding.count = Math.ceil(clickedItem.count/2);						
				clickedItem.count = (clickedItem.count - Math.ceil(clickedItem.count/2));
				holding.item = clickedItem.item;
				if(clickedItem.count == 0)
					clickedItem.item = undefined;
					checkCraftingResult()
			} else {
				return;
			}
			var x = event.pageX - document.getElementById('canvas').offsetLeft;
			var y = event.pageY - document.getElementById('canvas').offsetTop;
			holding.x = x;
			holding.y = y;
			holding.reRender();

//pokladani
		} else if(clickedItem.item == holding.item || clickedItem.item == undefined && clickedItem != crafting[4] && clickedItem != craftingTable[99] && clickedItem != furnace[2] && clickedItem != inventory.armor[0] && clickedItem != inventory.armor[1] && clickedItem != inventory.armor[2] && clickedItem != inventory.armor[3] || clickedItem == inventory.armor[0] && holding.item.type == "helmet"  || clickedItem == inventory.armor[1] && holding.item.type == "chestplate"  || clickedItem == inventory.armor[2] && holding.item.type == "trousers" || clickedItem == inventory.armor[3] && holding.item.type == "shoes"){ // release clicked item
			if(event.button == 0 && clickedItem != crafting[4]) {
				clickedItem.count += holding.count;
				clickedItem.item = holding.item;
				clickedItem.reRender();
				holding.item = undefined;
				holding.count = 0;	
				holding.reRender();
				checkCraftingResult()			
			} else if (event.button == 2 && clickedItem != crafting[4] && clickedItem != furnace[2]) {
				clickedItem.count += 1;
				clickedItem.item = holding.item;
				holding.count -= 1;
				clickedItem.reRender();
				checkCraftingResult();
				if(holding.count == 0)
					holding.item = undefined;
				holding.reRender();
			}
		}

	}
}

onmouseup = function(event) {//vole
	if(destroingTexture != undefined) {
		for(var a of destroingBlock) {
			clearTimeout(a);	
		}
		destroingTexture = undefined;
		if(playing==2)
			socket.emit("block breaking", {x:0, y:0, progress: -1});
	}
}

onmousemove = function(event) {
	if(holding.item != undefined && inventoryOn || holding.item != undefined && furnaceUI != undefined || holding.item != undefined && craftingUI != undefined) {
		holding.reRender();
		var x = event.pageX - document.getElementById('canvas').offsetLeft;
		var y = event.pageY - document.getElementById('canvas').offsetTop;
		holding.x = x;
		holding.y = y;
	}
}
