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
				outputStyle: 'extended'
			},
			dist: {
				files: {
          '<%= dist %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			},
      publish: {
				files: {
          '<%= tmp %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		jade: {
			compile: {
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
					// dest: '.tmp/dist/'
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
		},
		copy: {
      views: {
        files: [{
					expand: true,
          cwd:'<%= app %>/views',
          src: '**/*.jade',
          dest: '<%= tmp %>/concat/views/'
        }]
      },
      tmp: {
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
        }]
      },
      publish: {
        files: [{
					expand: true,
          cwd:'<%= tmp %>/queries',
          src: '**/*',
          dest: '<%= dist %>/queries/'
        }, {
					expand: true,
          cwd:'<%= tmp %>/js',
          src: '**/*',
          dest: '<%= dist %>/js/'
        }, {
					expand: true,
          cwd:'<%= tmp %>/css',
          src: '**/*',
          dest: '<%= dist %>/css/'
        }]
      },
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!**/*.jade', '**/*.txt', 'js/*.js', '!js/app.js', '!bower_components/**'],
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
      scripts: {
        options: {
          tasks: {
            js: ['concat', 'uglify'],
            css: ['concat', 'cssmin']
          },
          // replacePath: {
          //   '.tmp/': ''
          // }
        },
        files: [{
          dest: '<%= tmp %>/concat/includes/header.jade',
          src: '<%= app %>/includes/header.jade'
        }, {
          dest: '<%= tmp %>/concat/includes/footer.jade',
          src: '<%= app %>/includes/footer.jade'
        }]
      }
    },

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			jade: {
				files: '<%= app %>/views/**/*.jade',
				tasks: ['jade', 'replace']
			},
			js: {
				files: '<%= app %>/js/**/*.js',
				tasks: ['jade', 'replace']
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
	grunt.registerTask('compile-jade', ['jade']);
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	grunt.registerTask('replace-text', ['replace:watch']);

  // Custom Tasks
	grunt.registerTask('default', ['jade', 'sass', 'replace', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
  // skip JS tests  'validate-js',
	// grunt.registerTask('publish', ['clean:dist', 'jade', 'sass', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'replace:build', 'uglify', 'usemin']);
	grunt.registerTask('publish', ['clean:dist', 'sass:publish', 'copy:tmp', 'copy:views', 'jadeUsemin', 'jade:publish', 'copy:publish', 'newer:imagemin', 'concat', 'cssmin', 'replace:build', 'uglify', 'usemin']);
  //x compile sass
  //x copy the jade views, and prolly queries
  //copy scripts (compile coffee)
  //jade usemin to generate the merged scripts and styles
    // it's putting the generated files into root
  //jade to compile the jade to html (tmp -> dist)

};
