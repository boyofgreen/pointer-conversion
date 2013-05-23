/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var Errors = (function () {
	var errs = [];
	
	function add (errorString) {
		errs.push(errorString);
		Log.debug(errorString);
		
		if (Options.get("displayErrorOnDemand")) {
			DebugConsole.show();
		}
	}

	function getAll () {
		return errs;
	}
	
	function length () {
		return errs.length;
	}
	
	function clear () {
		errs = [];
	}
	
	return {
		"add" : add,
		"clear" : clear,
		"getAll" : getAll,
		"length" : length
	}
}());