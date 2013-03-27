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

var x1 = 250;
var y1 = 50;

var containerWidth = 40;
var containerHeight = 150;
var skewHeight = 13;
var spaceForContent = 3;

var contentHeight = 70;

var rsr = Raphael('holder', '500', '500');

var top = rsr.ellipse(x1, y1, containerWidth, skewHeight);
var base = rsr.ellipse(x1, containerHeight, containerWidth, skewHeight);
var left = rsr.path("M"+(x1-containerWidth)+","+y1+"V"+containerHeight+"");
var right = rsr.path("M"+(x1+containerWidth)+","+y1+"V"+containerHeight+"");
var topEffect = rsr.ellipse(x1, y1+spaceForContent-1, containerWidth-1, skewHeight-spaceForContent+1);

var content = rsr.rect(x1-containerWidth+spaceForContent,containerHeight-contentHeight,containerWidth*2-(spaceForContent*2),contentHeight).attr({fill: "rgba(5, 62, 123, 1)","stroke-width": 1});
var topContent = rsr.ellipse(x1, containerHeight-contentHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(47, 83, 123, .2)","stroke-width": 1});
var baseContent = rsr.ellipse(x1, containerHeight, containerWidth-spaceForContent, skewHeight-spaceForContent).attr({fill: "rgba(5, 62, 123, .2)","stroke-width": 1});

