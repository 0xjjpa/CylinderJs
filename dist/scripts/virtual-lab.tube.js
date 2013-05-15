'use strict';

VirtualLab.Tube = (function(vl, r, undefined) {
    function Tube(x, y, width, height) {
        var self = this;

        this.x = x || 0;
        this.y = y || 0;

        this.height = height || 80;
        this.width = width || 10;
        this.min = 0;
        this.max = 100;

        this.paper = null;
        this.content = null;

        this.components = [];

        this.addContent = function(Element) {
            if(!self.content) {
                self.content = Element;
            } else {
                var previousContent = self.content;
                previousContent.mililiters += Element.mililiters;
                self.content = previousContent;
            }
        };

        this.addPaper = function(paper) {
            self.paper = paper;
        };

        this.draw = function() {
            self.components.forEach(function(e) {
                self.paper.set(e.path);
            });
        };

        this.construct = function() {
            this.components.push({id: 'Container', path: self.paper.path(getContainerPathString()).attr({'stroke-width': 2}) });
            if(this.content) {
                this.components.push({id: 'Content', path: self.paper.path(getContentPathString()).attr({fill: '#FF0000'}) });
            }
            this.draw();
        };

        var getContentPathString = function() {
            var contentQuantity = self.content.mililiters * self.height / self.max;
            return 'M'+(self.x+10)+' '+ parseInt(self.height+10+self.y, 10) +' v-'+contentQuantity+'h'+self.width+'v'+contentQuantity+'z';
        };

        var getContainerPathString = function() {
            return 'M'+(self.x +5)+' '+(self.y+10)+' h5v'+ parseInt(self.height,10) +'h'+self.width+'v-'+ parseInt(self.height,10) +'h5';
        };

        this.applyDecorator = function(decoratorFunction, start, move, up) {
            self.components.forEach(function(e) {
                var rElement = e.path;
                rElement[decoratorFunction].call(start, move, up, rElement, rElement, rElement);
            });
        };

        this.increase = function(increaseValue) {
            if(self.content >= self.max) {
                return;
            }
            var _oldContentPathString = getContentPathString();
            console.log(_oldContentPathString);
            self.content += increaseValue;
            console.log(getContentPathString());
            var trans = r.transformPath(_oldContentPathString, getContentPathString());
            console.log(trans);
            self.components[1].path.animate({path:trans}, 200);
        };

        this.decrease = function(decreaseValue) {
            if(self.content < self.min) {
                return;
            }
            var _oldContentPathString = getContentPathString();
            console.log(_oldContentPathString);
            self.content -= decreaseValue;
            console.log(getContentPathString());
            var trans = r.transformPath(_oldContentPathString, getContentPathString());
            self.components[1].path.animate({path:trans}, 200);
            this.draw();
        };
    }
    return Tube;
})(VirtualLab, Raphael);