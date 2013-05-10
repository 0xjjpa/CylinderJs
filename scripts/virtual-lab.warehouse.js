'use strict';

VirtualLab.Warehouse = (function(vl, r, undefined){
	var Warehouse = function(domId, height, width) {
		var self = this;

		var X = 0;
		var Y = 0;
		var BORDER = 1;
		var PADDING = 4;
		var SLOTS = 3;
		var DEFAULT_HEIGHT = 100;
		var DEFAULT_WIDTH = 300;

		this.stock = [];

		this.components = [];
		this.paper = r(document.getElementById(domId), width || DEFAULT_WIDTH, height || DEFAULT_HEIGHT);


        this.draw = function() {
            self.components.forEach(function(e) {
                self.paper.set(e.path);
            });
        };

        this.construct = function() {
            this.components.push({id: 'Warehouse', path: self.paper.rect(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT).attr({'stroke-width': BORDER}) });
            this.draw();
        };

		this.getHeight = function() {
			return DEFAULT_HEIGHT;
		};

		this.getWidth = function() {
			return DEFAULT_WIDTH;
		};

		this.getSlots = function() {
			return SLOTS;
		};

		this.getPadding = function() {
			return PADDING;
		};

		this.getBorder = function() {
			return BORDER;
		};

		this.getX = function() {
			return X;
		};

		this.getY = function() {
			return Y;
		};

		this.add = function(VirtualElementFunction) {
			var vE = new VirtualElementFunction();
			vE.addPaper(self.paper);
			vE.construct();
			this.stock.push({vector: vE, f: VirtualElementFunction});

			X += DEFAULT_WIDTH/SLOTS;

			console.log("Added item")
		};

		this.construct();
		vl.warehouseSingleton = self;
		console.log('Warehouse Created');
	};
	return Warehouse;
})(VirtualLab, Raphael);