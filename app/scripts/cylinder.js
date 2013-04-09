/*!
 * http://cylinderjs.com/
 *
 * Tested with Raphael JavaScript Library v2.1
 * http://raphaeljs.com/
 *
 * Copyright 2012, 2013 Jose Jesus Perez Aguinaga
 * http://jjperezaguinaga.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

 (function () {
  function Cylinder(paper, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding) {
    if(!paper) return;

    if(!topWidth) {
      throw new Error('A top width needs to be provided');
    } else if(!bottomWidth) {
      throw new Error('A bottom width needs to be provided');
    } else if(!containerHeight) {
      throw new Error('A container height needs to be provided');
    }

    var self = this;

    // Methods that retrieve information from properties
    this.isTopSmallerThanBottom = function() {
      return self.topWidth < self.bottomWidth;
    }

    this.ellipsesDifference = function() {
      return self.isTopSmallerThanBottom() ? self.bottomWidth - self.topWidth : self.topWidth - self.bottomWidth;
    }

    this.getTopRy = function() {
      return self.isTopSmallerThanBottom() ? self.topWidth*self.yRotation/self.bottomWidth : self.yRotation; 
    };

    this.getBaseRy = function() {
      return self.isTopSmallerThanBottom() ? self.yRotation : self.bottomWidth*self.yRotation/self.topWidth;
    };

    this.getCylinderAngle = function() {
      return Math.atan(self.ellipsesDifference()/self.containerHeight);
    }

    this.getTopContentWidth = function() {
      return self.isTopSmallerThanBottom() ? ((self.containerHeight-self.percentageContent)*Math.tan(self.getCylinderAngle()))+self.topWidth : (self.percentageContent*Math.tan(self.getCylinderAngle()))+self.bottomWidth;
    }

    this.getTopContentRy = function() {
      return self.isTopSmallerThanBottom() ? self.getTopContentWidth()*self.yRotation/self.bottomWidth : self.yRotation;
    }

    this.getBaseContentRy = function() {
      return self.isTopSmallerThanBottom() ? self.yRotation : self.bottomWidth*self.yRotation/self.topWidth;
    }

    this.updateElements = function(cylinderInstance) {
      cylinderInstance.content.update();
      cylinderInstance.container.update();
    }

    this.drag = function(start, move, up) {
      this.containerElement.drag(start, move, up, this);
      this.topElement.drag(start, move, up, this);
      this.baseElement.drag(start, move, up, this);
    }

    this.transfer = function(transfuser, receiver) {
      console.log("TRANSFER TIME!");
      var toTransfer = +transfuser.percentageContent;
      var newPercentageContent = +receiver.percentageContent + toTransfer;
      Cylinder.prototype.cylinders[0].animate({content: {percentage: 0}});
      Cylinder.prototype.cylinders[1].animate({content: {percentage: newPercentageContent}});

    }

    var start = function() {
      if(this.instanceof !== "Content") {        
        this.parent.onMouseDown();
        if(Cylinder.prototype.selectedTarget === this.parent) {
          // Same container
          delete Cylinder.prototype.selectedTarget;
          this.parent.onMouseUp();
        } else {
          // Other container
          var otherContainer = Cylinder.prototype.selectedTarget;
          Cylinder.prototype.selectedTarget = this.parent;
          if(otherContainer && otherContainer.isTransferable && this.parent.isTransferable) {
            //// Tra-tra-tra-transfer time.
            self.transfer(otherContainer, this.parent);
            otherContainer.onMouseUp();
            this.parent.onMouseUp();
            delete Cylinder.prototype.selectedTarget;
          }
        }
      }

      this.ox = this.x;
      this.oy = this.y;
    }

    var move = function(dx, dy) {
      self.x = this.ox + dx;
      self.y = this.oy + dy;      
      this.updateElements(self.cylinder);
    }

    var up = function() {
      //if(this.instanceof === "Content") this.onMouseUp();
    }

    // Public Properties
    this.paper = paper;
    this.x = x || 0,
    this.y = y || 0,
    this.padding = padding || .10;
    this.topWidth = topWidth;
    this.bottomWidth = bottomWidth;
    this.containerHeight = containerHeight;
    this.yRotation = (function(yr) {
      yr = +yr;
      yr = yr > 100 ? yr%100 : yr;
      yr = yr > 0 ? yr/100 : 1/100;
      yr = self.isTopSmallerThanBottom() ? yr*self.topWidth : yr*self.bottomWidth;
      return yr;
    })(yRotation);

    this.hasContent = hasContent && (percentageContent || +percentageContent >=0) ? hasContent : false;
    this.percentageContent = this.hasContent ? (function(pc){
      pc = +pc;
      pc = pc > 100 ? pc%100 : pc;
      pc = pc > 0 ? pc*self.containerHeight/100 : 1*self.containerHeight/100;
      return pc;
    })(percentageContent) : null;

    Container.prototype = self;
    Content.prototype = self;

    // Instance
    self.cylinder = {};

    self.cylinder.container = new Container();
    self.cylinder.container.drawContainer();
    self.cylinder.container.drawBase();

    if(this.hasContent) {
      self.cylinder.content = new Content();
      self.cylinder.content.drawContainer();
      self.cylinder.content.drawBase();
      self.cylinder.content.drawTop();
      
    } 

    self.cylinder.container.drawTop();

    self.cylinder.setTopWidth = function(topWidth) {
      self.topWidth = topWidth;
    }
    
    self.cylinder.animate = function(animationSettings) {
      if(!animationSettings) return;
      if(animationSettings['content'] && this.content) {
        var settingsForContent = animationSettings['content'],
        animationObjectForContainer = {};
        animationObjectForTop = {}
        animationObjectForBase = {}

        var content = this.content;
        if(settingsForContent['percentage']|| +settingsForContent['percentage'] >= 0) {
          var newPercentage = settingsForContent['percentage'];
          self.percentageContent = newPercentage;

          content.constructPoints();
          animationObjectForContainer['path'] = content.getPathMatrixForContainer().join(',');
          animationObjectForTop['cx'] = content.getTopCx();
          animationObjectForTop['cy'] = content.getTopCy();
          animationObjectForTop['rx'] = content.getTopRx();
          animationObjectForTop['ry'] = content.getTopRy();
        }

        if(settingsForContent['fill']){
          var newColor = settingsForContent['fill'];
          animationObjectForContainer['fill'] = newColor;
          animationObjectForTop['fill'] = newColor;
          animationObjectForBase['fill'] = newColor;
        }

        content.containerElement.animate(animationObjectForContainer, settingsForContent['ms'] || 2000)
        content.topElement.animate(animationObjectForTop, settingsForContent['ms'] || 2000)
        content.baseElement.animate(animationObjectForBase, settingsForContent['ms'] || 2000)
      }
    }

    self.cylinder.attr = function(attrSettings) {
      if(!attrSettings) return;
      if(attrSettings['content'] && this.content) {
        var settingsForContent = attrSettings['content'];
        if(settingsForContent['fill']) {
          var newFill = settingsForContent['fill'];
          var content = this.content;
          content.attr({fill: newFill});
        }
      } 

      if(attrSettings['container'] && this.container) {
        var settingsForContainer = attrSettings['container'];
        if(settingsForContainer['topWidth']) {
          var newTopWidth = settingsForContainer['topWidth'];
          self.cylinder.setTopWidth(newTopWidth);
          self.cylinder.update();
        }
      }
    }
    
    self.cylinder.draggable = function() {
      this.content.drag(move, start, up, this.content)
      this.container.drag(move, start, up, this.container)
    }

    
    self.cylinder.transferable = function() {
      if(!Cylinder.prototype.cylinders) {
        Cylinder.prototype.cylinders = [];
      }
      Cylinder.prototype.cylinders.push(this);
      this.content.isTransferable = true;
    }

    self.cylinder.update = function() {
      this.content.update();
      this.container.update();
    }
    

    if(self.cylinder.content) {
      self.cylinder.content.mousedown(start);
    }
    
    return self.cylinder;
  }

  function Content() {
    var self = this;
    this.instanceof = "Content";
    this.containerElement = null;
    this.topElement = null;
    this.baseElement = null;

    this.mousedown = function(start) {
      self.topElement.mousedown(start);
      self.baseElement.mousedown(start);
      self.containerElement.mousedown(start);
    }

    this.onMouseDown = function() {
      console.log("Bring the opacity");
      self.attr({opacity: .5});
    }

    this.onMouseUp = function() {
      console.log("Put away opacity")
     self.attr({opacity: 1}); 
   }

   this.attr = function(attrObject) {
    self.topElement.attr(attrObject);
    self.baseElement.attr(attrObject);
    self.containerElement.attr(attrObject);
  }

  this.update = function() {
    self.constructPoints();
    self.topElement.attr({cx: self.getTopCx(), cy: self.getTopCy(), rx: self.getTopRx(), ry: self.getTopRy()});
    self.baseElement.attr({cx: self.getBaseCx(), cy: self.getBaseCy(), rx: self.getBaseRx(), ry: self.getBaseRy()});
    self.containerElement.attr({path: self.getPathMatrixForContainer() });
  }

  this.constructPoints = function() {
    var topContentWidth = self.getTopContentWidth();
    self.startPointInX = self.x-topContentWidth+(topContentWidth*self.padding);
    self.startPointInY = self.y+self.containerHeight-self.percentageContent;
    self.topLinePathX = self.x+topContentWidth-(topContentWidth*self.padding);
    self.topLinePathY = self.y+self.containerHeight-self.percentageContent;
    self.rightLinePathX = self.x+self.bottomWidth-(self.bottomWidth*self.padding);
    self.rightLinePathY = self.y+self.containerHeight;
    self.bottomLinePathX = self.x-self.bottomWidth+(self.bottomWidth*self.padding);
    self.bottomLinePathY = self.y+self.containerHeight;
    self.leftLinePathX = self.x-topContentWidth+(topContentWidth*self.padding);
    self.leftLinePathY = self.y+self.containerHeight-self.percentageContent;
  }

  this.getTopCx = function() { return self.x }
  this.getTopCy = function() { return self.y+self.containerHeight-self.percentageContent }
  this.getTopRx = function() { return self.getTopContentWidth()-(self.getTopContentWidth()*self.padding) }
  this.getTopRy = function() { return self.getTopContentRy()-(self.getTopContentRy()*self.padding*2) }
  this.getBaseCx = function() { return self.x }
  this.getBaseCy = function() { return self.y+self.containerHeight }
  this.getBaseRx = function() { return self.bottomWidth-(self.bottomWidth*self.padding) }
  this.getBaseRy = function() { return self.getBaseContentRy()-(self.getBaseContentRy()*self.padding*2) }

  this.getPathMatrixForContainer = function() {
    return [
    ["M", self.startPointInX, self.startPointInY],
    ["A", self.getTopRx(), self.getTopRy(), 0, 0, 0, self.topLinePathX, self.topLinePathY],
    ["L", self.rightLinePathX, self.rightLinePathY],
    ["A", self.bottomWidth-(self.bottomWidth*self.padding), self.getBaseContentRy()-(self.getBaseContentRy()*self.padding*2), 0, 0, 0, self.bottomLinePathX, self.bottomLinePathY],
    ["L", self.leftLinePathX, self.leftLinePathY]
    ];
  }

  this.drawTop = function() {
    self.topElement = this.paper.ellipse(
      self.getTopCx(), self.getTopCy(), self.getTopRx(), self.getTopRy() 
      );
    self.topElement.parent = self;
  }

  this.drawBase = function() {
    self.baseElement = this.paper.ellipse(
      self.getBaseCx(), self.getBaseCy(), self.getBaseRx(), self.getBaseRy()
      );
    self.baseElement.parent = self;
  }

  this.drawContainer = function() {
    self.containerElement = this.paper.path(this.getPathMatrixForContainer());
    self.containerElement.parent = self;
  }

  this.constructPoints();
}

function Container() {
  var self = this;
  this.instanceof = "Container";
  this.containerElement = null;
  this.topElement = null;
  this.baseElement = null;

  this.update = function() {
    self.constructPoints();
    self.topElement.attr({cx: self.getTopCx(), cy: self.getTopCy(), rx: self.getTopRx(), ry: self.getTopRy() });
    self.baseElement.attr({cx: self.getBaseCx(), cy: self.getBaseCy(), rx: self.getBaseRx(), ry: self.getBaseRy() });
    self.containerElement.attr({path: self.getPathMatrixForContainer() });
  }

  this.constructPoints = function() {
    self.startPointInX = self.x-self.topWidth;
    self.startPointInY = self.y;
    self.topLinePathX = self.x+self.topWidth;
    self.topLinePathY = self.y;
    self.rightLinePathX = self.x+self.bottomWidth;
    self.rightLinePathY = self.y+self.containerHeight;
    self.bottomLinePathX = self.x-self.bottomWidth;
    self.bottomLinePathY = self.y+self.containerHeight;
    self.leftLinePathX = self.x-self.topWidth;
    self.leftLinePathY = self.y;
  }

  this.getTopCx = function() { return self.x }
  this.getTopCy = function() { return self.y }
  this.getTopRx = function() { return self.topWidth }
  this.getBaseCx = function() { return self.x }
  this.getBaseCy = function() { return self.y+self.containerHeight }
  this.getBaseRx = function() { return self.bottomWidth }

  this.getPathMatrixForContainer = function() {
    return [
    ["M", self.startPointInX, self.startPointInY],
    ["A", self.topWidth, self.getTopRy(), 0, 0, 0, self.topLinePathX, self.topLinePathY],
    ["L", self.rightLinePathX, self.rightLinePathY],
    ["A", self.bottomWidth, self.getBaseRy(), 0, 0, 0, self.bottomLinePathX, self.bottomLinePathY],
    ["L", self.leftLinePathX, self.leftLinePathY]
    ];
  }

  this.drawTop = function() {
    self.topElement = this.paper.ellipse(
      self.getTopCx(), self.getTopCy(), self.getTopRx(), self.getTopRy()
      ).attr({fill: "rgba(255,255,255, 0)"});
  }

  this.drawBase = function() {
    self.baseElement = this.paper.ellipse(
      self.x, self.y+self.containerHeight, self.bottomWidth, self.getBaseRy()
      ).attr({fill: "rgba(255,255,255, 0)"});
  }

  this.drawContainer = function() {
    self.containerElement = this.paper.path(
      self.getPathMatrixForContainer()
      ).attr({fill: "rgba(255,255,255, 0)"});
  }

  this.constructPoints();
}




  //public
  Raphael.fn.cylinder = function(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding) {
    return new Cylinder(this, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding);
  }

})();