/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Block = function (element, position) {
	"use strict";	

	this.element = element;
	this.position = position;

	this.next = function () {
		this.element.style.left = this.position.x + "px";
		this.element.style.top = this.position.y + "px";
	};
	this.render = this.next;
};