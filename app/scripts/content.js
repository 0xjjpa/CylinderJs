function Content() {
    var self = this;
    this.instanceof = "Content";
    this.containerElement = null;
    this.topElement = null;
    this.baseElement = null;
    this.hidden = false;

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
    self.topElement.attr({cx: self.getTopCx(), cy: self.getTopCy(), rx: self.getTopRx(), ry: self.getTopRy()});
    self.baseElement.attr({cx: self.getBaseCx(), cy: self.getBaseCy(), rx: self.getBaseRx(), ry: self.getBaseRy()});
    self.containerElement.attr({path: self.getPathMatrixForContainer() });
    self.updateVolumenText();
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

  this.getRealVolumen = function() {
    return (Math.PI*(Math.pow(self.getTopWidth(),2))*(self.getPercentageContent()))/1000;
  }

  this.getMaxVolumen = function() {
    return (Math.PI*(Math.pow(self.getTopWidth(),2))*(self.getContainerHeight()))/1000; 
  }

  this.setPercentageFromVolumen = function(volumen) {
    return self.getOriginalPercentage((volumen*1000)/(Math.PI*(Math.pow(self.getTopWidth(),2))));
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

  this.getCordsArrayForText = function() {
    var coords = self.containerElement.getBBox();
    return [coords.x+coords.width+32, self.y];
  }

  this.drawTop = function() {
    self.topElement = this.paper.ellipse(
      self.getTopCx(), self.getTopCy(), self.getTopRx(), self.getTopRy() 
      ).attr({fill: "rgba(255,255,255, 0)"});
    self.topElement.parent = self;
  }

  this.drawBase = function() {
    self.baseElement = this.paper.ellipse(
      self.getBaseCx(), self.getBaseCy(), self.getBaseRx(), self.getBaseRy()
      ).attr({fill: "rgba(255,255,255, 0)"});
    self.baseElement.parent = self;
  }

  this.isEmpty = function() {
    return self.getPercentageContent() < 0.001; 
  }

  this.checkIfNeedsToBeHidden = function() {
    if(self.isEmpty()) {
      self.hideContent();
    }
  }

  this.drawContent = function() {
    this.drawContainer();
    this.drawBase();
    this.drawTop();
    this.checkIfNeedsToBeHidden();
  }

  this.writeVolumen = function(textContent) {
    var textCords = self.getCordsArrayForText();
    self.textElement = this.paper.text(
      textCords[0], textCords[1], textContent || self.getRealVolumen().toFixed(2)+"ml"
    );
    self.textElement.parent = self;
  }

  this.updateVolumenText = function(textContent) {
    var textCords = self.getCordsArrayForText();
    this.textElement.attr({x: textCords[0], y: textCords[1], text: textContent || self.getRealVolumen().toFixed(2)+"ml" });
  }

  this.drawContainer = function() {    
    self.containerElement = this.paper.path(
      this.getPathMatrixForContainer()
      ).attr({fill: "rgba(255,255,255, 0)"});
    self.containerElement.parent = self;
  }

  this.hideContent = function() {
    self.containerElement.hide();
    self.baseElement.hide();
    self.topElement.hide();
    self.hidden = true;
  }
  this.showContent = function() {
    self.containerElement.show(); 
    self.baseElement.show();
    self.topElement.show();
    self.hidden = false;
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