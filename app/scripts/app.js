//var workspace = new VirtualLab.Workspace("container").attr({fill: "rgba(255, 0, 0, .5)", stroke: "1"});
var workspace = new VirtualLab.Workspace("container");
//var warehouse = new VirtualLab.Warehouse("warehouse");

var tube = new VirtualLab.Tube();
//var water = new VirtualLab.Element('water', 50);

//tube.addContent(water);
//workspace.add(tube);
//warehouse.add(VirtualLab.Item);
//warehouse.add(VirtualLab.Item);
//warehouse.add(VirtualLab.Item);
//warehouse.add(VirtualLab.Liquid);

var x1 = 150;
var y1 = 30;

var containerWidth = 50;
var containerHeight = 250;
var skewHeight = 20;
var spaceForContent = 4;

var contentHeight = 120;

/* Vertical Container */
var rsr = Raphael('holder', '500', '500');
console.log(rsr);

var top = rsr.ellipse(x1, y1, containerWidth, skewHeight);
var base = rsr.ellipse(x1, containerHeight, containerWidth, skewHeight);
var left = rsr.path("M"+(x1-containerWidth)+","+y1+"L"+ +(x1-containerWidth) +", "+ +(containerHeight) +"");
var right = rsr.path("M"+(x1+containerWidth)+","+y1+"L"+ +(x1+containerWidth) +", "+ +(containerHeight) +"");
//var topEffect = rsr.ellipse(x1, y1+spaceForContent-1, containerWidth-1, skewHeight-spaceForContent+1);

//var content = rsr.rect(x1-containerWidth+spaceForContent,containerHeight-contentHeight,containerWidth*2-(spaceForContent*2),contentHeight).attr({fill: "rgba(5, 62, 123, 1)","stroke-width": 1});
//var topContent = rsr.ellipse(x1, containerHeight-contentHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(47, 83, 123, .2)","stroke-width": 1});
//var baseContent = rsr.ellipse(x1, containerHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});

var x1 = 270;
var y1 = 80;

var containerWidth = 55;
var containerHeight = 250;
var skewHeight = 20;
var spaceForContent = 4;

var contentHeight = 120;
var contentWidth = containerWidth;
var angle = 0;

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

function getSin(rad) {
  return Math.sin(rad);
}

console.log(getSin(2 * Math.PI/4))

var topEllipse = rsr.ellipse(x1, y1, containerWidth, skewHeight).attr({fill: "hsb(0, 1, 1)", stroke: "none", opacity: .5});
var base = rsr.ellipse(x1, containerHeight, (containerHeight*getSinDeg(angle)), skewHeight);
var left = rsr.path("M"+(x1-containerWidth)+","+y1+"L"+ +(x1- (containerHeight*getSinDeg(angle)) ) +", "+ +(containerHeight) +"");
var right = rsr.path("M"+(x1+containerWidth)+","+y1+"L"+ +(x1+ (containerHeight*getSinDeg(angle)) ) +", "+ +(containerHeight) +"");

/*
var start = function () {
  this.ox = this.attr("cx");
  this.oy = this.attr("cy");
  this.animate({opacity: .25}, 500, ">");
};
var move = function (dx, dy) {
  this.attr({cx: this.ox + dx, cy: this.oy + dy});
};

var up = function() {
  this.animate({opacity: .5}, 500, ">");
};


rsr.set(topEllipse).drag(move, start, up);
*/


//var topEffect = rsr.ellipse(x1, y1+spaceForContent-1, containerWidth-1, skewHeight-spaceForContent+1);
/*
rsr.path("M"+(x1-containerWidth+spaceForContent)+","+ +(containerHeight-contentHeight) +
  "L"+ +(x1+containerWidth-spaceForContent)+","+  +(containerHeight-contentHeight)+ 
  "L"+ +(x1+(containerHeight*getSinDeg(angle))-spaceForContent) +", "+ +(containerHeight) +
  "L"+ +(x1-(containerHeight*getSinDeg(angle))+spaceForContent)+","+ containerHeight +"z"
  ).attr({"stroke": "red", "fill": "rgba(255,0,0,.5)"});
*/

//var content = rsr.rect(x1-containerWidth+spaceForContent,containerHeight-contentHeight,containerWidth*2-(spaceForContent*2),contentHeight).attr({fill: "rgba(5, 62, 123, 1)","stroke-width": 1});
//var topContent = rsr.ellipse(x1, containerHeight-contentHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(47, 83, 123, .2)","stroke-width": 1});
//var baseContent = rsr.ellipse(x1, containerHeight, (containerHeight*getSinDeg(angle))-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});


var angle = 691;

function getTanDeg(deg) {
  if( (deg/90) > 1) {
    var rad90 = 90 * Math.PI/180;
    var rad = (deg- (90*parseInt(deg/90, 10))) * Math.PI/180;
    return Math.sin(rad90) * parseInt(deg/90, 10) + Math.sin(rad);
  } else {
    var rad = deg * Math.PI/180;
    return Math.sin(rad);
  }
}

var x0 = 40;
var y0 = 10;
var rx0 = 20;
var rx1 = 300;
var h = 40;

var rx0 = getTanDeg(angle) > 0 ? h * getTanDeg(angle) + 10 : 10;
console.log(rx0);

var top = rsr.path("M"+x0+","+y0+"L"+rx0+","+y0);
var bot = rsr.path("M"+x0+","+ +(y0+h)+"L"+rx1+","+ +(y0+h) );
var join = rsr.path("M"+rx0+","+y0+"L"+rx1+","+ +(y0+h) );
