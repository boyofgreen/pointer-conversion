/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Player  = { 
	"ONE" : 1,
	"TWO" : 2
};
var Game = (function () {
	"use strict";
	
	var left = document.getElementById("left"),
		right = document.getElementById("right"),
		center = document.getElementById("center");

	var elements = [];
	var paddles = null;
	var levels = ["beginner", "10", "8", "html", "e"];
	var current_level = 0;
	var velocity = 10;
	var current_player = Player.ONE;
	var can_start = false;
	
	var height = center.clientHeight;
	var width = center.clientWidth;
	var initialized = false;
	
	function getCanStart() { 
		return can_start;
	}
	
	function getCanvasWidth () {
		return width;
	}
	
	function getCanvasHeight () {
		return height;
	}
	
	function getCurrentPlayer() {
		return current_player;
	}
	
	function setCurrentPlayer(player) {
		current_player = player;
	}
		
	function getLevels() {
		return levels;
	}
	
	function init () {
		try {	
			if (featuresSupported()) {			
				if (!resolutionSupported()) { 
					return false;
				}
				elements.push(left.children[0]);
				elements.push(right.children[0]);
				paddles = new Paddles(left.children[0], right.children[0]);

				current_player = Math.ceil(Math.random() * 2);
				Balls.newBall(velocity, current_player);
				
				// begin the animation sequence
				Animation.add(Blocks.renderAll);
				Animation.add(Balls.renderAll);
				if (Options.score()) {
					Animation.add(Score.render);
				}
				Animation.add(Animation.renderFps);
				Animation.start();
				LevelSelector.show();
				initialized = true;
			} else {
				Errors.add("Features required for this demo are not available.");
			}		
		} catch (e) {
			Errors.add("An error occurred: " + e);
		}
	}
	
	function featuresSupported() {
		var ret = true;
		if (!document.body.clientHeight) { 
			Errors.add("- clientHeight is not supported.")
			ret = false;
		}
		document.body.className = ret ? "supported" : "notSupported";
		
		return ret;
	}
	
	function resolutionSupported() {
		var ret = true;
		if (window.innerWidth < 1000 || window.innerHeight < 550) {
			ret = false;
		}
		return ret;
	}
	
	function setLevelComplete() {
		Animation.stop();
		if (Blocks) {
			if ( ++current_level == levels.length  ) {
				Game.end();
			} else {
				ModalDialog.show("Level Complete", "Continue to the next level?", 
					[ Button.create("Yes", Game.nextLevel ), 
					  Button.create("No", Game.end )]);
			}
		} else {
			Errors.add("Blocks cannot be loaded");
		}
	}
	
	function nextLevel() {
		if(++current_level >= levels.length) {
			current_level = 0;
		}
		setLevel(levels[current_level]);
	}
	
	function previousLevel() {
		if(--current_level < 0) {
			current_level = levels.length - 1;
		}	
		setLevel(levels[current_level]);
	}
	
	function end() {
		current_level = 0;	
		Score.reset();
		Balls.removeAll();
		ModalDialog.hide();
		can_start = false;
		LevelSelector.show();
	}

	function setLevel (level) {
		var l;
		for(l = 0; l < levels.length; l++) {
			if(levels[l] == level) {
				current_level = l;
				break;
			}
		}
		can_start = true;
		Balls.removeAll();
		Blocks.clear();
		
		Blocks.addBlocks(level);
		ModalDialog.hide();
		
		Balls.newBall(velocity, Math.ceil(Math.random() * 2));
		Animation.start();
		LevelSelector.hide();
	}
	
	function movePaddle (e) {
		var paddle = null,
		    top = 0,
			maxTop = 0;
		var currentTop = 0;
		var side = null;
		switch (e.target.id) {
			case "leftOverlay" : 
				side = Paddle.LEFT; 
				break;
			case "rightOverlay" : 
				side = Paddle.RIGHT; 
				break;
			default :
				break;
		}
		
		if (paddles) {
			paddle = paddles.getElement(side);
		}
		if (paddle) {
			currentTop = paddle.offsetTop;
			top = ( (e.offsetY||e.clientY) - paddle.clientHeight/2);
			maxTop = e.target.parentElement.clientHeight - paddle.clientHeight;
			if (top < 0) { 
				top = 0; 
			} else if (top > maxTop) { 
				top = maxTop; 
			}
			paddle.style.top =  top + "px";
			paddles.setVelocity(side, top - currentTop);
		} 
	}
	
	function getPaddles () {
		return paddles;
	}
	
	function resize () {
		var ret;

		ModalDialog.hide();
		
		if ( window.innerHeight > window.innerWidth ) {
			Animation.stop();
			ModalDialog.show( "Orientation", "Your screen orientation is not supported.\r\nPlease flip your device.", null);
			return false;
		} else if (	window.innerWidth < 1000) {
			Animation.stop();
			ModalDialog.show( "Small Screen", "Your screen is not wide enough.\r\nPlease resize your browser.", null);
			return  false;
		} else if (window.innerHeight < 550) {
			Animation.stop();
			ModalDialog.show( "Small Screen", "Your screen is not tall enough.\r\nPlease resize your browser.", null);
			return  false;
		}
		Animation.start();
		if (initialized) {
			if (can_start) {
				Animation.stop();
				ModalDialog.show( "Unexpected Resize", "Your screen was resized unexpectedly.", 
					[Button.create("Continue", function () { 
						Blocks.setLocation(); 
						ModalDialog.hide(); 				
						Animation.start(); 
					})]);
			}
		} else { 
			Errors.clear();
			init();
		}
		height = center.clientHeight;
		width = center.clientWidth;	
	}

	return {
		"canStart" : getCanStart,
		"end" : end,
		"initialize" : init,
		"getCanvasHeight" : getCanvasHeight,
		"getCanvasWidth" : getCanvasWidth,
		"getCurrentPlayer" : getCurrentPlayer,
		"getLevels" : getLevels,
		"getName" : function() { return "Brick Breaker"; },	
		"getPaddles" : getPaddles,
		"movePaddle" : movePaddle,
		"nextLevel" : nextLevel,
		"previousLevel" : previousLevel,
		"resize" : resize,
		"Resources" : Resources,
		"setCurrentPlayer" : setCurrentPlayer,
		"setLevel" : setLevel,
		"setLevelComplete" : setLevelComplete
	};
}());