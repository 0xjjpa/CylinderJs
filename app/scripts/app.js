//var workspace = new VirtualLab.Workspace("container").attr({fill: "rgba(255, 0, 0, .5)", stroke: "1"});
//var workspace = new VirtualLab.Workspace("container");
var rsr = Raphael('cylinder', '600', '160');

var x = 65;
var y = 30;

var containerHeight = 90;
var topWidth = 55;
var bottomWidth = 40;
var yRotation = 40; // Done

var c1 = rsr.cylinder(x, y, topWidth, bottomWidth+20, containerHeight, yRotation, true, 90);
var c2 = rsr.cylinder(x+140, y, topWidth, bottomWidth, containerHeight, yRotation+20, true, 0);
var c3 = rsr.cylinder(x+140*2, y, topWidth-40, bottomWidth, containerHeight, yRotation, true, 20);
var c4 = rsr.cylinder(x+140*3, y, topWidth-15, bottomWidth, containerHeight, yRotation, true, 50);

c1.attr({content: {fill: "rgb(232, 0, 122)"}})
c2.attr({content: {fill: "rgb(255, 99, 72)"}})
c3.attr({content: {fill: "rgb(212, 255, 0)"}})
c4.attr({content: {fill: "rgb(73, 240, 159)"}})

c1.animate({content: {percentage: 40}});
c2.animate({content: {percentage: 60}});
console.log(c2);
c3.animate({content: {percentage: 70}});
c4.animate({content: {percentage: 10}});


var workspace = rsr.rect(0,0, 550, 150);