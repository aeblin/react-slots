//This is the container for the slot machine (probably only one of these)
var SlotMachine = React.createClass({
  getInitialState: function() {
    return {slotPosition: [1,2,3]};
  },
  handleButtonClick: function() {
    function genSlotValue(){
      return Math.floor(Math.random() * (4 - 1)) + 1;
    }
    this.setState({slotPosition: [genSlotValue(), genSlotValue(), genSlotValue() ]})
  },
  render: function() {
    return (
      <div className="machine row">
        <Slots slotPosition={this.state.slotPosition} />
        <PlayButton onButtonClick={this.handleButtonClick} />
      </div>
    );
  }
});
//This is the container for each slot (there should be 3).
var Slots = React.createClass({
  render: function() {
    return (
      <div className="slot-container row">
        <Slot className="slot-one" slotPosition={this.props.slotPosition[0]} />
        <Slot className="slot-two" slotPosition={this.props.slotPosition[1]} />
        <Slot className="slot-three" slotPosition={this.props.slotPosition[2]} />
      </div>
    );
  }
});
var Slot = React.createClass({
  render: function() {
    return (
      <div className="slot-individual col-md-4">
        {this.props.slotPosition}
      </div>
    );
  }
}) 
var PlayButton = React.createClass({
  handleClick: function(event){
    this.props.onButtonClick();
  },
  render: function(){
    return (
      <div className="play-button" onClick={this.handleClick} >
        Play!
      </div>
    );
  }
})
React.render(
  <SlotMachine />,
  document.getElementById('content')
);