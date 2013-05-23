/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
 var ModalDialog = (function () {
	var dialogs = [];
	var current_id = 0;
	
	var show = function (title, message, buttons, id) {
		var t = document.createElement("h1");
		var m = document.createElement("div");
		var f = document.createElement("footer");
		var dialog = document.createElement("article");
		
		// create a dialog div
		dialog.id = id || "modalDialog" + (++current_id);
		dialog.className = "dialog";
		
		// append a title
		t.appendChild( document.createTextNode(title || "[title]") );
		dialog.appendChild( t );
		
		// Append the message
		m.appendChild( document.createTextNode(message || "[message]") );
		dialog.appendChild( m );
		
		// Append the buttons
		if (buttons) {
			for (var b in buttons) {
				f.appendChild(buttons[b]);
			}
			dialog.appendChild( f );
		}
		
		dialog.style.display = "block";
		dialog.style.position = "absolute";
		document.body.appendChild(dialog);
		dialog.style.left = (window.innerWidth / 2) - (dialog.clientWidth / 2) + "px";
		dialog.style.top = (window.innerHeight / 2) - (dialog.clientHeight / 2) + "px";
		dialogs.push(dialog);
	};
	
	var hide = function () {
		var dialog = dialogs.pop();
		if (dialog) {
			dialog.parentNode.removeChild(dialog);
			dialog = dialogs.pop();
			if (dialog) {
				document.body.appendChild(dialog);
			} else {
				dialog = null;
			}
		};
	}
	
	return {
		"show" : show,
		"hide" : hide,
		"isShowing" : function () { return !!dialog; }
	};
}());

var Button = (function () {
	
	var create = function (text, action, className) {
		var ret = document.createElement("button");
		var text = document.createTextNode(text || "[click]");
		ret.className = className || "dialogButton";
		ret.appendChild(text);
		ret.onclick = action || undefined;
		return ret;
	};
	
	return {
		"create" : create
	}
}());