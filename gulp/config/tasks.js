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
    },
    {
      src: ['src/structures/manifest.js' ],
      dest: 'dist/modules',
      name: 'structures.js',
      watch: 'process-structures',
      module: 'structures',
      transform: ['babelify'],
      extensions: ['.js'],
      standalone: 'structures'
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