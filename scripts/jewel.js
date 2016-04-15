var jewel = (function() {

        var scriptQueue = [],
            numResourcesLoaded = 0,
            numResources = 0,
            executeRunning = false;

       function executeScriptQueue() {
            var next = scriptQueue[0],
                first, script;

            if (next && next.loaded) {
                executeRunning = true;
                //remove the first element in the queue
                scriptQueue.shift();
                first = document.getElementsByTagName("script") [0];
                script = document.createElement("script");
                script.onload = function() {
                    if (next.callback) {
                        next.callback();
                    }
                    //try to execute more scripts
                    executeScriptQueue();
                };
                script.src = next.src;
                first.parentNode.insertBefore(script, first);
            } else {
                executeRunning = false;
                
            console.log("this works!");

            console.log("Success!");
            console.warn("Your warning here");
                
            }
        }

        function load(src, callback) {
            var image, queueEntry;
            numResources++;

            // add this resource to the execution queue
            queueEntry = {
                src: src,
                callback: callback,
                loaded: false
            };
            scriptQueue.push(queueEntry);

            image = new Image();
            image.onload = image.onerror = function() {
                numResourcesLoaded++;
                queueEntry.loaded = true;
                if (!executeRunning) {
                    executeScriptQueue();
                }
            };
            image.src = src;
        }

        function showScreen(screenId) {
            var dom = jewel.dom,
                $ = dom.$,
                activeScreen = $("#game .screen.active") [0],
                screen = $("#" + screenId) [0];
            if (activeScreen) {
                dom.removeClass (activeScreen, "active");
            }
            dom.addClass(screen, "active");
        }

    	function setup() {
            jewel.showScreen("splash-screen");   

    	}

    	return {
    		load: load,
    		setup: setup,
            showScreen : showScreen
    	};
}) ();

