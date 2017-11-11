var smallRecipes=[[materials[2], materials[11], 4],
				 [materials[11], materials[11], materials[11], materials[11], materials[12], 1],
				 [materials[11],undefined ,materials[11], items.stick, 4],
				 [items.iron, undefined, undefined, items.iron, items.scissors, 1]]

var bigRecipes=[[materials[1],materials[1],materials[1],
				 materials[1],undefined,      materials[1],
				 materials[1],materials[1],materials[1],
				 materials[13], 1],
				[materials[11],undefined,undefined,
				 items.stick,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.woodShovel, 1],
				[materials[1],undefined,undefined,
				 items.stick,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.stoneShovel, 1],
				[items.iron,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.ironShovel, 1],
				[items.diamond,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.diamondShovel, 1],
				[items.gold,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.stick,undefined,undefined,
				 items.goldShovel, 1],				
				 [materials[11],materials[11],materials[11],
				 undefined,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.woodPickaxe, 1],
				[materials[1],materials[1],materials[1],
				 undefined,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.stonePickaxe, 1],
				[items.iron,items.iron,items.iron,
				 undefined,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.ironPickaxe, 1],
				[items.diamond,items.diamond,items.diamond,
				 undefined,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.diamondPickaxe, 1],
				[items.gold,items.gold,items.gold,
				 undefined,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.goldPickaxe, 1],				
				 [materials[11],materials[11],undefined,
				 materials[11],items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.woodAxe, 1],
				[materials[1],materials[1],undefined,
				 materials[1],items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.stoneAxe, 1],
				[items.iron,items.iron,undefined,
				 items.iron,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.ironAxe, 1],
				[items.diamond,items.diamond,undefined,
				 items.diamond,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.diamondAxe, 1],
				[items.gold,items.gold,undefined,
				 items.gold,items.stick,undefined,
				 undefined,items.stick,undefined,
				 items.goldAxe, 1]]

var crafting=[new inventorySpace(236, 75),
		  new inventorySpace(268, 75), 
		  new inventorySpace(236, 100), 
		  new inventorySpace(268, 100),
		  new inventorySpace(338, 90)]; // crafting result field

var craftingTable =[new inventorySpace(122, 78),new inventorySpace(154, 78),new inventorySpace(187, 78),
					new inventorySpace(122, 103),new inventorySpace(154, 103),new inventorySpace(187, 103),
					new inventorySpace(122, 128),new inventorySpace(154, 128),new inventorySpace(187, 128), NaN, NaN, NaN, NaN, NaN, NaN]
craftingTable[99] = new inventorySpace(291, 103);

function countItemsInRecipe(recipe) {
	var count = 0;
	for(var x of recipe) {
		if(x != undefined)
			count++;
	}
	return count-2;
}

function checkCraftingResult() {
	for(var a of smallRecipes) {
		if(inventoryOn){
			var itemCount=0;
			var item;
			for(var m of crafting) {
				if(m.item != undefined && crafting.indexOf(m) != 4) {
					if(item == undefined)
						item=m;
					itemCount++;
				}
			}		
			if(a.length == 3 && itemCount==1 && item.item==a[0]) {
				crafting[4].item = a[1];
				crafting[4].count = a[2];
				crafting[4].reRender();
				return;
			} else if(a.length == 5 && itemCount==countItemsInRecipe(a) && item.item==a[0]  && crafting[crafting.indexOf(item)+1].item == a[1] && crafting[crafting.indexOf(item)+2].item == a[2]) {
				crafting[4].item = a[3];
				crafting[4].count = a[4];
				crafting[4].reRender();
				return;
			} else if(a.length == 6 && itemCount==countItemsInRecipe(a) && item.item==a[0] && crafting[crafting.indexOf(item)+1].item == a[1] && crafting[crafting.indexOf(item)+2].item == a[2] && crafting[crafting.indexOf(item)+3].item == a[3]) {
				crafting[4].item = a[4];
				crafting[4].count = a[5];
				crafting[4].reRender();
				return;
			}	
		} else if(craftingUI != undefined) {
			var itemCount=0;
			var item;
			for(var m of craftingTable) {
				if(m != undefined && m.item != undefined) {
					if(item == undefined)
						item=m;
					itemCount++;
				}else if(m == undefined)
					break;
			}		
			if(a.length == 3 && itemCount==1 && item.item==a[0]) {
				craftingTable[99].item = a[1];
				craftingTable[99].count = a[2];
				craftingTable[99].reRender();
				return;
			} else if(a.length == 5 && itemCount==countItemsInRecipe(a) && item.item==a[0] &&craftingTable[craftingTable.indexOf(item)+1].item == a[1] && craftingTable[craftingTable.indexOf(item)+3].item == a[2]) {
				craftingTable[99].item = a[3];
				craftingTable[99].count = a[4];
				craftingTable[99].reRender();
				return;
			} else if(a.length == 6 && itemCount==countItemsInRecipe(a) && item.item==a[0] &&  craftingTable[craftingTable.indexOf(item)+1].item == a[1] && craftingTable[craftingTable.indexOf(item)+3].item == a[2] && craftingTable[craftingTable.indexOf(item)+4].item == a[3]) {
				craftingTable[99].item = a[4];
				craftingTable[99].count = a[5];
				craftingTable[99].reRender();
				return;
			}
		}
	}
	for(var a of bigRecipes) {
		var itemCount=0;
		var item;
		for(var m of craftingTable) {
			if(m != undefined && m.item != undefined) {
				if(item == undefined)
					item=m;
				itemCount++;
			}else if(m == undefined)
				break;
		}	
		if(itemCount==countItemsInRecipe(a) && item.item==a[0] && craftingTable[craftingTable.indexOf(item)+1].item == a[1] && craftingTable[craftingTable.indexOf(item)+2].item == a[2] && craftingTable[craftingTable.indexOf(item)+4].item == a[4] && craftingTable[craftingTable.indexOf(item)+5].item == a[5] && craftingTable[craftingTable.indexOf(item)+6].item == a[6] && craftingTable[craftingTable.indexOf(item)+7].item == a[7] && craftingTable[craftingTable.indexOf(item)+7].item == a[7] && craftingTable[craftingTable.indexOf(item)+8].item == a[8]) {
			craftingTable[99].item = a[9];
			craftingTable[99].count = a[10];
			craftingTable[99].reRender();
			return;
		}
	}
	if(inventoryOn){
		crafting[4].item = undefined;
		crafting[4].count = 0;
		crafting[4].reRender();
	} else if(craftingUI != undefined) {
		craftingTable[99].item = undefined;
		craftingTable[99].count = 0;
		craftingTable[99].reRender();
	}
}