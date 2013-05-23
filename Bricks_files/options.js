/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/

// Provides a data store for options
var Options = (function () {
	var options = {};

// public
	// Generic get/set values
	function get (item) {
		var val = options[item];
		return val ? val : null;		
	}
	
	function set (item, value) {
		options[item] = value;
		return options[item];
	}

	// Specific Options for this demo
	function fps ( value ) {
		return __do("fps",value);
	}	

	function score ( value ) {
		return __do("score",value);
	}	
	
	function sound ( value ) {
		return __do("sound",value);
	}	
	

// private
	function __do(key, value) {
		if (value) {
			return set(key, value);
		}
		return get(key);
	}

	return {
		"get" : get,
		"set" : set,
		"fps"   : fps,
		"sound" : sound,
		"score" : score
	};
}());