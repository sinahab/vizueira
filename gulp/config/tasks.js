module.exports = {
  js: [
    {
      src: [ 'src/components/*.jsx' ],
      dest: 'dist/modules',
      name: 'components.js',
      watch: 'process-components',
      module: 'components'
    }
  ],
  karma: {
  	concat: 'dist/vizueira.concat.js',
  	tests: 'spec/**/*.js',
  	config: '/gulp/config/karma.conf.js'
  },
  concat: {
  	src: 'dist/modules/*.js',
  	dest: 'dist', 
  	name: 'vizueira.concat.js'
  }
}