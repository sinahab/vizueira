'use strict';
var gulp        = require( 'gulp' ),
    karma       = require( './karma'),
    sysNotifier = require( '../util/sysNotifier' ),
    browserify = require( 'gulp-browserify' ),
    config     = require( '../config/tasks' ).js;



gulp.task('groups', function(){
    for( var i = 0; i< config.length; i++ ){
        let taskNumber = i;
        gulp.task( config[taskNumber].watch, function() {
            gulp.src( config[taskNumber].src )  
            .pipe(browserify({
              transform: config[taskNumber].transform,
              extensions: config[taskNumber].extensions,
              standalone: config[taskNumber].standalone || false
            }))
            .pipe( gulp.dest( config[taskNumber].dest ) )
            .on('end', function(){console.log('ended')})
        });        
        gulp.watch( config[taskNumber].src, [ config[taskNumber].watch ] );  
    }
});


