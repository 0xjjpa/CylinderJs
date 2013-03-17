'use strict';

VirtualLab.workspace.mock = function() {

}

Workspace = VirtualLab.workspace.mock();

(function() {
    describe('Workspace Test', function() {
        describe('It should receive proper', function() {
            it('should run here few assertions', function() {
                expect(false).not.toBe(true);
            });
        });
    });
})();