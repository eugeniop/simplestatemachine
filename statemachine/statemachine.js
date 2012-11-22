/*
 A very simple statemachine
 StateMachine has states identified with a name
 each state has entries that handle some event.
 An event selector determines whether an entry shoudl handle 
 it or not.
 An action is typically associated with an entry. 

  @eugenio_pace
*/

///StateEntry
function stateEntry(state,selector)
{
  this.selector = selector;
  this.state = state;
  this.action = function() { return this.state.name; }
}

stateEntry.prototype.then = function(action)
{
  this.action = action;
  return this.state;
}

///State
function state(name)
{
  this.stateName = name;
  this.entries = [];
}

state.prototype.when = function( selector ) 
{
  var entry = new stateEntry(this,selector);
  this.entries[this.entries.length] = entry;
  return entry;
}

state.prototype.any = function() 
{
  return this.when(function(){return true;});
}

state.prototype.default = function(action) 
{
  var thisState = this.stateName;
  this.any()
      .then( function(e){
                action(e);
                return thisState;
              });
}

state.prototype.process = function( event )
{
  for( var x = 0; x < this.entries.length; x++ )
    if( this.entries[x].selector(event) )
      return this.entries[x].action(event);
}

function stateMachine(name)
{
  this.name = name;
  this.states = [];
  this.currentState = "";
}

module.exports = stateMachine;

stateMachine.prototype.state = function(stateName)
{
    var st = new state(stateName);   
    this.states[stateName] = st;
    return st;
}

stateMachine.prototype.process = function(event)
{
  this.currentState = this.states[this.currentState].process(event);
}
