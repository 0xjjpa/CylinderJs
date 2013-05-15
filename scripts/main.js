var orthographic = Raphael('orthographic', '690', '160');
var withContent = Raphael('cylinder-with-content', '690', '160');
var basic = Raphael('basic', '690', '160');
var draggable = Raphael('draggable', '690', '160');
var color = Raphael('color', '690', '160');
var percentage = Raphael('percentage', '690', '160');
var animatePercentage = Raphael('animate-percentage', '690', '160');
var animateColor = Raphael('animate-color', '690', '160');
var animateSpeed = Raphael('animate-speed', '690', '160');
var volumen = Raphael('volumen', '690', '160');
var transferable = Raphael('transferable', '690', '160');

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

(function(x,y,rsr){
    x+=200
    y+=30
    var c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    var c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
})(x,y,basic);

(function(x,y,rsr){
    x+=200
    y+=30
    var c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    var c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
    c1.draggable();
    c2.draggable();
})(x,y,draggable);

(function(x,y,rsr){
    x+=200
    y+=30
    var c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    var c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
    c1.displayVolumen();
    c2.displayVolumen();
})(x,y,volumen);

(function(x,y,rsr){
    x+=200
    y+=30
    var c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    var c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
    c1.displayVolumen();
    c2.displayVolumen();
    c1.transferable();
    c2.transferable();
})(x,y,transferable);

(function(x,y,rsr){
    x+=200
    y+=30
    var c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    var c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
})(x,y,color);

(function(x,y,rsr){
    x+=200
    y+=30
    var c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    var c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)", percentage: 10}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)", percentage: 80}});
})(x,y,percentage);

function AnimatePercentage(){
    var c1, c2, toggle;
    (function(x,y,rsr){
    x+=200
    y+=30
    c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
    })(x,y,animatePercentage);

    return function() {
        toggle = toggle ? false : true;        
        c1.animate({content: {fill: "rgba(15, 55, 86, .5)", percentage: toggle ? 10 : 60}});
        c2.animate({content: {fill: "rgba(229, 130, 0, .5)", percentage: toggle ? 80 : 30}});
    }    

}
var ap = AnimatePercentage();

function AnimateContent(){
    var c1, c2, toggle;
    (function(x,y,rsr){
    x+=200
    y+=30
    c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
    })(x,y,animateColor);

    return function() {
        toggle = toggle ? false : true;        
        c1.animate({content: {fill: toggle ? "rgba(242, 203, 185, .5)" : "rgba(15, 55, 86, .5)", percentage: toggle ? 10 : 60}});
        c2.animate({content: {fill: toggle ? "rgba(64, 191, 1, .5)" : "rgba(229, 130, 0, .5)", percentage: toggle ? 80 : 30}});
    }    

}
var ac = AnimateContent();

function AnimateSpeed(){
    var c1, c2, toggle;
    (function(x,y,rsr){
    x+=200
    y+=30
    c1 = rsr.cylinder(x, y, 10, 40, 80, 90, true, 60);
    c2 = rsr.cylinder(x+200, y, 40, 40, 80, 40, true, 30);
    c1.attr({content: {fill: "rgba(15, 55, 86, .5)"}});
    c2.attr({content: {fill: "rgba(229, 130, 0, .5)"}});
    })(x,y,animateSpeed);

    return function() {
        toggle = toggle ? false : true;        
        c1.animate({content: {fill: toggle ? "rgba(242, 203, 185, .5)" : "rgba(15, 55, 86, .5)", percentage: toggle ? 10 : 60, ms:2000}});
        c2.animate({content: {fill: toggle ? "rgba(64, 191, 1, .5)" : "rgba(229, 130, 0, .5)", percentage: toggle ? 80 : 30, ms: 100}});
    }    

}
var as = AnimateSpeed();

document.querySelector("#animate-percentage-button").addEventListener('click', ap);
document.querySelector("#animate-color-button").addEventListener('click', ac);
document.querySelector("#animate-speed-button").addEventListener('click', as);
