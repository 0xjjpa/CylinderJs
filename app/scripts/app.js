var rsr = Raphael('cylinder', '600', '460');

var x = 50;
var y = 50;
var containerHeight = 60;
var topWidth = 55;
var bottomWidth = 40;
var yRotation = 50; 


var c3 = rsr.cylinder(x, y, topWidth-20, bottomWidth, containerHeight+20, yRotation, true, 20);
var c4 = rsr.cylinder(x+200, y, topWidth-30, bottomWidth, containerHeight, yRotation, true, 70);
var c5 = rsr.cylinder(x, y+0, topWidth-30, bottomWidth-20, containerHeight+20, yRotation, true, 0);
//var c6 = rsr.cylinder(x, y+0, topWidth-30, bottomWidth-20, containerHeight+20, yRotation, true, 0);
//var c7 = rsr.cylinder(x, y+0, topWidth-30, bottomWidth-20, containerHeight+20, yRotation, true, 0);

/*
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
*/

//c2.attr({content: {fill: "rgb(0, 0, 255)"}})
c3.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
c4.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
c5.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
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
//c4.animate({content: {percentage: 140}});
//c5.debug();
//c1.debug();
//c3.debug();
//c2.draggable();
//c1.draggable();
//c3.draggable();

//c5.joinBottom(c4);

//c5.joinBottom(c6);

c4.joinBottom(c3);

c3.draggable();
c4.draggable();
c5.draggable();
//c6.draggable();

c3.transferable();
c4.transferable();
c5.transferable();



//c6.transferable();

/*
Volumen
Transfer Content
Join Cylinders
*/



//var workspace = rsr.rect(0,0, 550, 450);