'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),
    configsample: grunt.file.readJSON('config.json.sample'),
		app: 'app',
		dist: 'dist',
		tmp: '.tmp',

		sass: {
			options: {
				includePaths: ['<%= app %>/bower_components/foundation/scss'],
        indentedSyntax: true
			},
			dist: {
        options: {
          outputStyle: 'extended',
          sourceMap: true
        },
				files: {
          '<%= dist %>/css/app.css': '<%= app %>/scss/app.sass'
				}
			},
      publish: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
				files: {
          '<%= dist %>/css/app.css': '<%= app %>/scss/app.sass'
				}
			}
		},

		jade: {
			dist: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%= app %>/views',
					src: '**/*.jade',
					ext: '.html',
					dest: '<%= dist %>/'
				}]
			},
      publish: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%= tmp %>/concat/views',
					src: '**/*.jade',
					ext: '.html',
					dest: '<%= dist %>/'
				}]
      }
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= dist %>/js/**/*.js'
			]
		},

		clean: {
      dist: {
        src: ['<%= dist %>/*']
      },
      tmp: {
        src: ['<%= tmp %>/*']
      },
		},
		copy: {
      views: { // Copy the views to the temp directory
        files: [{
					expand: true,
          cwd:'<%= app %>/views',
          src: '**/*.jade',
          dest: '<%= tmp %>/concat/views/'
        }]
      },
      tmp: { //Copy all of the jade files to the temp directory
        files: [{
					expand: true,
          cwd:'<%= app %>/queries',
          src: '**/*',
          dest: '<%= tmp %>/concat/queries/'
        }, {
					expand: true,
          cwd:'<%= app %>/includes',
          src: '**/*.jade',
          dest: '<%= tmp %>/concat/includes/'
        }, {
					expand: true,
          cwd:'<%= app %>/js',
          src: ['**/*.js', '!app.js'],
          dest: '<%= tmp %>/js/'
        }, {
					expand: true,
          cwd:'<%= app %>/bower_components/font-awesome/fonts',
          src: ['**/*'],
          dest: '<%= tmp %>/fonts/'
        }]
      },
      publish: { //Copy the assets from temp to the distribution directory
        files: [{
					expand: true,
          cwd:'<%= tmp %>/queries',
          src: '**/*',
          dest: '<%= dist %>/queries/'
        }, {
					expand: true,
          cwd:'<%= tmp %>/js',
          src: ['**/*', '!*.map'],
          dest: '<%= dist %>/js/'
        }, {
					expand: true,
          cwd:'<%= tmp %>/css',
          src: ['**/*.min.css', '!*.map'],
          dest: '<%= dist %>/css/'
        }, {
					expand: true,
          cwd:'<%= tmp %>/fonts',
          src: '**/*',
          dest: '<%= dist %>/fonts/'
        }, {
					expand: true,
          cwd:'data',
          src: '**/*.zip',
          dest: '<%= dist %>/data/'
        }, {
					expand: true,
          cwd:'./',
          src: 'README.md',
          dest: '<%= dist %>/'
        }]
      },
			dist: { //Copy the assets to the dist directory to work in development
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!**/*.jade', '**/*.txt', 'js/*.js', 'bower_components/**'],
					dest: '<%= dist %>/'
				} , {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png,ico}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

    replace: {
      build: {
        src: ['<%= dist %>/**/*.html'],
        overwrite: true, // overwrite matched source files
        replacements: [{
          from: "//endpoint//",
          to: "<%= configsample.endpoint %>"
        }, {
          from: ".tmp/",
          to: ""
        }]
      },
      watch: {
        src: ['<%= dist %>/**/*.html'],
        overwrite: true, // overwrite matched source files
        replacements: [{
          from: "//endpoint//",
          to: "<%= config.endpoint %>"
        }, {
          from: ".tmp/",
          to: ""
        }]
      }
    },

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= dist %>/index.html'],
			// html: ['<%= app %>/includes/header.jade'], broken
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			// html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			html: ['<%= dist %>/**/*.html'],
			css: ['<%= dist %>/css/**/*.css'],
			// css: ['<%= dist %>/css/**/*.css', '.tmp/concat/css/libraries.min.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

    jadeUsemin: {
      publish: {
        options: {
          tasks: {
            js: ['concat', 'uglify'],
            css: ['concat', 'cssmin']
          }
        },
        files: [{
          src: '<%= app %>/includes/header.jade',
          dest: '<%= tmp %>/concat/includes/header.jade'
        }, {
          src: '<%= app %>/includes/footer.jade',
          dest: '<%= tmp %>/concat/includes/footer.jade'
        }]
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass:dist', 'jade:dist', 'copy:dist']
      },
      sass: {
        files: ['<%= app %>/scss/**/*.scss', '<%= app %>/scss/**/*.sass'],
        tasks: ['sass']
      },
      jade: {
        files: ['<%= app %>/views/**/*.jade', '<%= app %>/includes/**/*.jade'],
        tasks: ['jade:dist', 'replace:watch']
      },
      js: {
        files: '<%= app %>/js/**/*.js',
        tasks: ['copy:dist', 'replace:watch']
      },
      livereload: {
        files: '<%= dist %>/**/*',
        options: {
          livereload: true
        }
      }
    },

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= dist %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.jade'
				],
				exclude: [
					'modernizr',
					'font-awesome',
					'jquery-placeholder',
					'foundation'
				]
			}
		}

	});

  // Grunt Tasks
  grunt.loadNpmTasks('grunt-text-replace');
	grunt.registerTask('bower-install', ['wiredep']);
	grunt.registerTask('replace-text', ['replace:watch']);

  // Custom Tasks
	grunt.registerTask('default', ['clean:dist', 'sass:dist', 'copy:dist', 'jade:dist', 'imagemin', 'replace:watch', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
  // skip JS tests  'validate-js',
	grunt.registerTask('publish', ['clean:dist', 'clean:tmp', 'sass:publish', 'copy:tmp', 'copy:views', 'jadeUsemin:publish', 'jade:publish', 'copy:publish', 'newer:imagemin', 'concat', 'cssmin', 'replace:build', 'uglify', 'usemin']);

};
