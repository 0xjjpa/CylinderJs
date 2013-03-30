

VirtualLab.Workspace = (function(vl, r, undefined){
	var Workspace = function(domId, height, width) {
		var self = this;
		var DEFAULT_HEIGHT = 420;
		var DEFAULT_WIDTH = 600;

		this.construct = function() {
			self.paper = r(document.getElementById(domId), width || DEFAULT_WIDTH, height || DEFAULT_HEIGHT);		
			self.components.push({
				id: 'Workspace', 
				path: self.paper.rect(self.getX(),self.getY(), DEFAULT_WIDTH, DEFAULT_HEIGHT) 
			});
			Workspace.prototype.construct.call(self);
		}

		self.construct();
	}

	Workspace.prototype = new vl.Core();
	Workspace.prototype.constructor = Workspace;
	return Workspace;

})(VirtualLab, Raphael);

