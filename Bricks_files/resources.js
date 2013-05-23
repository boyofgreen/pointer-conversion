/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
var ResourceStatus = (function () {
	return {
		"NOT_LOADED" : 1,
		"LOADING" : 2,
		"LOADED" : 3
	}
}());

var Resource = function (source, callback, status, attributes) { 
	return {
		"source" : source,
		"onload" : callback || null,
		"status" : status || ResourceStatus.NOT_LOADED,
		"attributes" : attributes || null,
		"ref" : null
	}
};

var Resources  = (function () {
	var images = [];

	function loadImage (key) {
		var ref, 
		    resource = images[key];
		if (! resource) { 
			return; 
		}
		ref = resource.ref = new Image();
		Event(ref, "load", resource.onload, false);
		ref.src = resource.source;

		if (resource.attributes.width) {
			ref.style.width = resource.attributes.width;
		}
		if (resource.attributes.width) {
			ref.style.height = resource.attributes.height;
		}
		return ref;
	};
	
	function addImage (key, source, callback, width, height) {
		var resource = images[key];
		if (! resource) {
			resource = new Resource(source, callback);
		}
		resource.source = source;
		resource.attributes = {"width" : width, "height" : height};
		images[key] = resource;

		loadImage(key);
	};

	function getImage (key) {
		var image = images[key];
		if (! image || ! image.ref) {
			return null; 
		}
		return image.ref;
	};
	
	function getImageSource (key) {
		var image = images[key];
		if (! image || ! image.source) {
			return null; 
		}
		return image.source;
	};	
	
	return {
		"loadImage" : loadImage,
		"addImage" : addImage,
		"getImage" : getImage,
		"getImageSource" : getImageSource
	};
}());
