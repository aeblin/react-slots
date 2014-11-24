// The SlotMachine React class handles the entirety of this very small app.
var SlotMachine = React.createClass({

  // Generates random landing values for slots using genSlotValue defined at the end of the file
  getRandomState: function() {
    return [genSlotValue(), genSlotValue(), genSlotValue()];
  },

  // Generates random initial state for slots.
  getInitialState: function() {
    return {slotPositions: this.getRandomState()};
  },

  handleButtonClick: function() {
    // Set count to 0 before each button press
    var count = 0;
    // Set a random state as the final state of all slots before we start spinning
    var finalState = this.getRandomState();
    // Make sure we start with a fresh state for all slots on each spin
    var currentState = this.getRandomState();
    // Spinning happens here
    var makeSpin = function(){
      var nextState = currentState;
      var hasChanged = false;

      // Evaluate whether or not slots are on their final destination, spin to nextState if not
      for(var i = 0; i < 3; i++){
        if (count < 9 || currentState[i] != finalState[i]) {
          nextState[i] = (currentState[i]+1)%3;
          hasChanged = true;
          $('.spin-button').prop('disabled', true).text("Spinning!").addClass("spinning");
        }
        //Re-enable spin button
        if (count >= 9){
          $('.spin-button').prop('disabled', false).text("Spin!").removeClass("spinning");
        }
      }

      // Moves reel to the next assigned state if it's not yet on it's final value.
      this.setState({slotPositions: nextState, isFinal: !hasChanged})

      // Stops reel spinning if we've hit the final state's value
      if(!hasChanged) {
        return; 
      }
      currentState = this.state.slotPositions;
      setTimeout(makeSpin, 100); 
      count++; 
    }.bind(this);


    // Actually spin
    makeSpin();
  },
  render: function() {

    // Define winning states
    var sp = this.state.slotPositions;
    var isWinning = (sp[0] == sp[1]) && (sp[1] == sp[2]);

    // Make sure winner, winnerClass, and winnerImage strings are undefined until there's an actual win
    var winner = ""; 
    var winnerClass = "";
    var winnerImage = "";

    // Make sure we're only displaying the win state on final slot positions
    if(isWinning && this.state.isFinal){
      winner = [<h2>You've won a cup of coffee!</h2>, <h2>You've won a cup of tea!</h2>, <h2>You've won an espresso!</h2>][sp[0]];
      winnerClass = [" coffee", " tea", " espresso"][sp[0]];
      winnerImage = [<div id="coffee-img" className="tossing win-img"></div>, <div id="tea-img" className="tossing win-img"></div>, <div id="espresso-img" className="tossing win-img"></div>][sp[0]];
    }

    // Render Machine
    return (
      <main className="react-slots">
        <section className="machine">
          <Slots slotPositions={this.state.slotPositions} />
          <div className="spin row">
            <SpinButton onButtonClick={this.handleButtonClick} />
          </div>
        </section>
        <section className="win row">
          <StatusMessage winner={winner} winnerClass={winnerClass} winnerImage={winnerImage} />
        </section>
      </main>
    );
  }
});

// The Slot React class 
var Slot = React.createClass({
  render: function() {
    return (
      <div className="col-md-4">
        <div className="slot-reel"> 
          <div className={"slot slot-"+this.props.slotIndex+" position-"+this.props.slotPositions}>
          </div>
        </div>
      </div>
    );
  }
}) 

// Slots contains multiple instances of the Slot react class 
// (For this implementation there should be 3)
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

// Creates Spin Button
var SpinButton = React.createClass({
  handleClick: function(event){
    this.props.onButtonClick();
  },
  render: function(){
    return (
      <div className="col-md-4 col-md-offset-4">
        <button className="spin-button" onClick={this.handleClick}>Spin!</button>
      </div>
    );
  }
})

// StatusMessage is where success messages are output
var StatusMessage = React.createClass({
  render: function(){
    return (
      <div className={"row" + this.props.winnerClass}>
        <div className="col-md-12">
          {this.props.winner}
        </div>
        <div className="col-md-12">
          {this.props.winnerImage}
        </div>
      </div>
    )
  }
})

React.render(
  <SlotMachine />,
  document.getElementById('content')
);

// Generates a random slot value.
function genSlotValue(){
  return Math.floor(Math.random() * 3);
}