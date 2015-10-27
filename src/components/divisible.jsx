var React = require('react');
var ReactDOM = require('react-dom');

var Divisible = React.createClass({
  getInitialState: function(){
    return { cells: 1 }
  },

  render: function(){
    console.log(this.state.cells)
    return <svg height={ this.props.size } width={ this.props.size }>
            <rect onClick={this.handleClick} x="0" y="0" width={ this.props.size } height={ this.props.size } />
           </svg>;
  },

  handleClick: function(event) {
    this.setState({ cells: this.state.cells * 2 })
  },

  renderCells: function(){
    return <rect onClick={this.handleClick} x="0" y="0" width={ this.props.size } height={ this.props.size } />
  }
});

ReactDOM.render( <Divisible size={100} ></Divisible>,
  document.getElementById( "game" ));