var version;


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


var scriptsToLoad = ["global.js", "breakingBlocks.js", "render.js", "playerMovement.js", "keylog.js", "inventory.js", "crafting.js", "furnace.js", "clickLog.js", "terainGenerator.js", "menu.js", "client.js", "sha256.js"]
var scriptsSuccesfullyLoaded=0;

window.onload = function() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        console.log(ajax.readyState + "" + ajax.responseText)
        if (ajax.readyState == 4) {
            if(ajax.responseText) {
                version = ajax.responseText;
            } else 
                failed=true;
                version = ""+Math.random()+new Date()
        } else {
            failed=true;
            version = ""+Math.random()+new Date()
        }
        if(!failed) {
            if(localStorage["version"]) {
                if(localStorage["version"] != version) {
                    if(localStorage["version"].split('.')[0] != version.split('.')[0]) {
                        localStorage.clear();
                    }
                    localStorage["version"] = version
                } 
            } else {
                localStorage["version"] = version
            }
        }
        scriptLoader()
    }
    ajax.open("POST", "index.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("getVersion");
}

function scriptLoader() {
    if(scriptsSuccesfullyLoaded < scriptsToLoad.length) {
        include(scriptsToLoad[scriptsSuccesfullyLoaded]+"?version="+version, function() {
            scriptsSuccesfullyLoaded++;
            scriptLoader();
        });
    } else {
        windowOnload();
    }
}
