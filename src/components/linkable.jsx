var Deps = require('../structures/manifest'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    DragSource = require('react-dnd').DragSource;

const ItemTypes = {
  LINKABLE: 'linkable'
};

var circleSource = {
  beginDrag: function (props) {
    return {
      x: props.coordinates.x,
      y: props.coordinates.y
    };
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var Linkable = React.createClass({
  getInitialState: function() {
    var circle = {
      coordinates: {
        // x: this.props.x,
        // y: this.props.y,
        // r: this.props.r
        x: "50",
        y: "50",
        r: "50"
      },

      // color: this.props.color
      color: "blue"
    };

    return {circle: circle};
  },

  render: function() {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;
    var coordinates = this.props.coordinates;

    return connectDragSource(
      <circle cx={50} cy={50} r={50} fill={"blue"} style={{
              opacity: isDragging ? 0.5 : 1,
              fontSize: 25,
              fontWeight: 'bold',
              cursor: 'move'
      }}>
        ♘
      </circle>

      // <circle cx={this.state.circle.coordinates.x} cy={this.state.circle.coordinates.y} 
      // r={this.state.circle.coordinates.r} style={this.setStyle(isDragging)} stroke="black" strokeWidth="1" fill={this.state.circle.color} />
    );
  },
  setStyle: function(drag){
    return{
      opacity: drag ? 0.5 : 1
    }
  }

});


module.exports = DragSource(ItemTypes.LINKABLE, circleSource, collect)(Linkable);

// Deps.ReactDOM.render( <Linkable x={"50"} y={"50"} r={"50"} color={"blue"}></Linkable>,
//   document.getElementById( "game" ));




