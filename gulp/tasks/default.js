var gulp   = require( 'gulp' ),
    config = require( '../config/tasks' );


gulp.task( 'default', function() {
    gulp.start( 'groups' );
    gulp.start( 'karma' );
});