'use strict';
var gulp       = require( 'gulp' ),
		config     = require( '../config/tasks' ).concat,
		concat     = require( 'gulp-concat' );

gulp.task( 'concat', function() {
  return gulp.src( config.src )
      .pipe( concat( config.name ) )
      .pipe( gulp.dest( config.dest ) );
    
});