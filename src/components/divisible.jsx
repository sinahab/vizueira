var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../structures/tree')

var Divisible = React.createClass({
  getInitialState: function(){
    return { size: this.props.size }
  },

  render: function(){
    return <rect onClick={this.handleClick} x="0" y="0" width={ this.state.size }height={this.state.size} />
  },

  shouldComponentUpdate: function() {
    console.log("rendering halves");
    this.renderOtherHalf();
    return(true);
  },

  handleClick: function(event) {
    this.setState({ size: this.state.size / 2 })
  },

  renderOtherHalf: function() {
    return <Divisible size={this.state.size}></Divisible>
  }
});

ReactDOM.render( <Divisible size={100}></Divisible>,
  document.getElementById( "game" ));
