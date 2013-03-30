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
  function Cylinder(paper, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent) {
    if(!paper) return;

    x = x || 0;
    y = y || 0;

    if(!topWidth) {
      throw new Error('A top width needs to be provided');
    } else if(!bottomWidth) {
      throw new Error('A bottom width needs to be provided');
    } else if(!containerHeight) {
      throw new Error('A container height needs to be provided');
    }

    function getSinDeg(deg) {
      if( (deg/90) > 1) {
        var rad90 = 90 * Math.PI/180;
        var rad = (deg- (90*parseInt(deg/90, 10))) * Math.PI/180;
        return Math.sin(rad90) * parseInt(deg/90, 10) + Math.sin(rad);
      } else {
        var rad = deg * Math.PI/180;
        return Math.sin(rad);
      }
    }

    yRotation = +yRotation;
    yRotation = yRotation > 100 ? yRotation%100 : yRotation;
    yRotation = yRotation > 0 ? yRotation*topWidth/100 : 1*topWidth/100;

    var spaceForContent = 4;
    //var contentHeight = 120;
    var cylinder = paper.set(),
    ellipsesDifference = topWidth > bottomWidth ? topWidth - bottomWidth : bottomWidth - topWidth;

    var top = paper.ellipse(x, y, topWidth, topWidth*yRotation/bottomWidth),
    left = paper.path([["M", x-topWidth, y], ["L", x-topWidth-ellipsesDifference, y+containerHeight]]),
    right = paper.path([["M", x+topWidth, y], ["L", x+topWidth+ellipsesDifference, y+containerHeight]]),
    base = paper.ellipse(x, y+containerHeight, bottomWidth, yRotation);

    console.log(topWidth, yRotation)
    console.log(bottomWidth, yRotation)

    if(hasContent && percentageContent) {
      percentageContent = +percentageContent;
      percentageContent = percentageContent > 100 ? percentageContent%100 : percentageContent;
      percentageContent = percentageContent > 0 ? percentageContent*containerHeight/100 : 1*containerHeight/100;

      
      var contentHeight = percentageContent;
      console.log(contentHeight)
      var angle = Math.atan(ellipsesDifference/containerHeight);
      var topContentWidth = ((containerHeight-contentHeight)*Math.tan(angle))+topWidth
      //var baseContent = rsr.ellipse(x, containerHeight, (containerHeight*getSinDeg(angle))-spaceForContent, yRotation-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});
      //var content = rsr.rect(x-containerWidth+spaceForContent,containerHeight-contentHeight,topWidth*2-(spaceForContent*2),contentHeight).attr({fill: "rgba(5, 62, 123, 1)","stroke-width": 1});
      var topContent = rsr.ellipse(x, y+containerHeight-contentHeight, topContentWidth-spaceForContent, yRotation-spaceForContent).attr({fill: "rgba(47, 83, 123, .2)","stroke-width": 1});
      var baseContent = rsr.ellipse(x, y+containerHeight, bottomWidth-spaceForContent, yRotation-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});
    } else {

    }
    
    cylinder.push(top);
    cylinder.push(left);
    cylinder.push(right);
    cylinder.push(base);
    return cylinder;
  }

  //inheritance
  var F = function() {};
  F.prototype = Raphael.g;
  Cylinder.prototype = new F;

  //public
  Raphael.fn.cylinder = function(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent) {
    return new Cylinder(this, x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent);
  }

})();