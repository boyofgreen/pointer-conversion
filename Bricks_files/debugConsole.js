/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
 var DebugConsole = (function () {
	"use strict";
	var d, e;
	
	function show () {
		var errs = Errors.getAll();
		var h;
		
		if (!d){
			d = document.createElement("div");
			d.id = "errorConsole";
			d.className = "debugConsole";
			d.style.position = "absolute";
			d.style.height = "150px";
			d.style.left = 0;
			d.style.top = 0;
			d.style.zIndex = 10000;	
			
			h = document.createElement("h2");
			h.appendChild( document.createTextNode("Error Console") );
			d.appendChild(h);			
			
			e = document.createElement("div");
			e.id = "errorList";
			d.appendChild(e);
		}
		d.style.width = document.body.clientWidth + "px";
		e.innerHTML = errs.join("<br />\n");
		Animation.stop();
		document.body.appendChild(d);
	}
	
 
	return {
		"show" : show
	}
 }());