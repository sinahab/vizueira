'use strict';
var gulp       = require( 'gulp' ),
		config     = require( '../config/tasks' ).js,
		browserify = require( 'gulp-browserify' ),
		concat     = require( 'gulp-concat' );


gulp.task( 'js', function() {
    for( var i = 0; i< config.length; i++ ){
      gulp.src( config[i].src ) 
      .pipe(browserify({
        transform: ['reactify', 'babelify'],
        extensions: ['.js', '.jsx']
      }))
      .pipe( concat( config[i].name ) )
      .pipe( gulp.dest( config[i].dest ) );
    }
    return
});