var env              = require( '../config/tasks' ).karma,
		gulp             = require( 'gulp' ),
		karma            = require( 'karma' ),
		sysNotifier      = require( '../util/sysNotifier' ),
		karmaParseConfig = require( 'karma/lib/config' ).parseConfig;

function runKarma( options, done ) {
	var configFilePath = process.cwd() + env.config;
	var config = karmaParseConfig( configFilePath, {} );

    Object.keys( options ).forEach( function( key ) {
    	if( key === 'files' ){
    		config[ key ].push( options[ key ] );
    	}else{
	      config[ key ] = options[ key ];
    	}
    });

  var server = new karma.Server( config, done );
  server.start();
}

function processFile( file ){
	var added = file || '*';
			added += '.js';
	var suite = env.tests + added;
	return suite;
}

gulp.task( 'karma', function(){
	runKarma({ files: processFile() }, sysNotifier );
});

module.exports = runKarma;