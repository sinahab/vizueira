var Deps = require('../structures/manifest'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Linkable = require('./linkable'),
    DragDropContext = require('react-dnd').DragDropContext,
    HTML5Backend = require('react-dnd-html5-backend');    


var Context = React.createClass({
  getInitialState: function(){
    console.log(this.props.coordinates)
    return{ height: this.props.height || 600, width: this.props.width || 300 }
  },
  
  renderLinkable: function(){
    return <Linkable></Linkable>
  },

  render: function(){
    return <svg height={ this.state.height } width={ this.state.width } style={this.setStyle()} >
            {this.renderLinkable()}
          </svg>
  },
  setStyle: function(){
    return {
      border: '3px solid black',
      position: 'absolute', 
      top: 0,
      bottom: 0, 
      left: 0, 
      right: 0,
      margin: 'auto'
    }
  }
})

module.exports = DragDropContext(HTML5Backend)(Context);

// Deps.ReactDOM.render(<WrappedContext height="600" width="300">
//   </WrappedContext>,
//   document.getElementById('game'))