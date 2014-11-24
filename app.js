//This is the container for the slot machine (probably only one of these)
var SlotMachine = React.createClass({
  getInitialState: function() {
    return {slotPositions: [genSlotValue(),genSlotValue(),genSlotValue()]};
  },
  handleButtonClick: function() {
    //Set count to 0 before each button press
    var count = 0;
    //YOUR DENSITY
    var finalState = [genSlotValue(), genSlotValue(), genSlotValue() ];
    //Spinning happens here
    var makeSpin = function(){
      var currentState = this.state.slotPositions;
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
    console.log(isWinning);
    var winner = ""; 
    //Make sure we're only displaying the win state on final slot positions
    if(isWinning && this.state.isFinal){
      winner = ["You won coffee!", "You won tea!", "You won espresso!"][sp[0]];
    }

    //Render 
    return (
      <div>
        <div className="machine row">
          <Slots slotPositions={this.state.slotPositions} />
          <div className="spin row">
            <SpinButton onButtonClick={this.handleButtonClick} />
          </div>
        </div>
        <div className="win row">
          <StatusMessage winner={winner} />
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
    return (
      <div className="col-md-12">
        {this.props.winner}
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