var orthographic = Raphael('orthographic', '690', '160');
var withContent = Raphael('cylinder-with-content', '690', '160');

var x = 0;
var y = 0;

(function(x,y,rsr){
x +=170
y +=10
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

rsr.text(x+120, y, "A 3D orthographic cylinder");

x+=250
rsr.ellipse(x,y,topWidth,getTopRy);
y+=5
rsr.path([
    ["M", x-topWidth, y],
    ["A", topWidth, getTopRy, 0, 0, 0, x+topWidth, y],
    ["L", x+bottomWidth, y+containerHeight],
    ["A", bottomWidth, getBaseRy, 0, 0, 0, x-bottomWidth, y+containerHeight],
    ["L", x-topWidth, y]
    ]);
y+=5
rsr.ellipse(x, y+containerHeight, bottomWidth, getBaseRy);

rsr.text(x+120, y-10, "Made of an ellipse");
rsr.text(x+120, y+40, "a composite path ");
rsr.text(x+120, y+100, "and other ellipse");
})(x,y,orthographic);

(function(x,y,rsr){
	x+=200
	y+=30
	rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
	rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
})(x,y,withContent);


