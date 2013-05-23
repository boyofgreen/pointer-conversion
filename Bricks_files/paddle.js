/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Paddle = {
	LEFT  : 1,
	RIGHT : 2
};
var Paddles = function (left, right) {
	var FRICTION_FACTOR = 1;
	
	var lElement = left;
	var rElement = right;
	
	var lVelocity = 0;
	var rVelocity = 0;

	this.getElement = function(paddle) {
		switch (paddle) {
			case Paddle.LEFT :
				ret = lElement;
				break;
			case Paddle.RIGHT: 
				ret = rElement;
				break;
			default:
				ret = 0;
				break;
		}
		return ret;
	}
	
	this.getVelocity = function(paddle) {
		switch (paddle) {
			case Paddle.LEFT :
				ret = lVelocity / FRICTION_FACTOR;
				break;
			case Paddle.RIGHT: 
				ret = rVelocity / FRICTION_FACTOR;
				break;
			default:
				ret = 0;
				break;
		}
		return ret;
	}
	
	this.setVelocity = function(paddle, velocity) {
		switch (paddle) {
			case Paddle.LEFT :
				lVelocity = velocity;
				break;
			case Paddle.RIGHT: 
				rVelocity = velocity;
				break;
			default:
				lVelocity = 0;
				rVelocity = 0;
				break;
		}
		return true;
	}
};