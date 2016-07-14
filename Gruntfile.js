// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    bower_concat: {
      all: {
        dest: {
          js: 'src/js/_bower.js',
          css: 'src/css/_bower.css',
          less: 'src/less/_bower.less',
          sass: 'src/sass/_bower.sass',
        },
        bowerOptions: {
          relative: false
        },
        mainFiles: {
          bootstrap: ['dist/css/bootstrap.min.css', 'dist/css/bootstrap-theme.min.css']
        }
      }
    },

    wiredep: {
      target: {
        src: 'src/index.html' // point to your HTML file.
      }
    },

    sass: {
      dist: {
        files: {
          'src/css/assemblies.css': 'src/sass/assemblies.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'src/css/assemblies.min.css': 'src/css/assemblies.css',
          'src/css/_bower.min.css': 'src/css/_bower.css'
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'src/js/_bower.min.js': 'src/js/_bower.js'
        }
      }
    },

    watch: {
      // for stylesheets, watch css and less files 
      // only run less and cssmin 
      stylesheets: { 
        files: ['src/sass/assemblies.scss', 'src/sass/components/*.scss', 'bower.json', 'package.json'], 
        tasks: ['wiredep', 'sass'] 
      }
    }
  });

  grunt.registerTask('production', ['bower_concat', 'sass', 'cssmin', 'uglify']);
  grunt.registerTask('dev', ['wiredep', 'sass']);


  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

};