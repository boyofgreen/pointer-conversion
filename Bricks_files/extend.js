/***************************************************************************
 ** Copyright 2012 © Microsoft Corporation. All Rights Reserved. 
 ** Demo Author: Tobin Titus, Microsoft Corporation
 ***************************************************************************/
 
// shallow merge of the properties of two objects using "extend"
// useful for overwriting default values of object configuration
(function () {
	"use strict";
	if (Object.defineProperty) {
		try {
			Object.defineProperty(Object.prototype, "extend", {
				enumerable: false,
				value: function (target) {
					var properties = Object.getOwnPropertyNames(target);
					var destination = this;
					properties.forEach (function(property) {
						if (property in destination) {
							var descriptor = Object.getOwnPropertyDescriptor(target, property);
							Object.defineProperty(destination, property, descriptor);
						}
					});
					return this;
				}
			});
		} catch(err) {
			Errors.add("- defineProperty is not supported.");
		}
	}
}());