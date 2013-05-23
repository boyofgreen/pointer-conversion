/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Balls = (function () {
	"use strict";
	var balls = [];
	var center = document.getElementById("center");
	
	function newBall (speed, forPlayer) {
		var b, rotate, ball = document.createElement("div");
		var v = speed||10;
		ball.style.zIndex = 10;
		ball.style.position = "absolute";
		ball.className = "ball";
		
		var rotate = document.createElement("div");
		rotate.className = "rotating";
		ball.appendChild(rotate);
		
		var reflect = document.createElement("div");
		reflect.className = "reflection";
		ball.appendChild(reflect);
			
		b = new Ball(ball, v, forPlayer);
		
		center.appendChild(ball);
		balls.push(b);
		Game.setCurrentPlayer(forPlayer)
	}
	
	function release (forPlayer) {
		var b, ball;
		for (b in balls) {
			ball = balls[b];
			if (ball.isAttached && ball.forPlayer == forPlayer) {
				ball.release();
			}
		}
	}
	
	function remove (ref) {
		var b, loser, speed;
		for (b in balls) {
			if(balls[b] === ref) {
				loser = (balls[b].velocity.x > 0 ? Player.ONE : Player.TWO);
				speed = balls[b].speed;
				balls[b].element.style.display = "none";
				balls[b].element.parentNode.removeChild(balls[b].element);
				balls.splice(b,1);
			}
		}
		if(balls.length === 0) {
			newBall(speed, loser);
		}
	}
	
	function removeAll () {
		var b;
		for (b in balls) {
			balls[b].element.style.display = "none";
			balls[b].element.parentNode.removeChild(balls[b].element);
			balls.splice(b,1);
		}
	}
	
	function init () {
		var b;
		for (b in balls) {
			balls[b].init();
		}
	}
	
	function renderAll () {
		var b;
		for (b in balls) {
			balls[b].next();
		}
	}

	return {
		"newBall" : newBall,
		"release" : release,
		"remove" : remove,
		"removeAll" : removeAll,
		"renderAll" : renderAll,
		"array" : balls, 
		"init" : init
	};
}());