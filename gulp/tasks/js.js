'use strict';
var gulp       = require( 'gulp' ),
		config     = require( '../config/tasks' ).js,
		babel      = require( 'gulp-babel' ),
		concat     = require( 'gulp-concat' );


gulp.task( 'js', function() {
    for( var i = 0; i< config.length; i++ ){
      gulp.src( config[i].src ) 
      .pipe( babel() )
      .pipe( concat( config[i].name ) )
      .pipe( gulp.dest( config[i].dest ) );
    }
    return
});
