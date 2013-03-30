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

    //var t = topWidth;
    //topWidth = topWidth > bottomWidth ? topWidth : bottomWidth;
    //bottomWidth = topWidth > bottomWidth ? topWidth : topWidth;

    yRotation = +yRotation;
    yRotation = yRotation > 100 ? yRotation%100 : yRotation;
    yRotation = yRotation > 0 ? yRotation/100 : 1/100;
    yRotation = topWidth < bottomWidth ? yRotation*topWidth : yRotation*bottomWidth;
    console.log(yRotation)

    var padding = .10;
    var ellipsesDifference = topWidth > bottomWidth ? topWidth - bottomWidth : bottomWidth - topWidth;

    var cylinder = paper.set();
    
    var container = paper.path([
      ["M", x-topWidth, y],
      ["L", x+topWidth, y],
      ["L", x+bottomWidth, y+containerHeight],
      ["L", x-bottomWidth, y+containerHeight],
      ["L", x-topWidth, y]
      ]).attr({fill: "rgba(255, 255, 255, 1)","stroke-width": 1});

    if (topWidth < bottomWidth) {
      topRy = topWidth*yRotation/bottomWidth;
      baseRy = yRotation;
    } else {
      topRy = yRotation;
      baseRy = bottomWidth*yRotation/topWidth;
    }

    var base = paper.ellipse(x, y+containerHeight, bottomWidth, baseRy).attr({fill: "rgba(255, 255, 255, 1)","stroke-width": 1});
    var top = paper.ellipse(x, y, topWidth, topRy).attr({fill: "rgba(255, 255, 255, 1)","stroke-width": 1});
    

    cylinder.push(top);
    cylinder.push(container);
    cylinder.push(base);

    if(hasContent && percentageContent) {
      percentageContent = +percentageContent;
      percentageContent = percentageContent > 100 ? percentageContent%100 : percentageContent;
      percentageContent = percentageContent > 0 ? percentageContent*containerHeight/100 : 1*containerHeight/100;

      var angle = Math.atan(ellipsesDifference/containerHeight);

      if (topWidth < bottomWidth) {
        var topContentWidth = ((containerHeight-percentageContent)*Math.tan(angle))+topWidth;
      } else {
        var topContentWidth = (percentageContent*Math.tan(angle))+bottomWidth;
      }

      y = y - padding*10;

      var content = paper.path([
        ["M", x-topContentWidth+(topContentWidth*padding), y+containerHeight-percentageContent],
        ["L", x+topContentWidth-(topContentWidth*padding), y+containerHeight-percentageContent],
        ["L", x+bottomWidth-(bottomWidth*padding), y+containerHeight],
        ["L", x-bottomWidth+(bottomWidth*padding), y+containerHeight],
        ["L", x-topContentWidth+(topContentWidth*padding), y+containerHeight-percentageContent]
        ]).attr({fill: "rgba(5, 62, 123, .1)","stroke-width": 1});

      if (topWidth < bottomWidth) {
        topContentRy = topContentWidth*yRotation/bottomWidth;
        baseContentRy = yRotation;
      } else {
        topContentRy = yRotation;
        baseContentRy = bottomWidth*yRotation/topWidth;
      }

      var baseContent = rsr.ellipse(x, y+containerHeight, bottomWidth-(bottomWidth*padding), baseContentRy-(baseContentRy*padding*2)).attr({fill: "rgba(220, 235, 241, 1)","stroke-width": 1});
      var topContent = rsr.ellipse(x, y+containerHeight-percentageContent, topContentWidth-(topContentWidth*padding), topContentRy-(topContentRy*padding*2)).attr({fill: "rgba(220, 235, 241, 1)","stroke-width": 1});
      
    } 

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