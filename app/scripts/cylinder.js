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
      return self.percentageContent;
    }

    self.setPercentageContent = function(percentageContent) {
      percentageContent = +percentageContent > 100 ? 100 : +percentageContent;
      self.percentageContent = percentageContent > 0 ? percentageContent*self.containerHeight/100 : 0.00001*self.containerHeight/100;      
    }

    self.getOriginalPercentage = function(percentageContent) {
      return (percentageContent*100)/self.containerHeight;
    }

    self.getContainerHeight = function() {
      return self.containerHeight;
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
      return Math.atan(self.ellipsesDifference()/self.getContainerHeight());
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

    this.undrag = function() {
      this.containerElement.undrag();
      this.topElement.undrag();
      this.baseElement.undrag();
    }

    this.transfer = function(transfuser, receiver, hasAnimation, transfuserCylinder, receiverCylinder) {
      if(!transfuser || !receiver) return;
      transfuser.showContent();
      receiver.showContent();
      //receiver.setPercentageContent(newPercentageContent)
      var tC = transfuserCylinder;
      var rC = receiverCylinder;
      var cylinderCandidate;
      if(!transfuserCylinder && !receiverCylinder) {
        for(var i = 0, len = Cylinder.prototype.cylinders.length; i < len; i++) {
          cylinderCandidate = Cylinder.prototype.cylinders[i];
          if(cylinderCandidate.content === transfuser) {
            transfuserCylinder = cylinderCandidate;
          } else if (cylinderCandidate.content === receiver) {
            receiverCylinder = cylinderCandidate;
          }
        }
        if(transfuserCylinder.container.joined && receiverCylinder.container.joined) return;
        transfuserCylinder.container.onMouseDown();
        receiverCylinder.container.onMouseDown();
        mousedownChildren(receiverCylinder, true);
        mousedownParent(receiverCylinder,true);
        mousedownChildren(transfuserCylinder, true);
        mousedownParent(transfuserCylinder,true);
      }

      if(transfuserCylinder.parent && !transfuserCylinder.parent.content.isEmpty()) {
        self.transfer(transfuserCylinder.parent.content, receiver, hasAnimation, transfuserCylinder.parent, receiverCylinder);
      } else if (receiverCylinder.child && !receiverCylinder.child.content.isFull()) {
        self.transfer(transfuser, receiverCylinder.child.content, hasAnimation, transfuserCylinder, receiverCylinder.child);
      } else {
        var toTransfer = +transfuser.getRealVolumen();
        var receiverNewVolumen = +receiver.getRealVolumen() + toTransfer;

        var receiverMaxVolumen = +receiver.getMaxVolumen();
        var exceededVolumen = receiverNewVolumen > receiverMaxVolumen ? receiverNewVolumen - receiverMaxVolumen : 0.00001;

        if(transfuserCylinder.container.isDraggable){
          transfuserCylinder.undraggable();
        }

        if(receiverCylinder.container.isDraggable){
          receiverCylinder.undraggable(); 
        }
        
        transfuserCylinder.transfuser = true;
        transfuserCylinder.transfuserData = {
          exceededVolumen: exceededVolumen,
          receiverNewVolumen: receiverNewVolumen,
          receiverMaxVolumen: receiverMaxVolumen,
          hasAnimation: hasAnimation,
          receiver: receiver,
          receiverCylinder: receiverCylinder
        };

        if (hasAnimation) {
          transfuserCylinder.animate({ content: { percentage: transfuser.setPercentageFromVolumen(exceededVolumen) }}, transfuserCylinder);
          receiverCylinder.animate({ content: { percentage: receiver.setPercentageFromVolumen(receiverNewVolumen) }}, receiverCylinder);        
        } else {
          transfuserCylinder.attr({ content: { percentage: transfuser.setPercentageFromVolumen(exceededVolumen) }}, transfuserCylinder);
          receiverCylinder.attr({ content: { percentage: receiver.setPercentageFromVolumen(receiverNewVolumen) }}, receiverCylinder);        
        }

      }
    }

    var areCylindersJoined = function(cylinder1, cylinder2) {
      if(cylinder1 === cylinder2) return true;
      if(!cylinder1 || !cylinder2) return false;
      var areThey = (cylinder1.container.joined === cylinder2.container.transferId &&
              cylinder2.container.joined === cylinder1.container.transferId);
      return areThey;
    }

    var areContentsJoined = function(content1, content2) {
      if(content1 === content2) return true;
      var areThey = (content1.joined === content2.transferId &&
              content2.joined === content1.transferId);
      return areThey;
    }

    var afterTransferCallback = function() {
      if(!this) return;
      this.content.updateVolumenText();
      if(this.container.isDraggable) {
        this.draggable();
      }
      this.content.checkIfNeedsToBeHidden();
      this.container.onMouseUp();
      this.content.onMouseUp();
      mouseUpParent(this);
      mouseUpChildren(this);

      if(this.transfuser) {
        //Case Cylinder A ---> Cylinder B and B is not full yet.
        if(this.transfuserData.exceededVolumen === 0.00001 && 
          this.transfuserData.receiverNewVolumen < this.transfuserData.receiverMaxVolumen &&
           this.child &&
           !areCylindersJoined(this, this.transfuserData.receiverCylinder.parent)
           ) {
          self.transfer(this.child.content, this.transfuserData.receiver, this.transfuserData.hasAnimation, this.child, this.transfuserData.receiverCylinder);
        } else if(this.transfuserData.exceededVolumen > 0.00001 && 
          this.transfuserData.receiverNewVolumen > this.transfuserData.receiverMaxVolumen &&
           this.transfuserData.receiverCylinder.parent &&
           !areCylindersJoined(this, this.transfuserData.receiverCylinder.parent)) {
          this.transfuserData.receiverCylinder.parent.content.showContent();
          self.transfer(this.content, this.transfuserData.receiverCylinder.parent.content, this.transfuserData.hasAnimation, this, this.transfuserData.receiverCylinder.parent);
        } 
        delete this.transfuser;
        delete this.transfuserData;
      }
    }

    var mousedownParent = function(cylinderInstance, fromContent) {
      if(cylinderInstance.parent) {
        if(!fromContent) cylinderInstance.parent.content.onMouseDown();
        cylinderInstance.parent.container.onMouseDown();
        mousedownParent(cylinderInstance.parent, fromContent);
      }
    }

    var mousedownChildren = function(cylinderInstance, fromContent) {
      if(cylinderInstance.child) {
        if(!fromContent) cylinderInstance.child.content.onMouseDown();
        cylinderInstance.child.container.onMouseDown();
        mousedownChildren(cylinderInstance.child, fromContent);
      }
    }

    var mouseUpParent = function(cylinderInstance) {
      if(cylinderInstance.parent) {
        if(!cylinderInstance.parent.content.isEmpty()) cylinderInstance.parent.content.onMouseUp();        
        cylinderInstance.parent.container.onMouseUp();
        mouseUpParent(cylinderInstance.parent);
      }
    }

    var mouseUpChildren = function(cylinderInstance) {
      if(cylinderInstance.child) {
        if(!cylinderInstance.child.content.isEmpty()) cylinderInstance.child.content.onMouseUp();
        cylinderInstance.child.container.onMouseUp();
        mouseUpChildren(cylinderInstance.child);
      }
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

    /*

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
    */

    /*
    var move = function(dx, dy) {
      self.setX(this.getOx() + dx);
      self.setY(this.getOy() + dy);     
      moveChildren(self.cylinder, dx, dy);
      moveParent(self.cylinder, dx, dy);
      this.updateElements(self.cylinder);
    }

    var up = function() {
      if(this.instanceof === "Content") {
        //this.updateText();
      }

      //if(this.instanceof === "Content") this.onMouseUp();
    }
    */
  
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
    if(this.hasContent) self.setPercentageContent(percentageContent);

    Container.prototype = self;
    Content.prototype = self;

    // Instance
    self.cylinder = {};
    self.cylinder.prototype = self;

    
    

    if(this.hasContent) {
      self.cylinder.content = new Content();
      self.cylinder.container = new Container();

      self.cylinder.container.drawContainer();
      self.cylinder.container.drawBase();  
      self.cylinder.content.drawContent();
      self.cylinder.content.writeVolumen();
      self.cylinder.container.drawTop();
    } else {
      self.cylinder.container = new Container();
      self.cylinder.container.drawContainer();
      self.cylinder.container.drawBase();  
      self.cylinder.container.drawTop();
    }

    

    self.cylinder.animate = function(animationSettings, cylinderToCallback) {
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
        }

        if(settingsForContent['fill']){
          var newColor = settingsForContent['fill'];
          animationObjectForContainer['fill'] = newColor;
          animationObjectForTop['fill'] = newColor;
          animationObjectForBase['fill'] = newColor;
        }

        var animateObject = Raphael.animation(animationObjectForContainer, settingsForContent['ms'] || 1000, '<', afterTransferCallback.bind(cylinderToCallback));
        var elementObject = content.containerElement.animate(animateObject);
        content.topElement.animateWith(elementObject, animateObject, animationObjectForTop, settingsForContent['ms'] || 1000, '<');
      }
    }

    self.cylinder.attr = function(attrSettings, cylinderToCallback) {
      if(!attrSettings) return;
      if(attrSettings['content'] && this.content) {
        var settingsForContent = attrSettings['content'];
        var content = this.content;

        if(settingsForContent['percentage']|| +settingsForContent['percentage'] >= 0) {
          var newPercentage = settingsForContent['percentage'];
          newPercentage = newPercentage > 100 ? 100 : newPercentage;
          self.setPercentageContent(newPercentage);
          content.constructPoints();
          content.containerElement.attr({path: content.getPathMatrixForContainer().join(',')});
          content.topElement.attr({
            cx: content.getTopCx(), 
            cy: content.getTopCy(), 
            rx: content.getTopRx(),
            ry: content.getTopRy()
          });
        }

        if(settingsForContent['fill']) {
          var newFill = settingsForContent['fill'];          
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

      if(cylinderToCallback) {
        afterTransferCallback.apply(cylinderToCallback);  
      }
    }

    var dragStart = function() {
      //Hide Text
      this.onMouseDown();
      if(self.cylinder.content) {
        self.cylinder.content.onMouseDown();
        self.cylinder.content.checkIfNeedsToBeHidden();
      }
      mousedownParent(self.cylinder);
      mousedownChildren(self.cylinder);
      this.setOx(this.getX());
      this.setOy(this.getY());
      startChildren(self.cylinder);
      startParent(self.cylinder);
    }

    var dragMove = function(dx, dy) {
      this.onMouseDown();
      mousedownParent(self.cylinder);
      mousedownChildren(self.cylinder);
      if(!this || !self) return;
      if(self.cylinder.content)  self.cylinder.content.checkIfNeedsToBeHidden();
      self.setX(this.getOx() + dx);
      self.setY(this.getOy() + dy);
      moveChildren(self.cylinder, dx, dy);
      moveParent(self.cylinder, dx, dy);
      self.updateElements(self.cylinder);
    }

    var dragUp = function() {
      this.onMouseUp();
      if(self.cylinder.content) {
        if(!self.cylinder.content.isEmpty()) self.cylinder.content.onMouseUp();        
        self.cylinder.content.checkIfNeedsToBeHidden();
      }
      self.cylinder.container.onMouseUp();
      mouseUpParent(self.cylinder);
      mouseUpChildren(self.cylinder);
    }

    self.cylinder.undraggable = function() {
      if(this.content) this.content.undrag()
      this.container.undrag();
      return this;
    }

    self.cylinder.draggable = function() {
      //if(this.content) this.content.drag(dragMove, dragStart, dragUp, this.content)
      this.container.drag(dragMove, dragStart, dragUp, this.container)
      this.container.isDraggable = true;
      return this;
    }

    var transferStart = function() {      
      self.cylinder.container.onMouseDown();
      var parent;      
      if(this.parent.instanceof === "Container") {
        parent = self.cylinder.content;
        if(parent.hidden && !parent.isEmpty()) parent.showContent();
        mousedownParent(self.cylinder);
        mousedownChildren(self.cylinder);
      } else if (!this.parent.instanceof === "Content") {
        this.parent.onMouseDown();
      } else {
        mousedownParent(self.cylinder, true);
        mousedownChildren(self.cylinder, true);
      }

      if(!parent) parent = this.parent;
      parent.checkIfNeedsToBeHidden();


      if(Cylinder.prototype.selectedTarget === parent) {
        // Same container
        delete Cylinder.prototype.selectedTarget;
        if(!parent.isEmpty()) parent.onMouseUp();
      } else {
        // Other container
        var otherContainer = Cylinder.prototype.selectedTarget;
        Cylinder.prototype.selectedTarget = parent;
        

        if(otherContainer && 
          otherContainer.isTransferable &&
          parent.isTransferable && 
          !otherContainer.isEmpty() &&
          !areContentsJoined(otherContainer, parent)
          ) {
          otherContainer.debug();
          console.log("Performing transfer..")
          self.transfer(otherContainer, parent, true);
          if(!parent.isEmpty()) {
            parent.showContent();
            mouseUpParent(parent);
            mouseUpChildren(parent);
          }
          delete Cylinder.prototype.selectedTarget;
        }
      }
    }
    
    
    self.cylinder.transferable = function() {
      if(!Cylinder.prototype.cylinders) {
        Cylinder.prototype.cylinders = [];
        Cylinder.prototype.ids = 1;
      }

      if(this.content && !this.content.transferId) {
        this.content.transferId = Cylinder.prototype.ids++;
        this.content.isTransferable = true;
      } else if (!this.container.transferId) {
        this.container.transferId = Cylinder.prototype.ids++;
        this.container.isTransferable = true;
      }

      Cylinder.prototype.cylinders.push(this);

      if(this.content) {
        this.content.mousedown(transferStart)
      }
      this.container.mousedown(transferStart);
      return this;
    }
    

    self.cylinder.update = function() {
      if (this.content) this.content.update();
      this.container.update();
    }

    self.cylinder.sendBottom = function(parent, child) {
      if(parent.parent) self.cylinder.sendBottom(parent.parent, child);
      self.transfer(parent.content, child.content, false, parent, child);  
    }

    self.cylinder.joinBottom = function(cylinderInstance) {
      if(!Cylinder.prototype.cylinders) {
        Cylinder.prototype.cylinders = [];
        Cylinder.prototype.ids = 1;
      }
      
      if(this.content && !this.content.transferId) {
        this.content.transferId = Cylinder.prototype.ids++;
        this.content.isTransferable = true;
      } else if (!this.container.transferId) {
        this.container.transferId = Cylinder.prototype.ids++;
        this.container.isTransferable = true;
      }

      if(cylinderInstance.content && !cylinderInstance.content.transferId) {
        cylinderInstance.content.transferId = Cylinder.prototype.ids++;
        cylinderInstance.content.isTransferable = true;
      } else if (!cylinderInstance.container.transferId) {
        cylinderInstance.container.transferId = Cylinder.prototype.ids++;
        cylinderInstance.container.isTransferable = true;
      }

      cylinderInstance.parent = this;
      this.child = cylinderInstance;
      cylinderInstance.prototype.setX(this.prototype.getX());
      cylinderInstance.prototype.setY(this.prototype.getY()+this.prototype.getContainerHeight());
      cylinderInstance.prototype.setTopWidth(this.prototype.getBottomWidth());
      cylinderInstance.container.topElement.remove();

      //this.content.baseElement.remove();
      //cylinderInstance.content.topElement.remove();

      this.container.baseElement.remove();

      cylinderInstance.container.joined = this.content ? this.content.transferId : this.container.transferId;      
      this.container.joined = cylinderInstance.content ? cylinderInstance.content.transferId : cylinderInstance.container.transferId;      
      cylinderInstance.content.joined = cylinderInstance.container.joined;
      this.content.joined = this.container.joined;

      this.update();
      cylinderInstance.update();

      cylinderInstance.sendBottom(this, cylinderInstance);
      return this;
    }
    
    /*
    if(self.cylinder.content) {
      self.cylinder.content.mousedown(start);
    }
    */

    self.cylinder.debug = function() {
      var coords = this.content.topElement.getBBox();
      if(this.rect) { this.rect.remove(); delete this.rect; }
      else { 
        this.content.paper.rect(coords.x, coords.y, coords.width, coords.height)
        .attr({fill: "none", stroke: "#000", "stroke-width": 1});
        //this.parent.debug();
      }
    }

    /*
    self.cylinder.debug = function() {
      if(this.content) self.cylinder.content.mousedown(debug);  
      self.cylinder.container.mousedown(debug);  
      
    }
  */
    
    
    return self.cylinder;
  }

  






  //public
  Raphael.fn.cylinder = function(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding) {
    return new Cylinder(this, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding);
  }

})();