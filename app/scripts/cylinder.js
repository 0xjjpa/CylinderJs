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

    function Content() {
      var self = this;
      this.containerElement = null;
      this.topElement = null;
      this.baseElement = null;

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
      }

      this.drawBase = function() {
        self.baseElement = this.paper.ellipse(
          self.getBaseCx(), self.getBaseCy(), self.getBaseRx(), self.getBaseRy()
        );
      }

      this.drawContainer = function() {
        self.containerElement = this.paper.path(this.getPathMatrixForContainer());
      }

      this.constructPoints();
    }
    
    function Container() {
      var self = this;
      this.containerElement = null;
      this.topElement = null;
      this.baseElement = null;

      this.update = function() {
        self.constructPoints();
        self.topElement.attr({cx: self.getTopCx(), cy: self.getTopCy(), rx: self.getTopRx(), ry: self.getTopRy() });
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

      this.drawTop = function() {
        self.topElement = this.paper.ellipse(
          self.getTopCx(), self.getTopCy(), self.getTopRx(), self.getTopRy()
        );
      }

      this.drawBase = function() {
        self.baseElement = this.paper.ellipse(
          self.x, self.y+self.containerHeight, self.bottomWidth, self.getBaseRy()
        );
      }

      this.drawContainer = function() {
        self.containerElement = this.paper.path([
          ["M", self.startPointInX, self.startPointInY],
          ["A", self.topWidth, self.getTopRy(), 0, 0, 0, self.topLinePathX, self.topLinePathY],
          ["L", self.rightLinePathX, self.rightLinePathY],
          ["A", self.bottomWidth, self.getBaseRy(), 0, 0, 0, self.bottomLinePathX, self.bottomLinePathY],
          ["L", self.leftLinePathX, self.leftLinePathY]
        ]);
      }

      this.constructPoints();
    }

    var self = this;

    // Methods that retrieve information from properties
    self.isTopSmallerThanBottom = function() {
      return self.topWidth < self.bottomWidth;
    }

    self.ellipsesDifference = function() {
      return self.isTopSmallerThanBottom() ? self.bottomWidth - self.topWidth : self.topWidth - self.bottomWidth;
    }

    self.getTopRy = function() {
      return self.isTopSmallerThanBottom() ? self.topWidth*self.yRotation/self.bottomWidth : self.yRotation; 
    };

    self.getBaseRy = function() {
      return self.isTopSmallerThanBottom() ? self.yRotation : self.bottomWidth*self.yRotation/self.topWidth;
    };

    self.getCylinderAngle = function() {
      return Math.atan(self.ellipsesDifference()/self.containerHeight);
    }

    self.getTopContentWidth = function() {
      return self.isTopSmallerThanBottom() ? ((self.containerHeight-self.percentageContent)*Math.tan(self.getCylinderAngle()))+self.topWidth : (self.percentageContent*Math.tan(self.getCylinderAngle()))+self.bottomWidth;
    }

    self.getTopContentRy = function() {
      return self.isTopSmallerThanBottom() ? self.getTopContentWidth()*self.yRotation/self.bottomWidth : self.yRotation;
    }

    self.getBaseContentRy = function() {
      return self.isTopSmallerThanBottom() ? self.yRotation : self.bottomWidth*self.yRotation/self.topWidth;
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

    // Inheritance
    Container.prototype = self;
    Container.prototype.constructor = Container;

    Content.prototype = self;
    Content.prototype.constructor = Content;

    // Instance
    var cylinder = {};

    cylinder.container = new Container();

    cylinder.container.drawContainer();
    cylinder.container.drawBase();

    if(this.hasContent) {
      cylinder.content = new Content();

      //y = y - padding*10;

      cylinder.content.drawContainer();
      cylinder.content.drawBase();
      cylinder.content.drawTop();
      
    } 

    cylinder.container.drawTop();
    
    cylinder.animate = function(animationSettings) {
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

    cylinder.attr = function(attrSettings) {
      if(!attrSettings) return;
      if(attrSettings['content'] && this.content) {
        var settingsForContent = attrSettings['content'];
        if(settingsForContent['fill']) {
          var newFill = settingsForContent['fill'];
          var content = this.content;
          content.topElement.attr({fill: newFill});
          content.baseElement.attr({fill: newFill});
          content.containerElement.attr({fill: newFill});
        }
      }
    }

    

    var start = function() {
      console.log("START");
      this.ox = this.x;
      this.oy = this.y;
    }

    var move = function(dx, dy) {
      console.log(this);
      this.x = this.ox + dx;
      this.y = this.oy + dy;      
      this.update();
      console.log("MOVE");
    }

    var up = function() {
     console.log("UP");
    }

    self.drag = function(start, move, up) {
      console.log(this)
        this.containerElement.drag(start, move, up, this);
        this.topElement.drag(start, move, up, this);
        this.baseElement.drag(start, move, up, this);
      }

    cylinder.draggable = function() {
      this.content.drag(move, start, up, this.content)
      this.container.drag(move, start, up, this.container)
    }


    return cylinder;
  }


  //public
  Raphael.fn.cylinder = function(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding) {
    return new Cylinder(this, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding);
  }

})();