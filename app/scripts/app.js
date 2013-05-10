var rsr = Raphael('cylinder', '600', '460');

var x = 50;
var y = 50;

//Tubo de Ensayo
var tubo = rsr.cylinder(x, y, 10, 10, 80, 30, true, 40);

tubo.transferable();
tubo.draggable();
tubo.attr({content: {fill: "rgba(40, 100, 159, 1)"}});

//Matraz
var matrazTop = rsr.cylinder(x+100, y, 10, 10, 30, 30, true, 40);
var matrazBottom = rsr.cylinder(x+100, y, 10, 40, 60, 90, true, 40);

matrazTop.joinBottom(matrazBottom);

matrazTop.transferable();
matrazTop.draggable();
matrazTop.attr({	content: {fill: "rgba(20, 160, 59, 1)"}});
matrazBottom.transferable();
matrazBottom.draggable();
matrazBottom.attr({	content: {fill: "rgba(20, 160, 59, 1)"}});


var tuboBig = rsr.cylinder(x+300, y, 40, 40, 80, 40, true, 40);

tuboBig.transferable();
tuboBig.draggable();
tuboBig.attr({	content: {fill: "rgba(90, 20, 230, 1)"}});


var pipetaTop = rsr.cylinder(x, y+120, 10, 10, 80, 20, true, 90);
var pipetaMain = rsr.cylinder(x, y+120, 6, 6, 40, 20, true, 90);
var pipetaBottom = rsr.cylinder(x, y+120, 6, 6, 40, 20, true, 90);

pipetaTop.joinBottom(pipetaMain);
pipetaMain.joinBottom(pipetaBottom);

pipetaTop.transferable();
pipetaTop.draggable();
pipetaTop.attr({	content: {fill: "rgba(200, 100, 9, 1)"}});

pipetaMain.transferable();
pipetaMain.draggable();
pipetaMain.attr({	content: {fill: "rgba(200, 100, 9, 1)"}});

pipetaBottom.transferable();
pipetaBottom.draggable();
pipetaBottom.attr({	content: {fill: "rgba(200, 100, 9, 1)"}});

var largeTube = rsr.cylinder(x+120, y+120, 10, 10, 170, 60, true, 90, .30);
largeTube.transferable();
largeTube.draggable();
largeTube.attr({	content: {fill: "rgba(99, 0, 99, 1)"}});


//Matraz
var matraz2Bottom = rsr.cylinder(x+240, y+200, 10, 40, 60, 90, true, 40);
var matraz2Top = rsr.cylinder(x+240, y+140, 10, 30, 30, 60, true, 40);


matraz2Top.joinBottom(matraz2Bottom);

matraz2Top.transferable();
matraz2Top.draggable();
matraz2Top.attr({	content: {fill: "rgba(0, 0, 59, 1)"}});
matraz2Bottom.transferable();
matraz2Bottom.draggable();
matraz2Bottom.attr({	content: {fill: "rgba(0, 0, 59, 1)"}});

//var containerHeight = 60;
//var topWidth = 55;
//var bottomWidth = 40;
//var yRotation = 50; 


//var c6 = rsr.cylinder(x, y+150, topWidth, bottomWidth, containerHeight+20, yRotation, true, 40);
//var c3 = rsr.cylinder(x, y, topWidth-20, bottomWidth, containerHeight+20, yRotation, true, 20);
//var c4 = rsr.cylinder(x+200, y, topWidth-30, bottomWidth, containerHeight, yRotation, true, 70);
//var c5 = rsr.cylinder(x, y+0, topWidth-30, bottomWidth-20, containerHeight+220, yRotation, true, 60);

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

//tubo.attr({content: {fill: "rgb(0, 0, 255)"}})
//c2.attr({content: {fill: "rgb(0, 0, 255)"}})
//c3.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
//c4.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
//c5.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
//c6.attr({content: {fill: "rgba(0, 200, 159, 1)"}})
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

/*
c4.joinBottom(c3);
c3.joinBottom(c6);

c3.draggable();
c4.draggable();
c5.draggable();
c6.draggable();

c3.transferable();
c4.transferable();
c5.transferable();
c6.transferable();
*/


//c6.transferable();

/*
Volumen
Transfer Content
Join Cylinders
*/



//var workspace = rsr.rect(0,0, 550, 450);