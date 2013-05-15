'use strict';

VirtualLab.Liquid = (function(vl, r, undefined) {
    function Liquid(x, y, width, height) {
        var self = this;

        this.x = x || 0;
        this.y = y || 0;

        this.height = height || 80;
        this.width = width || 10;
        this.min = 0;
        this.max = 100;

        this.paper = null;
        this.components = [];

        this.addPaper = function(paper) {
            self.paper = paper;
        };

        this.draw = function() {
            self.components.forEach(function(e) {
                self.paper.set(e.path);
            });
        };

        this.construct = function() {
            this.components.push({id: 'Liquid', path: self.paper.path('M46.278,81.589c14.619,0,26.469-11.854,26.469-26.451c0-14.634-26.469-53.97-26.469-53.97s-26.476,39.336-26.476,53.97 C19.803,69.735,31.649,81.589,46.278,81.589z M53.069,38.503c0,0,8.126,12.416,8.126,16.811c0,4.383-3.65,7.954-8.126,7.954 c-4.501,0-8.151-3.571-8.151-7.954C44.918,50.919,53.069,38.503,53.069,38.503z')});
            this.draw();
        };
    }
    return Liquid;
})(VirtualLab, Raphael);