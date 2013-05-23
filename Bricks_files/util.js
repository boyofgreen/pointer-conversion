/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
 var Bounds = (function() {
	return { 
		RIGHT : 1, 
		LEFT : 2, 
		TOP : 4,
		BOTTOM: 8 
	};
}());

var Point = function (x, y) {
	"use strict";
	this.x = x;
	this.y = y;
};

var Line = function(pt1, pt2) {
	"use strict";
	this.pt1 = pt1;
	this.pt2 = pt2;
};

var Velocity = function (x, y) {
	"use strict";
	this.x = x;
	this.y = y;
};

var Util = (function () {
    "use strict";

	function capitalize (word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	
	function elementsInRect (rect, cssClass) {
		var e, elementRect, elements, ret = [];
		if (!cssClass) { return false; }
		
		
		if (document.msElementsFromRect) {
			elements = document.msElementsFromRect(rect.left, rect.top, rect.width, rect.height);
			for ( e = 0; e < elements.length; e++) {
				if (Util.hasCssClass(elements[e], cssClass)) {
					ret.push(elements[e]);
				}
			}
		} else { 
			// Must resort to slower collision detection
			elements = Util.elementsOfClass(document.body, cssClass);
			for ( e = 0; e < elements.length; e++) {
				elementRect = elements[e].getClientRects()[0];
				// if none of these are true, they are colliding
				if( !(	elementRect.left > rect.right || 
						elementRect.right < rect.left || 
						elementRect.top > rect.bottom ||
						elementRect.bottom < rect.top) ) {
					ret.push(elements[e]);
				}
			}
		}
		return ret;
	};
	
	function elementsOfClass (parent, cssClass) {
		var e, ret = [];
		var elements = parent.getElementsByTagName("*");
		for (e in elements) {
			if ( hasCssClass(elements[e], cssClass) ) {
				ret.push(elements[e]);
			}
		}
		return ret;
	}
	
	function getBrowserInfo () {

        var UA = navigator.userAgent.toLowerCase();
        var index, browserName, browserVersion;

        if (UA.indexOf('msie') > -1) {
            index = UA.indexOf('msie');
            browserName = "Internet Explorer";
            browserVersion = "" + parseFloat('' + UA.substring(index + 5));
        }
        else if (UA.indexOf('chrome') > -1) {
            index = UA.indexOf('chrome');
            browserName = "Google Chrome";
            browserVersion = "" + parseFloat('' + UA.substring(index + 7));
        }
        else if (UA.indexOf('firefox') > -1) {
            index = UA.indexOf('firefox');
            browserName = "Mozilla Firefox";
            browserVersion = "" + parseFloat('' + UA.substring(index + 8));
        }
        else if (UA.indexOf('minefield') > -1) {
            index = UA.indexOf('minefield');
            browserName = "Mozilla Firefox Minefield";
            browserVersion = "" + parseFloat('' + UA.substring(index + 10));
        }
        else if (UA.indexOf('opera') > -1) {
            browserName = "Opera";
            browserVersion = "";
        }
        else if (UA.indexOf('safari') > -1) {
            index = UA.indexOf('safari');
            browserName = "Apple Safari";
            browserVersion = "" + parseFloat('' + UA.substring(index + 7));
        }
		
		return { 
			"name" : browserName, 
			"version" : browserVersion 
		};
    }	
	
	function hasCssClass (element, cssClass) {
		var rgx = new RegExp('(?:^|\\s+)' + cssClass + '(?:\\s+|$)');
		return rgx.test(element.className);
	};
	
	function removeCssClass (element, cssClass) {
        var reg = new RegExp('(?:^|\\s+)' + cssClass + '(?:\\s+|$)');
        element.className = element.className.replace(reg, ' ');
	}
	
	function offset (element, bounds) {
		var offset = 0;
		var elem = element;
		do {
			switch (bounds) {
				case Bounds.RIGHT:
				case Bounds.LEFT:
					offset += elem.offsetLeft;
					break;
				case Bounds.TOP: 
				case Bounds.BOTTOM:
					offset += elem.offsetTop;
					break;
				default:
					break;
			}
			if (elem.offsetParent) {
				elem = elem.offsetParent;
			} else { 
				elem = null;
			};
		} while (elem);
		
		if (bounds == Bounds.RIGHT) {
			offset += element.clientWidth;
		}
		if (bounds == Bounds.BOTTOM) {
			offset += element.clientHeight;
		}
		return offset;
	};
	
	function transform (element, data) {
		var properties = ["msTransform","webkitTransform",
			"MozTransform","OTransform","transform"];
		var p;
		while (p = properties.shift()) {
			if (typeof element.style[p] != 'undefined') {
				element.style[p] = data;
				return true;
			}
		}
		return false;
	};
	
	function rotate (element, degrees) {
		return transform(element, 'rotate(' + (d++ % 360) + 'deg)' );
	}
	
	
    return {
		"capitalize" : capitalize,
        "hasCssClass" : hasCssClass,
		"removeCssClass" : removeCssClass,
		"elementsOfClass" : elementsOfClass,
		"elementsInRect" : elementsInRect,
		"getBrowserInfo" : getBrowserInfo,
		"offset" : offset,
		"transform" : transform
    };
}());