var rsr = Raphael('cylinder', '600', '460');

var x = 80;
var y = 80;
/*
var topRx = 20;
var topRy = 20;
var baseRx = 30;
var baseRy = 30;
var containerHeight = 100;
var topWidth = topRx*2;
var bottomWidth = baseRx*2;
var yRotation = 10;

var getTopRy = topWidth*yRotation/bottomWidth;
var getBaseRy = bottomWidth*yRotation/topWidth;

// Container
rsr.ellipse(x,y,topWidth,getTopRy);
rsr.path([
    ["M", x-topWidth, y],
    ["A", topWidth, getTopRy, 0, 0, 0, x+topWidth, y],
    ["L", x+bottomWidth, y+containerHeight],
    ["A", bottomWidth, getBaseRy, 0, 0, 0, x-bottomWidth, y+containerHeight],
    ["L", x-topWidth, y]
    ]);
rsr.ellipse(x, y+containerHeight, bottomWidth, getBaseRy);
*/

//Tubo de Ensayo
var tubo = rsr.cylinder(x, y, 10, 10, 80, 90, true, 40);

tubo.transferable();
tubo.draggable();
tubo.attr({content: {fill: "rgba(40, 100, 159, 1)"}});
tubo.displayVolumen();

//Matraz
var matrazTop = rsr.cylinder(x+100, y, 10, 10, 50, 20, true, 40);
var matrazBottom = rsr.cylinder(x+100, y, 10, 40, 60, 90, true, 40);

matrazTop.joinBottom(matrazBottom);

matrazTop.transferable();
matrazTop.draggable();
matrazTop.attr({	content: {fill: "rgba(20, 160, 59, 1)"}});
matrazBottom.transferable();
matrazBottom.draggable();
matrazBottom.attr({	content: {fill: "rgba(20, 160, 59, 1)"}});
matrazTop.displayVolumen();


var tuboBig = rsr.cylinder(x+300, y, 40, 40, 80, 40, true, 40);

tuboBig.transferable();
tuboBig.draggable();
tuboBig.attr({	content: {fill: "rgba(90, 20, 230, 1)"}});
tuboBig.displayVolumen();


var pipetaTop = rsr.cylinder(x, y+120, 10, 10, 80, 20, true, 0);
var pipetaMain = rsr.cylinder(x, y+120, 6, 6, 40, 20, true, 0);
var pipetaBottom = rsr.cylinder(x, y+120, 6, 6, 40, 20, true, 0);

pipetaTop.joinBottom(pipetaMain);
pipetaMain.joinBottom(pipetaBottom);

pipetaTop.transferable();
pipetaTop.draggable();
pipetaTop.attr({	content: {fill: "rgba(200, 100, 9, 1)"}});
pipetaTop.displayVolumen();

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
largeTube.displayVolumen();


//Matraz
var matraz2UltraBase = rsr.cylinder(x+240, y+140, 5, 30, 30, 60, true, 40);
var matraz2Base = rsr.cylinder(x+240, y+140, 10, 30, 10, 60, true, 40);
var matraz2Bottom = rsr.cylinder(x+240, y+200, 10, 40, 60, 90, true, 40);
var matraz2Top = rsr.cylinder(x+240, y+140, 10, 30, 30, 60, true, 40);
matraz2Top.displayVolumen();




matraz2Top.joinBottom(matraz2Bottom);
matraz2Bottom.joinBottom(matraz2Base);
matraz2Base.joinBottom(matraz2UltraBase);

matraz2Top.transferable();
matraz2Top.draggable();
matraz2Top.attr({	content: {fill: "rgba(0, 0, 59, 1)"}});
matraz2Bottom.transferable();
matraz2Bottom.draggable();
matraz2Bottom.attr({	content: {fill: "rgba(0, 0, 59, 1)"}});
matraz2Base.transferable();
matraz2Base.draggable();
matraz2Base.attr({	content: {fill: "rgba(0, 0, 59, 1)"}});
matraz2UltraBase.transferable();
matraz2UltraBase.draggable();
matraz2UltraBase.attr({	content: {fill: "rgba(0, 0, 59, 1)"}});

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
