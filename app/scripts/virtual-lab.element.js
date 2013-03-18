'use strict';

VirtualLab.Element = (function(vl, r, undefined){
	var elementDictionary = {
		'water': {
			symbol: 'H20',
			color: '#0000FF'
		}
	};
	var Element = function(elementName, mililiters) {
		var self = this;
		this.element = elementDictionary[elementName];
		if(!this.element) {
			throw new Error('There is no element registered under that name');
		}
		this.mililiters = mililiters;

	};
	return Element;
})(VirtualLab, Raphael);