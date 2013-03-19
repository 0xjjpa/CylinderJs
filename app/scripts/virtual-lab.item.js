'use strict';

VirtualLab.Item = (function(vl, r, undefined){
	var Item = function(height, width) {
		var self = this;

		var X = vl.warehouseSingleton.getX();
		var Y = vl.warehouseSingleton.getY();
		var BORDER = vl.warehouseSingleton.getBorder();
		var PADDING = vl.warehouseSingleton.getPadding();
		var FRAME_HEIGHT = vl.warehouseSingleton.getHeight()-PADDING;
		var FRAME_WIDTH = vl.warehouseSingleton.getWidth() / vl.warehouseSingleton.getSlots()-PADDING;


		var SPACING = (BORDER*2) + (PADDING*2);
		var HEADER_WIDTH = FRAME_WIDTH - SPACING;
		var HEADER_HEIGHT = FRAME_HEIGHT/3.5 - SPACING;
		var CONTAINER_WIDTH = FRAME_WIDTH - SPACING;
		var CONTAINER_HEIGHT = FRAME_HEIGHT - HEADER_HEIGHT - SPACING - PADDING - BORDER;


		self.components = [];

		this.addPaper = function(paper) {
            self.paper = paper;
        };

        this.draw = function() {
            self.components.forEach(function(e) {
                self.paper.set(e.path);
            });
        };

        this.load = function() {
        		this.components.push({id: 'ItemFrame', path: self.paper.rect(X+BORDER*2,Y+BORDER+1, FRAME_WIDTH, FRAME_HEIGHT).attr({'stroke-width': BORDER}) });
            this.components.push({id: 'ItemHeader', path: self.paper.rect(X+BORDER*2+PADDING,Y+BORDER*2+PADDING+1, HEADER_WIDTH, HEADER_HEIGHT).attr({'stroke-width': BORDER}) });
            this.components.push({id: 'ItemContainer', path: self.paper.rect(X+BORDER*2+PADDING,Y+BORDER*2+PADDING+1+HEADER_HEIGHT+PADDING+BORDER, CONTAINER_WIDTH, CONTAINER_HEIGHT).attr({'stroke-width': BORDER}) });
        }

        this.construct = function() {
        		this.load();
            this.draw();
        };
	};
	return Item;
})(VirtualLab, Raphael);