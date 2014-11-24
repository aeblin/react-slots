//This is the container for the slot machine (probably only one of these)
var SlotMachine = React.createClass({
  getInitialState: function() {
    return {slotPosition: [0,1,2]};
  },
  handleButtonClick: function() {
    function genSlotValue(){
      return Math.floor(Math.random() * (3));
    }
    //Set count to 0 before each button press
    var count = 0;
    var makeSpin = function(){
      this.setState({slotPosition: [genSlotValue(), genSlotValue(), genSlotValue() ]})
      //Spin 10 times
      if(count < 10) { setTimeout(makeSpin, 250); count++; }
    }.bind(this);
    //Actually spin
    makeSpin();
  },
  render: function() {
    //Define winning states
    var sp = this.state.slotPosition;
    var isWinning = (sp[0] == sp[1]) && (sp[1] == sp[2]);
    var winner = ""; 
    if(isWinning){
      winner = ["You won coffee!", "You won tea!", "You won espresso!"][sp[0]];
    }

    //Render 
    return (
      <div>
        <div className="machine row">
          <Slots slotPosition={this.state.slotPosition} />
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
        <Slot slotIndex="one" slotPosition={this.props.slotPosition[0]} />
        <Slot slotIndex="two" slotPosition={this.props.slotPosition[1]} />
        <Slot slotIndex="three" slotPosition={this.props.slotPosition[2]} />
      </div>
    );
  }
});
//Creates each slot
//Make h2 an image 
var Slot = React.createClass({
  render: function() {
    return (
      <div className="col-xs-4">
        <div className="slot-reel"> 
          <div className={"slot slot-"+this.props.slotIndex+" position-"+this.props.slotPosition}>
            <div className="slide-one">
            </div>
            <div className="slide-two">
            </div>
            <div className="slide-three">
            </div>
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