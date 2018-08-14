var version = [1,0,0]

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
//end
if(localStorage["version"]) {
    if(localStorage["version"].split('.') != version) {
        if(localStorage["version"].split('.')[0] != version[0] || localStorage["version"].split('.')[1] != version[1]) {
            localStorage.clear();
        }
        localStorage["version"] = version.join('.')
    } 
} else {
    localStorage["version"] = version.join('.')
}

var scriptsToLoad = ["global.js", "breakingBlocks.js", "render.js", "playerMovement.js", "keylog.js", "inventory.js", "crafting.js", "furnace.js", "clickLog.js", "terainGenerator.js", "menu.js", "client.js", "sha256.js"]
var scriptsSuccesfullyLoaded=0;
window.onload = function() {
	for(var a of scriptsToLoad) {
		include(a+"?version="+version.join("."), function() {
			if(++scriptsSuccesfullyLoaded == scriptsToLoad.length) {
				windowOnload();
			}
		});
	}
}
