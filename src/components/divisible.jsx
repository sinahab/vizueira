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
            {this.state.cells.map( function( cell ){
              if( cell !== undefined ){
                return this.renderCell( cell )
              }
            }, this)
          }</g>)
  },
  createChildren: function( cell ){
    this.state.cells.goTo( cell.n, cell.level )
    this.state.cells.children = this.divide.call( this.state.cells.node )
    this.state.cells.root
    return this.state.cells
  },
  divide: function() {
    let children = [];    
    let current = this.state.cells.node;
    let size = current.size / this.state.divisions;    
    for( var i = 0; i< this.state.divisions; i++ ){
      children.push({ 
        size: size, 
        level: current.level + 1, 
        n: this.state.cells.firstChildNode + i 
      })
    }  
    return children  

  },
  handleClick: function( cell ) {
    this.setState({ cells: this.createChildren( cell ) })
  },
  renderCell: function( cell ){
    return <rect onClick={this.handleClick.bind(this, cell )} x={0} y={0} width={cell.size} height={cell.size} fill="white" stroke="blue" strokeWidth="1" key={ cell.level + '' + cell.n } />
  }
});
ReactDOM.render( <Divisible size={100} divisions={2}></Divisible>,
  document.getElementById( "game" ));
module.exports = 'test'