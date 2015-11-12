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
    console.log(pos)
    // console.log(e.pageX - pos.x)
    // console.log(e.pageY - pos.y)  
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
    // dx = evt.clientX - currentX;
    // dy = evt.clientY - currentY;
    // currentMatrix[4] += dx;
    // currentMatrix[5] += dy;
    // newMatrix = "matrix(" + currentMatrix.join(' ') + ")";

    // selectedElement.setAttributeNS(null, "transform", newMatrix);
    // currentX = evt.clientX;
    // currentY = evt.clientY;
console.log(this.state.rel.x)
console.log(this.state.rel.y)
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
// var currentX = 0;
//   var currentY = 0;
//   var currentMatrix = 0;

 

//   function selectElement(evt) {
//     selectedElement = evt.target;
//     currentX = evt.clientX;
//     currentY = evt.clientY;
// currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

//       for(var i=0; i<currentMatrix.length; i++) {
//         currentMatrix[i] = parseFloat(currentMatrix[i]);
//       }
//     selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
//   }


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






// var Draggable = React.createClass({
  // getDefaultProps: function () {
  //   return {
  //     // allow the initial position to be passed in as a prop
  //     initialPos: {x: 0, y: 0}
  //   }
  // },
  // getInitialState: function () {
  //   return {
  //     pos: this.props.initialPos,
  //     dragging: false,
  //     rel: null // position relative to the cursor
  //   }
  // },
  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  // componentDidUpdate: function (props, state) {
  //   if (this.state.dragging && !state.dragging) {
  //     document.addEventListener('mousemove', this.onMouseMove)
  //     document.addEventListener('mouseup', this.onMouseUp)
  //   } else if (!this.state.dragging && state.dragging) {
  //     document.removeEventListener('mousemove', this.onMouseMove)
  //     document.removeEventListener('mouseup', this.onMouseUp)
  //   }
  // },

  // calculate relative position to the mouse and set dragging=true
  // onMouseDown: function (e) {
  //   // only left mouse button
  //   if (e.button !== 0) return
  //   var pos = $(this.getDOMNode()).offset()
  //   this.setState({
  //     dragging: true,
  //     rel: {
  //       x: e.pageX - pos.left,
  //       y: e.pageY - pos.top
  //     }
  //   })
  //   e.stopPropagation()
  //   e.preventDefault()
  // },
  // onMouseUp: function (e) {
  //   this.setState({dragging: false})
  //   e.stopPropagation()
  //   e.preventDefault()
  // },
  // onMouseMove: function (e) {
  //   if (!this.state.dragging) return
  //   this.setState({
  //     pos: {
  //       x: e.pageX - this.state.rel.x,
  //       y: e.pageY - this.state.rel.y
  //     }
  //   })
  //   e.stopPropagation()
  //   e.preventDefault()
  // },
  // render: function () {
  //   // transferPropsTo will merge style & other props passed into our
  //   // component to also be on the child DIV.
  //   return this.transferPropsTo(React.DOM.div({
  //     onMouseDown: this.onMouseDown,
  //     style: {
  //       left: this.state.pos.x + 'px',
  //       top: this.state.pos.y + 'px'
  //     }
  //   }, this.props.children))
  // }
// })