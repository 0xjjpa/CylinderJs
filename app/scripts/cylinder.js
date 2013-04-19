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
    self.setOx = function(ox) {
      this.ox = ox;
    }

    self.getOx = function() {
      return this.ox;
    }

    self.setOy = function(oy) {
      this.oy = oy;
    }

    self.getOy = function() {
      return this.oy;
    }

    self.getX = function() {
      return this.x;
    }

    self.getY = function() {
      return this.y;
    }

    self.setX = function(x) {
      this.x = x;
    }

    self.setY = function(y) {
      this.y = y;
    }

    self.getPercentageContent = function() {
      return this.percentageContent;
    }

    self.setPercentageContent = function(percentageContent) {
      percentageContent = percentageContent < 0 ? 0 : percentageContent;
      this.percentageContent = percentageContent > 100 ? 100 : percentageContent;
    }

    self.getContainerHeight = function() {
      return this.containerHeight;
    }

    self.setContainerHeight = function(containerHeight) {
      this.containerHeight = containerHeight;
    }

    self.getTopWidth = function() {
      return this.topWidth;
    }

    self.setTopWidth = function(topWidth) {
      this.topWidth = topWidth;
    }

    self.getBottomWidth = function() {
      return this.bottomWidth;
    }

    self.setBottomWidth = function(bottomWidth) {
      this.bottomWidth = bottomWidth;
    }

    self.getYRotation = function() {
      return this.yRotation;
    }

    self.setYRotation = function(yRotation) {
      this.yRotation = yRotation;
    }

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
      return self.isTopSmallerThanBottom() ? ((self.containerHeight-self.getPercentageContent())*Math.tan(self.getCylinderAngle()))+self.topWidth : (self.getPercentageContent()*Math.tan(self.getCylinderAngle()))+self.bottomWidth;
    }

    this.getTopContentRy = function() {
      return self.isTopSmallerThanBottom() ? self.getTopContentWidth()*self.yRotation/self.bottomWidth : self.yRotation;
    }

    this.getBaseContentRy = function() {
      return self.isTopSmallerThanBottom() ? self.yRotation : self.bottomWidth*self.yRotation/self.topWidth;
    }

    this.updateElements = function(cylinderInstance) {
      if(cylinderInstance.content) cylinderInstance.content.update();
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
      console.log('New PC',newPercentageContent);
      Cylinder.prototype.cylinders[0].animate({content: {percentage: 0}});
      Cylinder.prototype.cylinders[1].animate({content: {percentage: newPercentageContent}});

    }

    var startChildren = function(cylinderInstance) {
      if(cylinderInstance.child) {
        cylinderInstance.child.prototype.setOx(cylinderInstance.child.prototype.getX());
        cylinderInstance.child.prototype.setOy(cylinderInstance.child.prototype.getY());
        startChildren(cylinderInstance.child);
      }
    }

    var startParent = function(cylinderInstance) {
      if(cylinderInstance.parent) {
        cylinderInstance.parent.prototype.setOx(cylinderInstance.parent.prototype.getX());
        cylinderInstance.parent.prototype.setOy(cylinderInstance.parent.prototype.getY());
        startParent(cylinderInstance.parent);
      }
    }

    var moveChildren = function(cylinderInstance, dx, dy) {      
      if(cylinderInstance.child) {
        cylinderInstance.child.prototype.setX(+cylinderInstance.child.prototype.getOx() + dx);
        cylinderInstance.child.prototype.setY(+cylinderInstance.child.prototype.getOy() + dy);
        self.updateElements(cylinderInstance.child);
        moveChildren(cylinderInstance.child, dx, dy);
      }
    }

    var moveParent = function(cylinderInstance, dx, dy) {      
      if(cylinderInstance.parent) {
        cylinderInstance.parent.prototype.setX(+cylinderInstance.parent.prototype.getOx() + dx);
        cylinderInstance.parent.prototype.setY(+cylinderInstance.parent.prototype.getOy() + dy);
        self.updateElements(cylinderInstance.parent);
        moveParent(cylinderInstance.parent, dx, dy);
      }
    }

    var start = function() {
      if(this.instanceof !== "Content" && this.instanceof !== "Container") {        
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
      } else {
        this.setOx(this.getX());
        this.setOy(this.getY());
        startChildren(self.cylinder);
        startParent(self.cylinder);
      }

      
    }

    var move = function(dx, dy) {
      self.setX(this.getOx() + dx);
      self.setY(this.getOy() + dy);     
      moveChildren(self.cylinder, dx, dy);
      moveParent(self.cylinder, dx, dy);
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
      yr = self.isTopSmallerThanBottom() ? yr*self.getTopWidth() : yr*self.getBottomWidth();
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
    self.cylinder.prototype = self;

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
          newPercentage = newPercentage > 100 ? 100 : newPercentage;
          self.setPercentageContent(newPercentage);
          content.constructPoints();
          animationObjectForContainer['path'] = content.getPathMatrixForContainer().join(',');
          animationObjectForTop['cx'] = content.getTopCx();
          animationObjectForTop['cy'] = content.getTopCy();
          animationObjectForTop['rx'] = content.getTopRx();
          animationObjectForTop['ry'] = content.getTopRy();
          console.log(animationObjectForTop);
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
          self.cylinder.prototype.setTopWidth(newTopWidth);
          self.cylinder.update();
        }
      }
    }
    
    self.cylinder.draggable = function() {
      if(this.content) this.content.drag(move, start, up, this.content)
      this.container.drag(move, start, up, this.container)
      return this;
    }

    
    self.cylinder.transferable = function() {
      if(!Cylinder.prototype.cylinders) {
        Cylinder.prototype.cylinders = [];
      }
      Cylinder.prototype.cylinders.push(this);
      if(this.content) this.content.isTransferable = true;
      return this;
    }

    self.cylinder.update = function() {
      if (this.content) this.content.update();
      this.container.update();
    }

    self.cylinder.joinBottom = function(cylinderInstance) {
      //cylinderInstance.parent = this.prototype;
      cylinderInstance.parent = this;
      this.child = cylinderInstance;
      cylinderInstance.prototype.setX(this.prototype.getX());
      cylinderInstance.prototype.setY(this.prototype.getY()+this.prototype.getContainerHeight());
      cylinderInstance.prototype.setTopWidth(this.prototype.getBottomWidth());
      cylinderInstance.container.topElement.remove();
      this.container.baseElement.remove();
      //this.container.baseElement.remove();
      cylinderInstance.update();

      //console.log(cylinderInstance.prototype.getX());
      return this;
    }
    

    if(self.cylinder.content) {
      self.cylinder.content.mousedown(start);
    }

    var debug = function() {
      var coords = this.getBBox();
      if(this.rect) { this.rect.remove(); delete this.rect; }
      else { 
        this.rect = this.paper.rect(coords.x, coords.y, coords.width, coords.height)
        .attr({fill: "none", stroke: "#aaaaaa", "stroke-width": 1});
        this.parent.debug();

      }
    }

    self.cylinder.debug = function() {
      if(this.content) self.cylinder.content.mousedown(debug);  
      self.cylinder.container.mousedown(debug);  
      
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
    self.startPointInX = self.getX()-topContentWidth+(topContentWidth*self.padding);
    self.startPointInY = self.getY()+self.containerHeight-self.getPercentageContent();
    self.topLinePathX = self.getX()+topContentWidth-(topContentWidth*self.padding);
    self.topLinePathY = self.getY()+self.containerHeight-self.getPercentageContent();
    self.rightLinePathX = self.getX()+self.bottomWidth-(self.bottomWidth*self.padding);
    self.rightLinePathY = self.getY()+self.containerHeight;
    self.bottomLinePathX = self.getX()-self.bottomWidth+(self.bottomWidth*self.padding);
    self.bottomLinePathY = self.getY()+self.containerHeight;
    self.leftLinePathX = self.getX()-topContentWidth+(topContentWidth*self.padding);
    self.leftLinePathY = self.getY()+self.containerHeight-self.getPercentageContent();
  }

  this.getTopCx = function() { return self.getX() }
  this.getTopCy = function() { return self.getY()+self.containerHeight-self.getPercentageContent() }
  this.getTopRx = function() { return self.getTopContentWidth()-(self.getTopContentWidth()*self.padding) }
  this.getTopRy = function() { return self.getTopContentRy()-(self.getTopContentRy()*self.padding*2) }
  this.getBaseCx = function() { return self.getX() }
  this.getBaseCy = function() { return self.getY()+self.containerHeight }
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

  this.debug = function() {
    console.log("CONTENT");
    console.log("X",this.getX());
    console.log("Y",this.getY());
    console.log("TopCx",this.getTopCx());
  console.log("TopCy",this.getTopCy());
  console.log("TopRx",this.getTopRx());
  console.log("BaseCx",this.getBaseCx());
  console.log("BaseCy",this.getBaseCy());
  console.log("BaseRx",this.getBaseRx());
  console.log("YRotation", this.getYRotation());
  console.log("PercentageContent", this.getPercentageContent());
  }

  this.constructPoints();
}

function Container() {
  var self = this;
  this.instanceof = "Container";
  this.containerElement = null;
  this.topElement = null;
  this.baseElement = null;

  this.mousedown = function(start) {
      self.topElement.mousedown(start);
      self.baseElement.mousedown(start);
      self.containerElement.mousedown(start);
    }

  this.update = function() {
    self.constructPoints();
    self.topElement.attr({cx: self.getTopCx(), cy: self.getTopCy(), rx: self.getTopRx(), ry: self.getTopRy() });
    self.baseElement.attr({cx: self.getBaseCx(), cy: self.getBaseCy(), rx: self.getBaseRx(), ry: self.getBaseRy() });
    self.containerElement.attr({path: self.getPathMatrixForContainer() });
  }

  this.constructPoints = function() {
    self.startPointInX = self.getX()-self.topWidth;
    self.startPointInY = self.getY();
    self.topLinePathX = self.getX()+self.topWidth;
    self.topLinePathY = self.getY();
    self.rightLinePathX = self.getX()+self.bottomWidth;
    self.rightLinePathY = self.getY()+self.containerHeight;
    self.bottomLinePathX = self.getX()-self.bottomWidth;
    self.bottomLinePathY = self.getY()+self.containerHeight;
    self.leftLinePathX = self.getX()-self.topWidth;
    self.leftLinePathY = self.getY();
  }

  this.getTopCx = function() { return self.getX() }
  this.getTopCy = function() { return self.getY() }
  this.getTopRx = function() { return self.topWidth }
  this.getBaseCx = function() { return self.getX() }
  this.getBaseCy = function() { return self.getY()+self.containerHeight }
  this.getBaseRx = function() { return self.bottomWidth }

  this.getPathMatrixForContainerWithoutEllipse = function() {
    return [
    ["M", self.startPointInX, self.startPointInY],
    ["A", self.topWidth, self.getTopRy(), 0, 0, 0, self.topLinePathX, self.topLinePathY],
    ["L", self.rightLinePathX, self.rightLinePathY],
    ["A", self.bottomWidth, self.getBaseRy(), 0, 0, 0, self.bottomLinePathX, self.bottomLinePathY],
    ["L", self.leftLinePathX, self.leftLinePathY]
    ];
  }

  this.getPathMatrixForContainer = function() {
    return [
    ["M", self.startPointInX, self.startPointInY],
    ["M", self.topLinePathX, self.topLinePathY],
    ["L", self.rightLinePathX, self.rightLinePathY],
    ["M", self.bottomLinePathX, self.bottomLinePathY],
    ["L", self.leftLinePathX, self.leftLinePathY]
    ];
  }

  this.drawTop = function() {
    self.topElement = this.paper.ellipse(
      self.getTopCx(), self.getTopCy(), self.getTopRx(), self.getTopRy()
      ).attr({fill: "rgba(255,255,255, 0)"});
    self.topElement.parent = self;
  }

  this.drawBase = function() {
    self.baseElement = this.paper.ellipse(
      self.x, self.y+self.containerHeight, self.bottomWidth, self.getBaseRy()
      ).attr({fill: "rgba(255,255,255, 0)"});
    self.baseElement.parent = self;
  }

  this.drawContainer = function() {
    self.containerElement = this.paper.path(
      self.getPathMatrixForContainer()
      ).attr({fill: "rgba(255,255,255, 0)"});
    self.containerElement.parent = self;
  }

  this.debug = function() {
    console.log("CONTAINER");
    console.log("X",this.getX());
    console.log("Y",this.getY());
    console.log("TopCx",this.getTopCx());
  console.log("TopCy",this.getTopCy());
  console.log("TopRx",this.getTopRx());
  console.log("BaseCx",this.getBaseCx());
  console.log("BaseCy",this.getBaseCy());
  console.log("BaseRx",this.getBaseRx());
  console.log("YRotation", this.getYRotation());
  }

  this.constructPoints();
}




  //public
  Raphael.fn.cylinder = function(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding) {
    return new Cylinder(this, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding);
  }

})();