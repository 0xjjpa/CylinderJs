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

    this.onMouseDown = function() {
      self.attr({opacity: .2});
    }

    this.onMouseUp = function() {
      self.attr({opacity: 1}); 
    }

   this.attr = function(attrObject) {
    self.topElement.attr(attrObject);
    self.baseElement.attr(attrObject);
    self.containerElement.attr(attrObject);
  }

  this.update = function() {
    self.constructPoints();
    self.topElement.attr({cx: self.getTopCx(), cy: self.getTopCy(), rx: self.getTopRx(), ry: self.getTopRy() });
    self.baseElement.attr({cx: self.getBaseCx(), cy: self.getBaseCy(), rx: self.getBaseRx(), ry: self.getBaseRy() });
    self.containerElement.attr({path: self.getPathMatrixForContainerWithoutEllipse() });
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

  this.getPathMatrixForContainer = function() {
    return [
    ["M", self.startPointInX, self.startPointInY],
    ["A", self.topWidth, self.getTopRy(), 0, 0, 0, self.topLinePathX, self.topLinePathY],
    ["L", self.rightLinePathX, self.rightLinePathY],
    ["A", self.bottomWidth, self.getBaseRy(), 0, 0, 0, self.bottomLinePathX, self.bottomLinePathY],
    ["L", self.leftLinePathX, self.leftLinePathY]
    ];
  }

  this.getPathMatrixForContainerJoined = function() {
    return [
    ["M", self.startPointInX, self.startPointInY],
    ["M", self.topLinePathX, self.topLinePathY],
    ["L", self.rightLinePathX, self.rightLinePathY],
    ["M", self.bottomLinePathX, self.bottomLinePathY],
    ["L", self.leftLinePathX, self.leftLinePathY]
    ];
  }

  this.getPathMatrixForContainerWithoutEllipse = function() {
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
      self.getPathMatrixForContainerWithoutEllipse()
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