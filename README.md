simplestatemachine
==================

A very simple state machine for node.js 

- `when` defines the condition that will match an event on a particular state.
- `then` defines what to do when a match is found, and what the next state is.
- `any` is a condition that is always met (like in "with any event")
- `default` is a shortcut for `any` and for staying in the same state, doing something. That is `default(f)` is like when(true).then(f(); return thisstate;)
- The `selector` in `when` is something that returns `true` or `false`. If `true` is returned, then all evaluations are halted and `then` is executed.


		var stateMachine = require('statemachine');
		
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
