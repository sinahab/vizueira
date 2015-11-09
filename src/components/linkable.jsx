var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('basic-tree')
var Random = require('random-set')
var Color = require('../structures/color')

var Linkable = React.createClass({
  getInitialState: function() {
    var circles = new Array();

    circles.push({
      coordinates: {
        x: "50",
        y: "50",
        r: "50"
      },

      color: "red"
    });

    circles.push({
      coordinates: {
        x: "100",
        y: "100",
        r: "20"
      },

      color: "blue"
    });

    return {circles: circles};
  },

  render: function() {
    return ( 
      <g> { 
        this.state.circles.map(function(circle) {
          return (
            <circle cx={circle.coordinates.x} cy={circle.coordinates.y} r={circle.coordinates.r} stroke="black" strokeWidth="1" fill={circle.color} />
          );
        })
      } </g>
    )
  },

  handleClick: function() {
    createFirework(64,59,4,2,null,null,null,null,false,true);
  }

});

var Divisible = require('./divisible.jsx')

ReactDOM.render( <Divisible width={300} height={600} divisions={2}></Divisible>,
  document.getElementById( "game" ));



