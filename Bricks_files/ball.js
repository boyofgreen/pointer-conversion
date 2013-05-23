/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Ball = function (element,speed, forPlayer) {
	"use strict";
	var	paddle_rect = Game.getPaddles().getElement(forPlayer).getClientRects()[0];
	var height;
	if (!paddle_rect.height) {
		height = paddle_rect.bottom - paddle_rect.top;
	} else { 
		height = paddle_rect.height;
	}
	var angle = Math.random() * 90;
	var rads, position;
	var max_speed = 20;
	
	if (forPlayer == Player.ONE) {
		position = new Point(paddle_rect.right-10, paddle_rect.top + (height / 2));
		if(angle >=45) {
			angle += 270;
		}
	} else {
		position = new Point(paddle_rect.right+10, paddle_rect.top + (height / 2));
		angle += 135;
	}
	
	rads = angle*(Math.PI/180);
	
	this.isAttached = true;
	this.forPlayer = forPlayer;
	
	this.element = element;
	this.position = position;
	this.velocity = new Velocity(Math.cos(rads) * speed, Math.sin(rads) * speed);
	this.angle = angle;
	this.speed = speed;
	
	this.isAbove = function() {
		return (this.position.y < 0);
	};

	this.isBelow = function() {
		return ((this.position.y + this.element.clientHeight) > Game.getCanvasHeight());
	};
	
	this.center = function () {
		return new Point( 
			this.element.offsetLeft + (this.element.clientWidth / 2),
			this.element.offsetTop + (this.element.clientHeight / 2)
		);
	};
	
	this.release = function () {
		this.isAttached = false;
		this.forPlayer = null;
	};
	
	this.checkCollision = function () {
		var collideY = false, collideX = false;
		var item, elem, line, ballc, itemRect;
		var rect, elements, paddleVelocity = 0;
		
		if (! this.isInBounds()) {
			return false
		}
		ballc = this.center();

		// detect overlapping "bouncable" elements
		rect = this.element.getClientRects()[0];
		elements = Util.elementsInRect(rect, "bounce");
		if (!elements) { return false;	} 
		
		for (elem = 0; elem < elements.length; elem++) {
			item = elements[elem];
			itemRect = item.getClientRects()[0];
			
			// check horizontal collision
			line = new Line(
				new Point( (this.velocity.x > 0 ? itemRect.left : itemRect.right), itemRect.top ), 
				new Point( (this.velocity.x > 0 ? itemRect.left : itemRect.right), itemRect.bottom )
				);
			if (collideRadiusCheck(line.pt1, line.pt2, ballc, this.element.clientHeight / 2)) {
				collideX = true;
			}
			
			// check vertical collision
			line = new Line(
				new Point( itemRect.left, (this.velocity.y > 0 ? itemRect.top : itemRect.bottom)), 
				new Point( itemRect.right, (this.velocity.y > 0 ? itemRect.top : itemRect.bottom))
				);
			if (collideRadiusCheck(line.pt1, line.pt2, ballc, this.element.clientHeight / 2)) {
				collideY = true;
			}

			if (collideX || collideY) {
				if (!Util.hasCssClass(item, "paddle")) {
					Blocks.remove(item);
				} else {
					if (this.position.x > (window.innerWidth / 2)) {
						paddleVelocity = Game.getPaddles().getVelocity(Paddle.RIGHT);
						Game.setCurrentPlayer(Player.TWO);
					} else { 
						paddleVelocity = Game.getPaddles().getVelocity(Paddle.LEFT);
						Game.setCurrentPlayer(Player.ONE);
					}
					if (paddleVelocity > 2) { 
						this.velocity.y = Math.min(paddleVelocity,max_speed)*-1;
					}
					Sound.play("paddle");					
				}
			}
		}
		
		if (collideX) {
			this.velocity.x *= -1;
			this.position.x += (this.velocity.x*2.5);
		}
		if (collideY) {
			this.velocity.y *= -1;
			this.position.y += (this.velocity.y*2.5);
		}
		
		return true;
	};
	
	this.isInBounds = function () {
		var rects = this.element.getClientRects();
		var rect = rects[0];
		return rect.right > 0 && rect.left < window.innerWidth
			&& rect.bottom > 0 && rect.top < window.innerHeight;
	};
	
	function collideRadiusCheck (pt1, pt2, centerPt, radius) {
		var a,b,center, bb4ac, midpoint,inc, outc;
		midpoint = new Point(pt2.x - pt1.x, pt2.y - pt1.y);
		a = midpoint.x * midpoint.x + midpoint.y * midpoint.y;
		b = 2 * (midpoint.x * (pt1.x - centerPt.x) + midpoint.y * (pt1.y - centerPt.y));
		center = centerPt.x * centerPt.x + centerPt.y * centerPt.y;
		center += pt1.x * pt1.x + pt1.y * pt1.y;
		center -= 2 * (centerPt.x * pt1.x + centerPt.y * pt1.y);
		center -= radius * radius;
		bb4ac = b * b - 4 * a * center;
		if (Math.abs(a) < 2.5 || bb4ac < 0) {
			inc = 0;
			outc = 0;
			return null;
		}
		inc = (-b + Math.sqrt(bb4ac)) / (2 * a);
		outc = (-b - Math.sqrt(bb4ac)) / (2 * a);
		return { 
			"in": inc, 
			"out": outc 
		};
	}
	

	this.next = function () {
		var rect, height;
		
		if (this.isAttached) { 
			rect = Game.getPaddles().getElement(this.forPlayer).getClientRects()[0];
			if (rect ) {
				if (!rect.height) {
					height = rect.bottom-rect.top;
				} else {
					height = rect.height;
				}
				if (this.forPlayer == Player.ONE) {
					this.position = new Point(rect.right, rect.top + (height / 2));
				} else {
					this.position = new Point(rect.left - 44, rect.top + (height / 2));
				}
			}
		} else {
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			if (this.isAbove() || this.isBelow()) {
				this.velocity.y *= -1;
			}
			if (!this.checkCollision()) {
				Balls.remove(this);
			}
		}
		
		this.element.style.left = this.position.x + "px";
		this.element.style.top = this.position.y + "px";		
	};
	this.render = this.next;
};
