/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Animation = (function () {
	var renderers = [];
	var isRunning = false;
	var interval = null;
	
    // fps tracking
    var avgTime = 0;
    var trackFrames = 60;
    var frameCounter = 0;
	var avgFps = 0;
	var avgDuration = 0;
	var totalDuration = 0;
	var fpsElem = null;
	var perf = new Performance();;

	perf.Initialize();
		
    function animationFrame(code) {
		return (window.requestAnimationFrame	|| 
			window.msRequestAnimationFrame	|| 
			window.mozRequestAnimationFrame	|| 
			window.oRequestAnimationFrame	|| 
			window.webkitRequestAnimationFrame	|| 
			function( code ){
				window.setTimeout(code, 1000 / 60);
			})(code);
    }
	
	function cancelAnimationFrame(id) {
		return (window.cancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame	|| 
			window.mozCancelRequestAnimationFrame	|| 
			window.oCancelRequestAnimationFrame	|| 
			window.webkitCancelRequestAnimationFrame	||
			function ( interval ) {
				clearInterval(interval);
			})(id);
	}	

	function renderAll () {
		var startDate;
		var endDate, i;
		var renderersCount = renderers.length;		
	
		
		// Start Rendering 
		perf.BeginDrawLoop();
		if (isRunning) {
			interval = animationFrame(renderAll);
		}				
		for (i = 0; i < renderersCount; i++) {
			if (renderers[i] && renderers[i]) {
				renderers[i]();
			}
		}
		perf.FinishDrawLoop();
		// End Rendering
	}

	function add (renderer) {
		if (renderer) {
			renderers.push(renderer);
		}
	}
	
	function getDuration () {
		return Math.ceil(avgDuration);
	}
	
	function getFps () {
		return avgFps;
	}
	
	function renderFps() {
		if (!fpsElem) {
			__setupFps();
		}
		
		if(fpsElem.innerText) {
			fpsElem.innerText = perf.GetDashboardMessage();
		} else {
			fpsElem.textContent = perf.GetDashboardMessage();
		}
	}
	
	function __setupFps() {
		fpsElem = document.createElement("div");
		fpsElem.id = "fps";
		
		document.body.appendChild(fpsElem);
	}
	
    function start() {
        if (isRunning) return;
        interval = animationFrame(renderAll);
        isRunning = true;
    }

    function stop() {
        if (!isRunning) return;
		cancelAnimationFrame(interval);
        isRunning = false;
    }
	
	function isDemoRunning () {
		return isRunning;
	}
	
	return {
		"add" : add,
		"getDuration" : getDuration,
		"stop" : stop,
		"start" : start,
		"isRunning" : isDemoRunning,
		"getFps" : getFps, 
		"renderFps" : renderFps
	};

}());