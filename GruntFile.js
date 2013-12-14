/** Task Runner **/

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    jshint: {
        // define the files to lint
        files: ['gruntfile.js', 'src/**/*.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          // more options here if you want to override JSHint defaults
            globals: {
                jQuery: true,
                console: true,
                module: true
            }
        }
    }, 
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          env: {
            PORT: '8080'
          }
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['jshint']);

};