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

      this.drawTop = function() {
        self.topElement = this.paper.ellipse(
          self.x, self.y+self.containerHeight-self.percentageContent, self.getTopContentWidth()-(self.getTopContentWidth()*self.padding), self.getTopContentRy()-(self.getTopContentRy()*self.padding*2)
        ).attr({fill: "rgba(255, 255, 255, .95)","stroke-width": 1});
      }

      this.drawBase = function() {
        self.baseElement = this.paper.ellipse(
          self.x, self.y+self.containerHeight, self.bottomWidth-(self.bottomWidth*self.padding), self.getBaseContentRy()-(self.getBaseContentRy()*self.padding*2)
        ).attr({fill: "rgba(255, 255, 255, 1)","stroke-width": 1});
      }

      this.drawContainer = function() {
        self.containerElement = this.paper.path([
          ["M", self.startPointInX, self.startPointInY],
          ["L", self.topLinePathX, self.topLinePathY],
          ["L", self.rightLinePathX, self.rightLinePathY],
          ["L", self.bottomLinePathX, self.bottomLinePathY],
          ["L", self.leftLinePathX, self.leftLinePathY]
        ]);
      }

      this.constructPoints();
    }
    
    function Container() {
      var self = this;
      this.containerElement = null;
      this.topElement = null;
      this.baseElement = null;
      
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

      this.drawTop = function() {
        self.topElement = this.paper.ellipse(
          self.x, self.y, self.topWidth, self.getTopRy()
        ).attr({fill: "rgba(255, 255, 255, .95)","stroke-width": 1});
      }

      this.drawBase = function() {
        self.baseElement = this.paper.ellipse(
          self.x, self.y+self.containerHeight, self.bottomWidth, self.getBaseRy()
        ).attr({fill: "rgba(255, 255, 255, 1)","stroke-width": 1});
      }

      this.drawContainer = function() {
        self.containerElement = this.paper.path([
          ["M", self.startPointInX, self.startPointInY],
          ["L", self.topLinePathX, self.topLinePathY],
          ["L", self.rightLinePathX, self.rightLinePathY],
          ["L", self.bottomLinePathX, self.bottomLinePathY],
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
      return self.isTopSmallerThanBottom() ? self.topContentWidth*self.yRotation/self.bottomWidth : self.yRotation;
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

    this.hasContent = hasContent && percentageContent ? hasContent : false;
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

    this.container = new Container();

    this.container.drawContainer();
    this.container.drawBase();



    //this.content = new Content(paper, this.x, this.y, this.getTopContentWidth(), this.bottomWidth, this.containerHeight, this.percentageContent, this.padding);

    if(this.hasContent) {
      this.content = new Content();

      //y = y - padding*10;

      this.content.drawContainer();
      this.content.drawBase();
      this.content.drawTop();
      
    } 

    this.container.drawTop();
    

    /*
    cylinder.animate = function(animationSettings) {
      if(!animationSettings) return;
      if(animationSettings['content']) {
        var newContent = animationSettings['content']
        topContent.animate({cy: y+containerHeight-newContent}, 2000);
      }
    }
    */

    return cylinder;
  }


  //public
  Raphael.fn.cylinder = function(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent) {
    return new Cylinder(this, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent);
  }

})();