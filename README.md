pointer-conversion
==================


Demo how to convert a mouse based app into a pointer app, which will allow you to support mult-touch, mouse and pen.

How to Demo:

1. show game with mouse events and no multi- touch support
2. open file Bricks_files/default.js
3. change this code:


	Event(leftOverlay, "mouseup", function() { if(Game.canStart()) { Balls.release(Player.ONE); } }, false);
	
	Event(rightOverlay, "mouseup", function() { if(Game.canStart()) { Balls.release(Player.TWO); } }, false);
	
	Event(leftOverlay, "mousemove", Game.movePaddle, false);
	
	Event(rightOverlay, "mousemove", Game.movePaddle, false);
		
to this:

	Event(leftOverlay, "MSPointerUp", function() { if(Game.canStart()) { Balls.release(Player.ONE); } }, false);
	Event(rightOverlay, "MSPointerUp", function() { if(Game.canStart()) { Balls.release(Player.TWO); } }, false);
	Event(leftOverlay, "MSPointerMove", Game.movePaddle, false);
	Event(rightOverlay, "MSPointerMove", Game.movePaddle, false);


4. refresh app, show multitouch support, and support for multiple input types at same time.



see the demo in action: http://channel9.msdn.com/posts/Easy-Multi-touch-Web-Apps-Upgrade-From-Mouse-to-Pointer-Events 

origional code:  ietestdrive.com
demo by: Jeff Burtoft (@boyofgreen)
