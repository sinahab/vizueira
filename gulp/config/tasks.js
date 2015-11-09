module.exports = {
  js: [
    {
      src: ['src/components/*.jsx' ],
      dest: 'dist/modules',
      name: 'components.js',
      watch: 'process-components',
      module: 'components',
      transform: ['reactify', 'babelify'],
      extensions: ['.js', '.jsx']
    }
  ],
  karma: {
  	concat: 'dist/vizueira.concat.js',
  	tests: 'spec/**/*.js',
  	config: '/gulp/config/karma.conf.js'
  }
}