var React = require('react');

var ProgressCircle = React.createClass({
	render: function(){
		return  <div style={ this.divStyles(this.props.size) } >
              <svg height={ this.props.size } width={ this.props.size } >
                <g>
                  <circle {...this.circleSize(this.props)} stroke="#eceff1" fill="none"></circle>
                  <circle {...this.circleSize(this.props)} transform={'rotate( -90 '+ this.props.size / 2 +' '+ this.props.size / 2 +')'} style={this.circleStyles(this.props) }></circle>
                  <polyline points={this.checkPoints(this.props.size)} style={this.checkStyles(this.props)} />
                </g>
              </svg>
              { this.props.children }
              { this.printImage(this.props) }
            </div>;
	},
	circleSize: function( args ){
		var returned = {};
			  returned['r'] = (args.size - this.borderSize(args.size)) / 2;
        returned['cx'] = args.size / 2;
        returned['cy'] = args.size / 2;
        returned['strokeWidth'] = this.borderSize(args.size);
    return returned;
	},
  divStyles: function( size ) {
    return {
      height: size,
      width: size,
      display: 'block',
      position: 'relative',
      margin: 'auto'
    }
  },
  borderSize: function(size){
    return size * 0.066;
  },
  dashSize: function(size){
    return size * 2.93
  },
  circleStyles: function( props ){
    return {
      strokeDasharray: this.dashSize(props.size),
      strokeDashoffset:  this.dashSize(props.size) - (this.dashSize(props.size) * Math.min(props.percent/100, 1)),
      stroke: this.chooseColor(props),
      transition: 'all .4s',
      fill: props.background || "none"
    }
  },
  imgStyles: function( props ) {
    return {
      height: (props.size - this.borderSize(props.size)- this.borderSize(props.size)),
      width: (props.size - this.borderSize(props.size) ),
      borderRadius: '50%',
      position: 'absolute',
      margin: 'auto',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0'
    }
  },
  chooseColor: function( props ) {
    if ( typeof props.color === "string" ){
      return props.color
    }
    if ( props.percent >= 100 ) {
      return props.color.completed
    }
    return props.color.inProgress
  },
  showCheckbox: function( props ) {
    if ( props.hasCheck && props.percent >= 100 ) {
      return "block"
    }
    return "none"
  },
  checkStyles: function( props ){
    return {
      stroke: this.chooseColor(props),
      strokeWidth: this.borderSize(props.size),
      fill: "none",
      display: this.showCheckbox(props)
    }
  },
  checkPoints: function( size ){
    var initialPoints = [
      [25.5,46.5],
      [43.1,64.4],
      [72.8,34.2] ]
    var modification = size / 100;
    var finalPoints = initialPoints.map( function( coords ){
     return coords.map( function( coord ){
       return (coord * modification).toFixed(2)
     }).join(',')
    }).join(' ')
    return finalPoints
  },
  printImage: function( props ){
    if( props.src){
      return <img src={props.src} style={this.imgStyles(props)} />
    }
    return
  }
})

module.exports = ProgressCircle
