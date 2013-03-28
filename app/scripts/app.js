var workspace = new VirtualLab.Workspace("container");
var warehouse = new VirtualLab.Warehouse("warehouse");

var tube = new VirtualLab.Tube();
//var water = new VirtualLab.Element('water', 50);

//tube.addContent(water);
//workspace.add(tube);
warehouse.add(VirtualLab.Item);
warehouse.add(VirtualLab.Item);
warehouse.add(VirtualLab.Item);
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

var top = rsr.ellipse(x1, y1, containerWidth, skewHeight);
var base = rsr.ellipse(x1, containerHeight, containerWidth, skewHeight);
var left = rsr.path("M"+(x1-containerWidth)+","+y1+"L"+ +(x1-containerWidth) +", "+ +(containerHeight) +"");
var right = rsr.path("M"+(x1+containerWidth)+","+y1+"L"+ +(x1+containerWidth) +", "+ +(containerHeight) +"");
//var topEffect = rsr.ellipse(x1, y1+spaceForContent-1, containerWidth-1, skewHeight-spaceForContent+1);

var content = rsr.rect(x1-containerWidth+spaceForContent,containerHeight-contentHeight,containerWidth*2-(spaceForContent*2),contentHeight).attr({fill: "rgba(5, 62, 123, 1)","stroke-width": 1});
var topContent = rsr.ellipse(x1, containerHeight-contentHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(47, 83, 123, .2)","stroke-width": 1});
var baseContent = rsr.ellipse(x1, containerHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});

var x1 = 270;
var y1 = 80;

var containerWidth = 50;
var containerHeight = 250;
var skewHeight = 20;
var spaceForContent = 4;

var contentHeight = 120;
var angle = 15;

var top = rsr.ellipse(x1, y1, containerWidth, skewHeight);
var base = rsr.ellipse(x1, containerHeight, containerWidth+angle, skewHeight);
var left = rsr.path("M"+(x1-containerWidth)+","+y1+"L"+ +(x1-containerWidth-angle) +", "+ +(containerHeight) +"");
var right = rsr.path("M"+(x1+containerWidth)+","+y1+"L"+ +(x1+containerWidth+angle) +", "+ +(containerHeight) +"");
//var topEffect = rsr.ellipse(x1, y1+spaceForContent-1, containerWidth-1, skewHeight-spaceForContent+1);
rsr.path("M"+(x1-containerWidth+spaceForContent)+","+ +(containerHeight-contentHeight) +
  "L"+ +(x1+containerWidth-spaceForContent)+","+  +(containerHeight-contentHeight)+ 
  "L"+ +(x1+containerWidth+angle-spaceForContent) +", "+ +(containerHeight) +
  "L"+ +(x1-containerWidth-angle+spaceForContent)+","+ containerHeight +"z"
  ).attr({"stroke": "red", "fill": "red"});

//var content = rsr.rect(x1-containerWidth+spaceForContent,containerHeight-contentHeight,containerWidth*2-(spaceForContent*2),contentHeight).attr({fill: "rgba(5, 62, 123, 1)","stroke-width": 1});
var topContent = rsr.ellipse(x1, containerHeight-contentHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(47, 83, 123, .2)","stroke-width": 1});
var baseContent = rsr.ellipse(x1, containerHeight, containerWidth-spaceForContent+angle, skewHeight-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});