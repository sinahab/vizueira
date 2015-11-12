var Deps = require('../structures/manifest'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    $ = require('jquery'),
    getXY = require('../structures/clickCoords');

var Linkable = React.createClass({
  getDefaultProps: function () {
    return {
      // allow the initial position to be passed in as a prop
      coordinates: {x: 50, y: 50, r:50},
      rel: {x:50, y:50, r:50},
      color: 'blue'
    }
  },  
  getInitialState: function() {
    return {
      coordinates: this.props.coordinates,
      color: this.props.color,
      dragging: false,
      rel: null
    }
  },
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },
  onMouseDown: function (e) {
    // only left mouse button

    if (e.button !== 0) return
    var pos = getXY(e)
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.x + (pos.x - parseInt(e.currentTarget.style.cx)),
        y: e.pageY - pos.y + (pos.y- parseInt(e.currentTarget.style.cy))
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },
  onMouseUp: function (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },
  onMouseMove: function (e) {
    if (!this.state.dragging) return
    this.setState({
      coordinates: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y,
        r: this.state.coordinates.r
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },  
  render: function() {
    return <circle id="test" style={ this.setStyle() } onMouseDown= {this.onMouseDown} ></circle>; 
  },
  setStyle: function(drag){
    return{
      cx: this.state.coordinates.x,
      cy: this.state.coordinates.y, 
      r:  this.state.coordinates.r, 
      fill: this.state.color,
      cursor: 'move'
    }
  }

});

module.exports = Linkable