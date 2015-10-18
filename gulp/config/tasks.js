module.exports = {
  js: [
    {
      src: [ 'src/**/*.js' ],
      dest: './dist/',
      name: 'vizueira.concat.js',
      watch: 'process-vizueira',
      module: 'vizueira'
    }
  ],
  karma: {
  	concat: 'dist/vizueira.concat.js',
  	tests: 'spec/**/*.js',
  	config: '/gulp/config/karma.conf.js'
  }
}