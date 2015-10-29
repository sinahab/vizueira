var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../structures/tree')

var Divisible = React.createClass({
  getInitialState: function(){
    var cellStructure = new Tree( this.props.divisions, 1 );
    cellStructure.root = { 
      coords: {
        x: 0,
        y: 0
      },
      dimensions: {
        width: this.props.size,
        height: this.props.size
      },
      level: 0, 
      n: 0, 
      shouldRender: true }
    return { cells: cellStructure, divisions: this.props.divisions }
  },

  render: function(){
    return (<g>
            {this.state.cells.map( function( cell, index ){
              if( cell !== undefined && cell.shouldRender ){
                return this.renderCell( cell, index )
              }
            }, this)
          }</g>)
  },
  createChildren: function( cell ){
    this.state.cells.goTo( cell.n, cell.level )
    this.state.cells.children = this.divide.call( this.state.cells.node )
    this.state.cells.node.shouldRender = false;
    this.state.cells.root
    return this.state.cells
  },
  divide: function() {
    let children = [];    
    let current = this.state.cells.node;
    let space = this.determineSpace( current ); 
    for( var i = 0; i< this.state.divisions; i++ ){
      children.push({ 
        dimensions: space[i].dimensions,
        level: current.level + 1, 
        n: this.state.cells.firstChildNode + i,
        coords: space[ i ].coords,
        shouldRender: true
      })
    }  
    return children  

  },
  determineSpace: function( cell ) {
    let startingX = cell.coords.x,
        startingY = cell.coords.y,
        startingWidth = cell.dimensions.width,
        startingHeight = cell.dimensions.height,
        mod = 1.0 / this.state.divisions;

    let modifications = this.determineMods(),
        returned = [];

    let modX = startingWidth * (mod * modifications[0]),
        modY = startingHeight * (mod * modifications[1]),
        modWidth = startingWidth * (1.0 - (mod * modifications[0]) ),
        modHeight = startingHeight * (1.0 - (mod * modifications[1]) );
        console.log(modWidth)
        console.log(modHeight)
    for( var i = 0; i< this.state.divisions; i++ ){
      returned.push({
        coords: {
          x: startingX + (i * modX),
          y: startingY + (i * modY)
        },
        dimensions: {
          width: modWidth,
          height: modHeight
        }
      })
    }
    console.log(returned)
    return returned

  },
  determineMods: function(){
    let seed = Math.random(),
        returned = [];
        returned[0] = seed > 0.5 ? 1 : 0;
        returned[1] = 1 - returned[0];
    return returned;
  },
  handleClick: function( cell ) {
    this.setState({ cells: this.createChildren( cell ) })
  },
  renderCell: function( cell ){
    return <rect onClick={this.handleClick.bind(this, cell )} x={cell.coords.x} y={cell.coords.y} width={cell.dimensions.width} height={cell.dimensions.height} fill="white" stroke="blue" strokeWidth="1" key={ cell.level + '' + cell.n } />
  }
});
ReactDOM.render( <Divisible size={100} divisions={2}></Divisible>,
  document.getElementById( "game" ));
module.exports = 'test'