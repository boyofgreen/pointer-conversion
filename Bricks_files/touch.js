/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Touch = (function () {
    "use strict";

    function preventEvents(evtObj) {
		/*
		if (evtObj.preventDefault) { evtObj.preventDefault(); }
        if (evtObj.preventManipulation) { evtObj.preventManipulation(); }
		if (evtObj.preventMouseEvent) { evtObj.preventMouseEvent(); }
		*/
    }
    return {
        "preventEvents": preventEvents
    };
}());