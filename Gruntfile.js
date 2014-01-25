module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		options: {

			dist: 'dist',
			src: 'src',
			tmp: 'tmp',

			less: {
				src: '<%= options.src %>/less',
				dist: '<%= options.css.src %>/styles.css',
				file: '<%= options.less.src %>/styles.less'
			},

			css: {
				src: '<%= options.src %>/css',
				dist: '<%= options.dist %>/css',
				files: ['<%= options.css.src %>/**/*.css'],
				concat: '<%= options.tmp %>/concat.css',
				min: '<%= options.css.dist %>/app.min.css',
				legacssy: '<%= options.css.dist %>/app.ie.css'
			},

			svg: {
				src: '<%= options.src %>/img/svg',
				dist: '<%= options.dist %>/img/sprites',
				files: ['<%= options.svg.src %>/**/*.svg'],
				css: '<%= options.css.src %>'
			},

		},

		clean: {
			css: {
				src: '<%= options.css.dist %>'
			},
			svg: {
				src: ['<%= options.svg.dist %>', '<%= options.css.src %>/*-sprites.css']
			},
			tmp: {
				src: '<%= options.tmp %>'
			}
		},

		less: {
			main: {
				options: {
					yuicompress: true,
					ieCompat: true
				},
				files: {
					'<%= options.less.dist %>': '<%= options.less.file %>'
				}
			}
		},

		concat: {
			css: {
				files: {
					'<%= options.css.concat %>' : ['<%= options.css.files %>']
				}
			}
		},

		cssmin: {
			minify: {
				src: '<%= options.css.concat %>',
				dest: '<%= options.css.min %>'
			}
		},

		'svg-sprites': {
			options: {
				spriteElementPath: '<%= options.svg.src %>',
				spritePath: '<%= options.svg.dist %>',
				cssPath: '<%= options.svg.css %>'
			},

			/*
			icons: {
				options: {
					sizes: {
						large: 30,
						medium: 25,
						small: 20
					},
					refSize: 30
				}
			},
			files: {
				options: {
					sizes: {
						large: 75,
						medium: 60,
						small: 45
					},
					refSize: 75
				}
			}
			*/
		
		},

		legacssy: {
			options: {
				legacyWidth: 1025
			},
			ie8: {
				files: {
					'<%= options.css.legacssy %>': ['<%= options.css.min %>'],
				}
			}
		},

		watch: {
			svg: {
				files: ['<%= options.svg.files %>'],
				tasks: ['svg']
			},
			less: {
				files: ['<%= options.less.file %>'],
				tasks: ['less']
			},
			css: {
				files: ['<%= options.css.files %>'],
				tasks: ['css']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('dr-grunt-svg-sprites');
	grunt.loadNpmTasks('grunt-legacssy');

	grunt.registerTask('default', 'watch');
	grunt.registerTask('svg', ['clean:svg', 'svg-sprites']);
	grunt.registerTask('css', ['clean:css', 'concat:css', 'cssmin', 'legacssy', 'clean:tmp']);
}