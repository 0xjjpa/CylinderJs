var rsr = Raphael('cylinder', '600', '460');

var x = 65;
var y = 30;
var containerHeight = 60;
var topWidth = 55;
var bottomWidth = 40;
var yRotation = 30; 

//cylinder(x, y, topWidth, bottomWidth, containerHeight, yRotation, hasContent, percentageContent, padding)
var c1 = rsr.cylinder(x, y, 10, 10, containerHeight, yRotation+10, true, 20);
var c2 = rsr.cylinder(x+140, y, 10, 10, containerHeight, yRotation, true, 40);
var c3 = rsr.cylinder(x+140*2, y, topWidth-20, bottomWidth, containerHeight, yRotation+20, true, 20);
var c4 = rsr.cylinder(x+140*3, y, topWidth-15, bottomWidth, containerHeight, yRotation, true, 50);
// var c5 = rsr.cylinder(x, y+180, topWidth-30, bottomWidth-20, containerHeight-40, yRotation, true, 10);
// var c6 = rsr.cylinder(x+120, y+150, topWidth+35, bottomWidth+10, containerHeight, yRotation+30, true, 25);
// var c7 = rsr.cylinder(x+140*2, y+140, topWidth-15, bottomWidth, containerHeight, yRotation, false, 50);
// var c8 = rsr.cylinder(x+140*3, y+140, topWidth-15, bottomWidth, containerHeight, yRotation*0, true, 50);
// var c9 = rsr.cylinder(x-40, y+280, topWidth-45, bottomWidth-30, containerHeight, yRotation, true, 30, .25);
// var c10 = rsr.cylinder(x, y+280, topWidth-45, bottomWidth-30, containerHeight, yRotation, true, 60, .25);
// var c11 = rsr.cylinder(x+40, y+280, topWidth-45, bottomWidth-30, containerHeight, yRotation, true, 40, .25);
// var c12 = rsr.cylinder(x+140, y+280, topWidth-45, bottomWidth, containerHeight, yRotation+60, true, 50);
// var c13 = rsr.cylinder(x+140*2, y+280, topWidth-15, bottomWidth, containerHeight, yRotation, true, 50, .25);
// var c14 = rsr.cylinder(x+140*3, y+280, topWidth-15, bottomWidth-25, containerHeight, yRotation+60, true, 50, .23);


c1.attr(
  {
    content: {
      fill: "rgba(232, 0, 122, .2)"
    }
    // container: {
    //   topWidth: 50
    // }
  }
);

c2.attr({content: {fill: "rgb(0, 0, 255)"}})
c3.attr({content: {fill: "rgb(212, 255, 0)"}})
c4.attr({content: {fill: "rgb(73, 240, 159)"}})
// c5.attr({content: {fill: "rgb(4, 117, 100)"}})
// c6.attr({content: {fill: "rgb(255, 187, 0)"}})
// c8.attr({content: {fill: "rgb(46, 9, 29)"}})
// c9.attr({content: {fill: "rgb(250, 51, 37)"}})
// c10.attr({content: {fill: "rgb(0, 0, 137)"}})
// c11.attr({content: {fill: "rgb(0, 130, 137)"}})
// c12.attr({content: {fill: "rgb(90, 90, 137)"}})
// c13.attr({content: {fill: "rgb(200, 46, 28)"}})
// c14.attr({content: {fill: "rgb(90, 190, 12)"}})

//c1.animate({content: {percentage: 20, ms: 1000}});
//c2.animate({content: {percentage: 60, fill: "rgba(255,0,0)", ms: 1000}});
//c3.animate({content: {fill: "rgb(0,0,0)"}});
c4.animate({content: {percentage: 1}});
//c1.debug();
//c2.debug();
c2.draggable();
c1.draggable();
c3.draggable();
//c2.transferable();
//c3.transferable();
c1.joinBottom(c2);
c2.joinBottom(c3);
//c2.joinBottom(c3);
//c5.draggable();

/*
Volumen
Transfer Content
Join Cylinders
*/



//var workspace = rsr.rect(0,0, 550, 450);