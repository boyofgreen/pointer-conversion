/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
/* Log Functions
 *****************************************************************************/
var Log = {
        debugOn : false,
        verboseOn : true,
        renderDebug : false,
		displayOn : false,
        verbose : function (msg) { if (this.verboseOn) { this.log("VERBOSE: " + msg); } },
        debug : function (msg) { if (this.debugOn) { this.log("DEBUG: " + msg); } },
        log : function (msg) { try { if (console && console.log) { console.log(msg); } } catch (e) {} },
		keyValue : function (k, v, t) { return (t ? this.tabs(t) : "") + k.toUpperCase() + ": " + v; },
        tabs : function (level) { var t = "", i = 0; for (i = 0; i < level; i += 1) { t += "\t"; } return t; },
		display: function (msg) { 
			var d = document.getElementById("display");
			if (d) {
				if (this.displayOn) {  
					d.style.display = "block";
					d.innerHTML = "<b>" + msg + "</b>";
				} else {
					d.style.display = "none";				
				}
			}
		}
};