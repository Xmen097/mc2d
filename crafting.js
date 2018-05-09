var smallRecipes=[[items[2], items[11], 4],
				 [items[11], items[11], items[11], items[11], items[12], 1],
				 [items[11],undefined ,items[11], items[57], 4],
				 [items[55], undefined, undefined, items[55], items[34], 1]] 

var bigRecipes=[[items[1],items[1],items[1],
				 items[1],undefined,items[1],
				 items[1],items[1],items[1],
				 items[13], 1],
				 [items[11],items[11],items[11],
				 items[11],undefined,items[11],
				 items[11],items[11],items[11],
				 items[58], 1],
				[items[11],undefined,undefined,
				 items[57],undefined,undefined,
				 items[57],undefined,undefined,
				 items[47], 1],
				[items[1],undefined,undefined,
				 items[57],undefined,undefined,
				 items[57],undefined,undefined,
				 items[48], 1],
				[items[55],undefined,undefined,
				 items[57],undefined,undefined,
				 items[57],undefined,undefined,
				 items[49], 1],
				[items[53],undefined,undefined,
				 items[57],undefined,undefined,
				 items[57],undefined,undefined,
				 items[50], 1],
				[items[56],undefined,undefined,
				 items[57],undefined,undefined,
				 items[57],undefined,undefined,
				 items[51], 1],				
				 [items[11],items[11],items[11],
				 undefined,items[57],undefined,
				 undefined,items[57],undefined,
				 items[35], 1],
				[items[1],items[1],items[1],
				 undefined,items[57],undefined,
				 undefined,items[57],undefined,
				 items[36], 1],
				[items[55],items[55],items[55],
				 undefined,items[57],undefined,
				 undefined,items[57],undefined,
				 items[37], 1],
				[items[53],items[53],items[53],
				 undefined,items[57],undefined,
				 undefined,items[57],undefined,
				 items[38], 1],
				[items[56],items[56],items[56],
				 undefined,items[57],undefined,
				 undefined,items[57],undefined,
				 items[39], 1],				
				 [items[11],items[11],undefined,
				 items[11],items[57],undefined,
				 undefined,items[57],undefined,
				 items[41], 1],
				[items[1],items[1],undefined,
				 items[1],items[57],undefined,
				 undefined,items[57],undefined,
				 items[42], 1],
				[items[55],items[55],undefined,
				 items[55],items[57],undefined,
				 undefined,items[57],undefined,
				 items[43], 1],
				[items[53],items[53],undefined,
				 items[53],items[57],undefined,
				 undefined,items[57],undefined,
				 items[44], 1],
				[items[56],items[56],undefined,
				 items[56],items[57],undefined,
				 undefined,items[57],undefined,
				 items[45], 1]]

var craftingPreset=[new inventorySpace(181, 89),
		  new inventorySpace(213, 89), 
		  new inventorySpace(181, 114), 
		  new inventorySpace(213, 114),
		  new inventorySpace(282, 102)]; // crafting result field
var killSlot=new inventorySpace(343, 135); // kill slot
var craftingTablePreset =[new inventorySpace(135, 83),new inventorySpace(168, 83),new inventorySpace(200, 83),
					new inventorySpace(135, 108),new inventorySpace(168, 108),new inventorySpace(200, 108),
					new inventorySpace(135, 135),new inventorySpace(168, 135),new inventorySpace(200, 135), new inventorySpace(287, 108)]

function countItemsInRecipe(recipe) {
	var count = 0;
	for(var x of recipe) {
		if(x != undefined)
			count++;
	}
	return count-2;
}

function checkCraftingResult() {
	if(typeof craftingUI != "undefined") {
		craftingTable[9].item = undefined;
		craftingTable[9].count = 0;
		craftingTable[9].reRender();
	} else {
		crafting[4].item = undefined;
		crafting[4].count = 0;
		crafting[4].reRender();
	}
	for(var a of smallRecipes) {
		if(typeof craftingUI != "undefined") {
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
				craftingTable[9].item = a[1];
				craftingTable[9].count = a[2];
				craftingTable[9].reRender();
				return;
			} else if(a.length == 5 && itemCount==countItemsInRecipe(a) && item.item==a[0] && craftingTable[craftingTable.indexOf(item)+1] && craftingTable[craftingTable.indexOf(item)+1].item == a[1] && craftingTable[craftingTable.indexOf(item)+3] && craftingTable[craftingTable.indexOf(item)+3].item == a[2]) {
				craftingTable[9].item = a[3];
				craftingTable[9].count = a[4];
				craftingTable[9].reRender();
				return;
			} else if(a.length == 6 && itemCount==countItemsInRecipe(a) && item.item==a[0] && craftingTable[craftingTable.indexOf(item)+1] && craftingTable[craftingTable.indexOf(item)+1].item == a[1] && craftingTable[craftingTable.indexOf(item)+3] && craftingTable[craftingTable.indexOf(item)+3].item == a[2] && craftingTable[craftingTable.indexOf(item)+4] && craftingTable[craftingTable.indexOf(item)+4].item == a[3]) {
				craftingTable[9].item = a[4];
				craftingTable[9].count = a[5];
				craftingTable[9].reRender();
				return;
			}
		} else {
			var itemCount=0;
			var item;
			for(var m of crafting) {
				if(m.item != undefined) {
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
			} else if(a.length == 5 && itemCount==countItemsInRecipe(a) && item.item==a[0] && crafting[crafting.indexOf(item)+1] && crafting[crafting.indexOf(item)+1].item == a[1] && crafting[crafting.indexOf(item)+2] && crafting[crafting.indexOf(item)+2].item == a[2]) {
				crafting[4].item = a[3];
				crafting[4].count = a[4];
				crafting[4].reRender();
				return;
			} else if(a.length == 6 && itemCount==countItemsInRecipe(a) && item.item==a[0] && crafting[crafting.indexOf(item)+1] && crafting[crafting.indexOf(item)+1].item == a[1] && crafting[crafting.indexOf(item)+2] && crafting[crafting.indexOf(item)+2].item == a[2] && crafting[crafting.indexOf(item)+3] && crafting[crafting.indexOf(item)+3].item == a[3]) {
				crafting[4].item = a[4];
				crafting[4].count = a[5];
				crafting[4].reRender();
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
		if(itemCount==countItemsInRecipe(a) && item.item==a[0] && (a[1] ? craftingTable[craftingTable.indexOf(item)+1] && craftingTable[craftingTable.indexOf(item)+1].item == a[1] : true) && (a[2] ? craftingTable[craftingTable.indexOf(item)+2] && craftingTable[craftingTable.indexOf(item)+2].item == a[2] : true) && (a[3] ? craftingTable[craftingTable.indexOf(item)+3] && craftingTable[craftingTable.indexOf(item)+3].item == a[3] : true) && (a[4] ? craftingTable[craftingTable.indexOf(item)+4] && craftingTable[craftingTable.indexOf(item)+4].item == a[4] : true) && (a[5] ? craftingTable[craftingTable.indexOf(item)+5] && craftingTable[craftingTable.indexOf(item)+5].item == a[5] : true) && (a[6] ? craftingTable[craftingTable.indexOf(item)+6] && craftingTable[craftingTable.indexOf(item)+6].item == a[6] : true) && (a[7] ? craftingTable[craftingTable.indexOf(item)+7] && craftingTable[craftingTable.indexOf(item)+7].item == a[7] : true) && (a[8] ? craftingTable[craftingTable.indexOf(item)+8] && craftingTable[craftingTable.indexOf(item)+8].item == a[8] : true)) {
			craftingTable[9].item = a[9];
			craftingTable[9].count = a[10];
			craftingTable[9].reRender();
			return;
		}
	}
}