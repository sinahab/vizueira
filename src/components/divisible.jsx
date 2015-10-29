var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../structures/tree')

var Divisible = React.createClass({
  getInitialState: function(){
    var cellStructure = new Tree( this.props.divisions, 1 );
    cellStructure.root = { size: this.props.size, level: 0, n: 0 }
    return { cells: cellStructure, divisions: this.props.divisions }
  },

  render: function(){
    return (<g>
            {this.state.cells.depthTraversalCall( function(arg){this.renderCell(arg)}.bind(this) )}
            { console.log(this.state.cells)}
            {this.state.cells.map( function( cell, index ){
              if( cell !== undefined ){
                return this.renderCell( cell, index )
              }
            }, this)
          }</g>)
  },
  createChildren: function( cell ){
    let children = [];
    let n = cell.n
    let level = cell.level;

    this.state.cells.goTo( n, level )

    let size = this.state.cells.node.size / this.state.divisions;
    for( var i = 0; i< this.state.divisions; i++ ){
      children.push({ size: size, level: level + 1, n: this.state.cells.firstChildNode + i })
    }
    this.state.cells.children = children
    this.state.cells.root
    return this.state.cells
  },
  handleClick: function(cell) {
    this.setState({ cells: this.createChildren( cell ) })
  },
  renderCell: function( cell ){
    return <rect onClick={this.handleClick.bind(this, cell )} x={0} y={0} width={cell.size} height={cell.size} fill="white" stroke="blue" strokeWidth="1" key={ cell.level + '' + cell.n } />
  }
});
ReactDOM.render( <Divisible size={100} divisions={2}></Divisible>,
  document.getElementById( "game" ));
module.exports = 'test'