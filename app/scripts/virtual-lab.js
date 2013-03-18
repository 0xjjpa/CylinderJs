var VirtualLab = VirtualLab || {};
VirtualLab.VERSION = '0.1';

VirtualLab.Workspace = (function(vl, r, undefined){
	var Workspace = function(height, width) {
		var self = this;
		var DEFAULT_HEIGHT = 400;
		var DEFAULT_WIDTH = 400;

		this.paper = r(0, 0, width || DEFAULT_WIDTH, height || DEFAULT_HEIGHT);
		console.log("Workspace Created");

		this.add = function(virtualElement) {
			virtualElement.addPaper(self.paper);
			virtualElement.construct();
		}
	}
	return Workspace;
})(VirtualLab, Raphael);

VirtualLab.Tube = (function(vl, r, undefined) {
function Tube(x, y, width, height) {
  var self = this;
  
  this.x = x || 0;
  this.y = y || 0;
    
  this.height = height || 100;
  this.width = width || 10;

  this.content = 10;    
  this.min = 0;
  this.max = 100;    
    
  this.components = [];
  this.paper = null;

  this.addPaper = function(paper) {
  	self.paper = paper;
  }
  
  this.draw = function() {
    self.components.forEach(function(e, i, a) {
      self.paper.set(e.path);
    })
  }

  this.construct = function() {
    //Container component (static)
    this.components.push({id: 'Container', path: self.paper.path(getContainerPathString()).attr({'stroke-width': 2}) });    
    //Content Component (dynamic)
    this.components.push({id: 'Content', path: self.paper.path(getContentPathString()).attr({fill: '#FF0000'}) });

    this.draw();
  }

  
 
  var getContentPathString = function() {
      var contentQuantity = self.content * self.height / self.max;
      return "M"+(self.x+10)+" "+ +(self.height+10+self.y) +" v-"+contentQuantity+"h"+self.width+"v"+contentQuantity+"z";
  }
  
  var getContainerPathString = function() {
      return "M"+(self.x +5)+" "+(self.y+10)+" h5v"+ +(self.height) +"h"+self.width+"v-"+ +(self.height) +"h5";
  }
  
  
    
  this.applyDecorator = function(decoratorFunction, start, move, up) {
    self.components.forEach(function(e, i, a) {
      var rElement = e.path;
        rElement[decoratorFunction].call(start, move, up, rElement, rElement, rElement); 
    });  
  }
  
  this.increase = function(increaseValue) {
      if(self.content >= self.max) return;
      var _oldContentPathString = getContentPathString();
      console.log(_oldContentPathString);
      self.content += increaseValue;
      console.log(getContentPathString());
      var trans = Raphael.transformPath(_oldContentPathString, getContentPathString());
      console.log(trans);
      self.components[1].path.animate({path:trans}, 200);      
  }
  
  this.decrease = function(decreaseValue) {
      if(self.content < self.min) return;
      var _oldContentPathString = getContentPathString();
            console.log(_oldContentPathString);
      self.content -= decreaseValue;
            console.log(getContentPathString());
      var trans = Raphael.transformPath(_oldContentPathString, getContentPathString());
      self.components[1].path.animate({path:trans}, 200);      
      this.draw();
  }
}
	return Tube;
})(VirtualLab, Raphael);