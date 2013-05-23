/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Blocks = (function () {
	var blocks = [];
	var pointsPerBlock = 20;
	var blockHolder;
	var height = 0;
	
	function addBlock (def) {
		var b, block, shouldStack;
		
		block = document.createElement("div");
		if (def.className.indexOf("noBlock") > -1) {
			block.className = "noBlock";
			shouldStack = false
		} else {
			block.className = "block";
			shouldStack = true;
		}
		block.zIndex = 3000;
		block.style.position = "relative";
		block.className += " " + (def.className || "block bounce");
		
		b = new Block(block, new Point(def.x, def.y));
		getBlockHolder().appendChild(block);
		if (shouldStack) {
			blocks.push(b);
		}
	};
	
	function remove (ref) {
		var b;
		for (b in blocks) {
			if (blocks[b].element === ref) {
				blocks[b].element.className = "noBlock";
				
				blocks.splice(b,1);
				if (Score) {
					Score.update( Game.getCurrentPlayer(), pointsPerBlock );
				}
				if (Sound) {
					Sound.play("brick");
				}
			}
		}
		if (blocks.length === 0) {
			Game.setLevelComplete();
		}
	};
	
	function clear() {
		var b, node;
		for (b = blocks.length; b >= 0; --b) {
			blocks.splice(b,1);
		}
		if (getBlockHolder().hasChildNodes()) {
			while (blockHolder.childNodes.length >= 1) {
				blockHolder.removeChild(blockHolder.firstChild);
			}
		}
	}
	
	function addBlocks (gameName) {
		var gameDef = GameDefinitions[gameName];
		
		var gameBlocks = null, 
			block = null, 
			b = null;
		
		document.title = Game.getName() + " - " + gameDef.title;
		if (gameDef) {
			gameBlocks = gameDef.blocks;
			for (b in gameBlocks) {
				block = gameBlocks[b];
				addBlock(block);
			}
		}
		getBlockHolder().style.width = (gameDef.columns * 61) + "px";
		blockHolder.style.height = (gameDef.rows * 60) + "px";

		setLocation();		
	};
	
	function setLocation () {
		getBlockHolder().style.left = (document.body.clientWidth / 2) - (getBlockHolder().clientWidth / 2) + "px";
		blockHolder.style.top = (document.body.clientHeight / 2) - (blockHolder.clientHeight / 2)  + "px";	
	};
	
	function renderAll () {
		var h = Game.getCanvasHeight();
		var b;
		if (h != height) {
			height = h;
			var b;
			for (b in blocks) {
				blocks[b].next();
			}
		}
	};
	
	function getBlockHolder () {
		if (!blockHolder) {
			blockHolder = document.getElementById("blockHolder");
		} 
		return blockHolder;
	}
	
	return {
		"addBlocks" : addBlocks,
		"remove" : remove,
		"clear" : clear,
		"renderAll" : renderAll,
		"array" : blocks, 
		"setLocation" : setLocation
	};
}());