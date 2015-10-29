'use strict';
var gulp        = require( 'gulp' ),
    concat      = require( 'gulp-concat' ),
    karma       = require( './karma'),
    sysNotifier = require( '../util/sysNotifier' ),
    browserify = require( 'gulp-browserify' ),
    config     = require( '../config/tasks' ).js;

function concatenate(){
    gulp.start('concat')
}

gulp.task('groups', function(){
    for( var i = 0; i< config.length; i++ ){
        let taskNumber = i;
        gulp.task( config[taskNumber].watch, function() {
            gulp.src( config[taskNumber].src )  
            .pipe(browserify({
              transform: config[taskNumber].transform,
              extensions: config[taskNumber].extensions,
              standalone: config[taskNumber].standalone || 'default'
            }))
            .pipe( concat( config[taskNumber].name ) )
            .pipe( gulp.dest( config[taskNumber].dest ) )
            .on('end', concatenate );
        });        
      gulp.watch( config[taskNumber].src, [ config[taskNumber].watch ] );  
    }
});


