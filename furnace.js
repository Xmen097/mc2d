var furnaceSaves = [];
var furnaceInventoryPrefab=[new inventorySpace(172, 78), 
			 new inventorySpace(172, 128),
			 new inventorySpace(280, 103)];
var furnace = copy(furnaceInventoryPrefab);

var furnaceRecipes=[[materials[2], items.coal], [materials[1], materials[0]], [materials[7], items.iron], [materials[10], items.gold]]

var smeltingTime=999;

var furnaceSmeltingProgress;
var furnaceFuelProgress;

function checkForFurnaceSmelting() {
	for(var a of furnaceSaves) { 	
		if(furnaceSaves[furnaceSaves.indexOf(a)].fuel != 0) {
			furnaceSaves[furnaceSaves.indexOf(a)].fuel--;
			furnaceArrowUI.percent=100*(a.smelting/smeltingTime)
			furnaceFireUI.percent = Math.round((furnaceSaves[furnaceSaves.indexOf(a)].fuel/a.maxFuel)*10)*10;
		}
		for(var c of furnaceRecipes){
			if(a.inventory[0].item == c[0]){
				if(furnaceSaves[furnaceSaves.indexOf(a)].fuel != 0) {
					if(a.inventory[2].item==undefined && a.inventory[0].item == c[0] || a.inventory[2].item==c[1] && a.inventory[0].item == c[0]) {
						furnaceSaves[furnaceSaves.indexOf(a)].smelting++;	
					}
					if(a.smelting>=smeltingTime && a.inventory[0].item == c[0]) {
						furnaceSaves[furnaceSaves.indexOf(a)].smelting=0;
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[2].count++;	
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].count--;	
						if(furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].count == 0) {
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].item=undefined;
							furnaceSaves[furnaceSaves.indexOf(a)].inventory[0].reRender();	
						}
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[2].item=c[1];
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[2].reRender();
					}
					if(furnaceSaves[furnaceSaves.indexOf(a)].active) {
						furnaceFireUI.percent = Math.round((furnaceSaves[furnaceSaves.indexOf(a)].fuel/a.maxFuel)*10)*10;
					}
				}
				if(a.inventory[0].item == c[0] && a.inventory[1].item != undefined && a.inventory[1].item.smelting != undefined && furnaceSaves[furnaceSaves.indexOf(a)].fuel == 0) {
					furnaceSaves[furnaceSaves.indexOf(a)].fuel = a.inventory[1].item.smelting;
					furnaceSaves[furnaceSaves.indexOf(a)].maxFuel = a.inventory[1].item.smelting;
					furnaceSaves[furnaceSaves.indexOf(a)].inventory[1].count--;
					if(a.inventory[1].count==0) {
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[1].item = undefined;
						furnaceSaves[furnaceSaves.indexOf(a)].inventory[1].reRender();
					}
				}
				if(furnaceSaves[furnaceSaves.indexOf(a)].fuel == 0 || a.inventory[0].item != c[0]) {
					furnaceSaves[furnaceSaves.indexOf(a)].smelting=0;
					if(furnaceSaves[furnaceSaves.indexOf(a)].active) 
						furnaceArrowUI.percent=0;
				}
				break;
			}	
		}
	}
}