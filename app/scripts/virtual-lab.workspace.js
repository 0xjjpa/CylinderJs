var VirtualLab = VirtualLab || {};
VirtualLab.VERSION = '0.1';

VirtualLab.Workspace = (function(vl, r, undefined){
	var Workspace = function(domId, height, width) {
		var self = this;
		var DEFAULT_HEIGHT = 120;
		var DEFAULT_WIDTH = 200;

		this.paper = r(document.getElementById(domId), width || DEFAULT_WIDTH, height || DEFAULT_HEIGHT);
		console.log("Workspace Created");

		this.add = function(virtualElement) {
			virtualElement.addPaper(self.paper);
			virtualElement.construct();
		}
	}
	return Workspace;
})(VirtualLab, Raphael);

