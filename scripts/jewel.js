//the initial contents
var jewel = (function() {

	function load(src, callback) {
	}

	function setup() {
	}

	return {
		load: load,
		setup: setup
	};
}) ();

//the jewel.load() function
var jewel = (function() {
	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executeRunning = false;

	function executeScriptQueue() {

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
			queueEntry.load = true;
			if (!executeRunning) {
				executeScriptQueue();
			}
		};
		image.src = src;
	}

	//...
}) ();

//Executing scripts in the queue
var jewel = (function() {
	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executeRunning = false;

	function executeScriptQueue() {
		var next = scriptQueue[0],
			first, script;

		if (next && next.loaded) {
			executeRunning = ture;
			//remove the first element in the queue
			scriptQueue.shift();
			first = document.getElementByTagName("script") [0];
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
		}
	}

	//...
}) ();
