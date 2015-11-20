var Deps = require('../structures/manifest'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    $ = require('jquery'),
    getXY = require('../structures/clickCoords'),
    Spore = require('../structures/spore');

var Linkable = React.createClass({
  getDefaultProps: function () {
    return {
      // allow the initial position to be passed in as a prop
      coordinates: {x: 50, y: 50, r:50},
      color: 'blue'
    }
  },  
  getInitialState: function() {
    return {
      spores: new Spore({x: 50, y: 50, r:50}),
      rel: {x: 50, y: 50, r:50},
      color: this.props.color,
      dragging: false,
      key: 0,
      active: null
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
  onMouseDown: function (spore, e) {
    // only left mouse button

    if (e.button !== 0) return

    var pos = getXY(e)
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.x + (pos.x - parseInt(e.currentTarget.style.cx)),
        y: e.pageY - pos.y + (pos.y- parseInt(e.currentTarget.style.cy))
      },
      active: spore
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
      active: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y,
        r: this.state.coordinates.r
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },  

  render: function() {
    return <g>
              { 
                this.flattenSpores( this.state.spores ).map(function( spore ){
                  return spore
                 }) 
              }
            </g>
  },
  flattenSpores: function( spores ){
    var returned = [];
    console.log(spores)
    returned.push( this.createCircle( spores ) )

    for( var i = 0; i< spores.length; i++ ){
      returned.push( this.createCircle( spores[i]) )
      if( spores[i].length > 0 ){
        returned.concat( flattenSpores(spores[i]) )
      }
    }
    return returned
  },
  createCircle: function( spore ){
    this.state.key++
    return <circle id="test" key={this.state.key} style={ this.setStyle(spore) } onMouseDown={this.onMouseDown.bind(this, spore)} ></circle>; 
  },
  setStyle: function(spore){
    return{
      cx: spore.x,
      cy: spore.y, 
      r:  spore.r, 
      fill: this.state.color,
      cursor: 'move'
    }
  }

});

module.exports = Linkable