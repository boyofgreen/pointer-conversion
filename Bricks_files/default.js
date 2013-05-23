/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
(function () {
	"use strict";
	var leftOverlay = document.getElementById("leftOverlay"),
	    rightOverlay = document.getElementById("rightOverlay");


	// initialize the demo on window load
	Event(window, "load", function() { Game.resize(); }, false);
	Event(window, "resize", Game.resize, false);
	Event(window, "keydown", Keys.handle, false);
		
	Touch.preventEvents(leftOverlay);
	Touch.preventEvents(rightOverlay);

		// msPointer (includes touch and mouse)
	//	Event(leftOverlay, "MSPointerUp", function() { if(Game.canStart()) { Balls.release(Player.ONE); } }, false);
	//	Event(rightOverlay, "MSPointerUp", function() { if(Game.canStart()) { Balls.release(Player.TWO); } }, false);
	 //   Event(leftOverlay, "MSPointerMove", Game.movePaddle, false);
	 //   Event(rightOverlay, "MSPointerMove", Game.movePaddle, false);

		Event(leftOverlay, "mouseup", function() { if(Game.canStart()) { Balls.release(Player.ONE); } }, false);
		Event(rightOverlay, "mouseup", function() { if(Game.canStart()) { Balls.release(Player.TWO); } }, false);	
	    Event(leftOverlay, "mousemove", Game.movePaddle, false);
	    Event(rightOverlay, "mousemove", Game.movePaddle, false);
		


	
	Options.fps(true);
	Options.score(true);
	Options.sound(true);
	Options.set("displayErrorOnDemand", true);
}());


