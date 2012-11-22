simplestatemachine
==================

A very simple state machine for node

var stateMachine = require('./statemachine');

var EventOne = function(event) 
{
   return event == 'one';
}

var EventTwo = function(event)
{
	return event == 'two';
} 

var sm = new stateMachine('sm');

sm.state('one')
	.when(EventOne)
		.then(function(e){console.log('S1: ' + e); return 'one';})
    .when(EventTwo)
    	.then(function(e){console.log('S1: ' + e); return 'two';})
    .any()
    	.then(function(e){console.log('S1: (any)' + e); return 'one';});

sm.state('two')
	.when(EventTwo)
		.then(function(e){console.log('S2: ' + e); return 'two';})
	.when(EventOne)
		.then(function(e){console.log('S2: ' + e); return 'one';})
	.default(function(e){console.log('S2: (default)' + e)});

sm.currentState = 'one';

sm.process('one');
sm.process('four');
sm.process('two');
sm.process('three');
sm.process('one');
sm.process('hello');
