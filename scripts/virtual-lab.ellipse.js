'use strict';

VirtualLab.Ellipse = (function(vl, r, undefined){
  var Ellipse = function(height, width) {
    var self = this;

    this.load = function() {
      self.paper = r(document.getElementById(domId), width || DEFAULT_WIDTH, height || DEFAULT_HEIGHT);       
       self.components.push({
          id: 'Workspace', 
          path: self.paper.rect(self.getX(),self.getY(), DEFAULT_WIDTH, DEFAULT_HEIGHT) 
      });
    }
    
    Ellipse.prototype.construct.call(self);
  };

  Ellipse.prototype = new vl.Core();
  Ellipse.prototype.constructor = Ellipse;
  return Ellipse;

})(VirtualLab, Raphael);