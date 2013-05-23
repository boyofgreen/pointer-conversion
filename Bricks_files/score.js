/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
 var Score = (function() {
	var scores = [0,0];
	var setup = false;
	var left, right, scoreElem;
	
	function get (forPlayer) {
		if (!forPlayer) { return 0; }
		
		return scores[forPlayer-1];
	}

	function getAll () {
		return scores;
	}

	function reset () {
		scores = [0,0];
	}
	
	

	function update (forPlayer, points) {
		if (!forPlayer) { return; }
		if (!points) { points=0; }
		
		scores[forPlayer-1] += points;
		
		return scores[forPlayer-1];
	}

	function render () {
		if (!setup) {
			__setup();
		}
		scoreElem.style.width = Game.getCanvasWidth() + "px";
		var it = false;
		if (scores[0] > 0) {
			if( left.innerText) {
				left.innerText = scores[0];
				it = true;
			} else {
				left.textContent = scores[0];
			}
		}
		
		if (scores[1] > 0) {
			if(it) {
				right.innerText = scores[1];
			} else {
				right.textContent = scores[1];
			}
		}
	}
	
	function __setup () {
		scoreElem = document.createElement("div");
	
		left = document.createElement("div");
		left.id = "leftScore";
		left.className = "score";
		
		right = document.createElement("div");
		right.id = "rightScore";
		right.className = "score";
		
		scoreElem.id="scores";
		scoreElem.style.width = window.innerWidth + "px";

		scoreElem.appendChild(left);
		scoreElem.appendChild(right);

		document.body.appendChild(scoreElem);
		
		setup = true;
	}

	return {
		"get" : get,
		"getAll" : getAll,
		"render" : render,
		"reset" : reset,
		"update" : update
	};
}());
