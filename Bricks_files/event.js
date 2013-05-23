/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Event = function (target, type, listener, capture) {
    "use strict";
    capture = capture || false;
    if (target.addEventListener) {
	    target.addEventListener(type, listener, capture);
		return true;
	} else if (target.attachEvent) {
		return target.attachEvent("on" + type, listener);
	}
};