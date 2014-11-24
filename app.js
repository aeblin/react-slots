//This is the container for the slot machine (probably only one of these)
var SlotMachine = React.createClass({
  getInitialState: function() {
    return {slotPositions: [0,1,2]};
  },
  handleButtonClick: function() {
    function genSlotValue(){
      return Math.floor(Math.random() * (3));
    }
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
      if(count < 9 || currentState[0] != finalState[0]){
        nextState[0] = (currentState[0]+1)%3;
        hasChanged = true;
      }if(count < 9 || currentState[1] != finalState[1]){
        nextState[1] = (currentState[1]+1)%3;
        hasChanged = true;
      }if(count < 9 || currentState[2] != finalState[2]){
        nextState[2] = (currentState[2]+1)%3;
        hasChanged = true;
      }
      
      if(!hasChanged) {
        return; 
      }
      this.setState({slotPositions: nextState})
      //if(count < 10) { setTimeout(makeSpin, 250); count++; console.log(this.state.slotPositions) }

      setTimeout(makeSpin, 250); 
      count++; 
      console.log(this.state.slotPositions)
      //After (count >= 10) {this.setState({slotPositions: [()]})}
    }.bind(this);
    //Actually spin
    makeSpin();
  },
  render: function() {
    //Define winning states
    var sp = this.state.slotPositions;
    var isWinning = (sp[0] == sp[1]) && (sp[1] == sp[2]);
    var winner = ""; 
    if(isWinning){
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