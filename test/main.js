var should = require('should');
var stateMachine = require('../lib/main');

describe('statemachine', function() {
    describe('Empty SM', function() {
        it('returns name', function() {
            var sm = new stateMachine("A SM");
            sm.name.should.eql("A SM");
            sm.states.length.should.eql(0);
            sm.currentState.should.eql("");
        });
    });
});
