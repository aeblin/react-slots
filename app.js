//This is the container for the slot machine (probably only one of these)
var SlotMachine = React.createClass({
  getInitialState: function() {
    return {slotPositions: [genSlotValue(), genSlotValue(), genSlotValue()]};
  },
  getRandomState: function() {
    return [genSlotValue(), genSlotValue(), genSlotValue()];
  },
  handleButtonClick: function() {
    //Set count to 0 before each button press
    var count = 0;
    //Set a random state as the final state of all slots before we start spinning
    var finalState = this.getRandomState();
    //Make sure we start with a fresh state for all slots on each spin
    //this.setState({slotPositions: this.getRandomState()})
    var currentState = this.getRandomState();
    //Spinning happens here
    var makeSpin = function(){
      var nextState = currentState;
      var hasChanged = false;
      //Evaluate whether or not slots are on their final destination
      for(var i = 0; i < 3; i++){
        if (count < 9 || currentState[i] != finalState[i]) {
          nextState[i] = (currentState[i]+1)%3;
          hasChanged = true;
        }
      }
      console.log(currentState);
      console.log(nextState);
      //This moves reel to the next assigned state if it's not yet on it's final value.
      this.setState({slotPositions: nextState, isFinal: !hasChanged})
      //Stops reel spinning if we've hit the final state's value
      if(!hasChanged) {
        return; 
      }
      currentState = this.state.slotPositions;
      setTimeout(makeSpin, 250); 
      count++; 
    }.bind(this);
    //Actually spin
    makeSpin();
  },
  render: function() {
    //Define winning states
    var sp = this.state.slotPositions;
    var isWinning = (sp[0] == sp[1]) && (sp[1] == sp[2]);

    //Make sure winner and winnerClass strings are undefined until there's an actual win
    var winner = ""; 
    var winnerClass = "";
    //Make sure we're only displaying the win state on final slot positions
    if(isWinning && this.state.isFinal){
      winner = ["You won coffee!", "You won tea!", "You won espresso!"][sp[0]];
      winnerClass = [" coffee", " tea", " espresso"][sp[0]];
    }

    //Render Machine
    return (
      <div>
        <div className="machine row">
          <Slots slotPositions={this.state.slotPositions} />
          <div className="spin row">
            <SpinButton onButtonClick={this.handleButtonClick} />
          </div>
        </div>
        <div className="win row">
          <StatusMessage winner={winner} winnerClass={winnerClass} />
        </div>
      </div>
    );
  }
});
//This is the container for each slot (there should be 3)
var Slots = React.createClass({
  render: function() {
    return (
      <div className="slot-container row">
        <Slot slotIndex="one" slotPositions={this.props.slotPositions[0]} />
        <Slot slotIndex="two" slotPositions={this.props.slotPositions[1]} />
        <Slot slotIndex="three" slotPositions={this.props.slotPositions[2]} />
      </div>
    );
  }
});
//Creates each slot
var Slot = React.createClass({
  render: function() {
    return (
      <div className="col-xs-4">
        <div className="slot-reel"> 
          <div className={"slot slot-"+this.props.slotIndex+" position-"+this.props.slotPositions}>
          </div>
        </div>
      </div>
    );
  }
}) 
//Creates Spin Button
var SpinButton = React.createClass({
  handleClick: function(event){
    this.props.onButtonClick();
  },
  render: function(){
    return (
      <div className="col-md-4 col-md-offset-4" onClick={this.handleClick} >
        <div className="spin-button">
          Spin!
        </div>
      </div>
    );
  }
})
//Creates Win Div
var StatusMessage = React.createClass({
  render: function(){
    //This is some jQuery to make winning more exciting
    $('body').addClass(this.props.winnerClass, 1000);
    return (
      <div className={"col-md-12" + this.props.winnerClass}>
        <h2>{this.props.winner}</h2>
      </div>
    )
  }
})
React.render(
  <SlotMachine />,
  document.getElementById('content')
);
//Generates a random slot value.
function genSlotValue(){
  return Math.floor(Math.random() * 3);
}