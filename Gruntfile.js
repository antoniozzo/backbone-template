module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		options: {

			publish: 'app',
			assets: '<%= options.publish %>',

			clean: {
				css: ['<%= options.css.min %>', '<%= options.css.legacssy %>'],
				tmp: ['<%= options.css.concat %>', '<%= options.css.base %>/styles.css', '<%= options.css.base %>/**/*-sprites.css']
			},

			css: {
				base: '<%= options.assets %>/css',
				files: ['<%= options.css.base %>/**/*.css'],
				concat: '<%= options.css.base %>/concat.css',
				min: '<%= options.css.base %>/app.min.css',
				legacssy: '<%= options.css.base %>/app.ie.css'
			},

			less: {
				base: '<%= options.assets %>/less',
				file: '<%= options.less.base %>/styles.less',
				compiled: '<%= options.css.base %>/styles.css'
			},

			svg: {
				dir: '<%= options.assets %>/img/svg',
				files: ['<%= options.svg.dir %>/**/*.svg'],
				min: '<%= options.assets %>/img/sprites',
				css: '<%= options.css.base %>'
			}
		},

		clean: {
			css: {
				src: '<%= options.clean.css %>'
			},
			tmp: {
				src: '<%= options.clean.tmp %>'
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

		less: {
			main: {
				options: {
					yuicompress: true,
					ieCompat: true
				},
				files: {
					'<%= options.less.compiled %>': '<%= options.less.file %>'
				}
			}
		},

		'svg-sprites': {
			options: {
				spriteElementPath: '<%= options.svg.dir %>',
				spritePath: '<%= options.svg.min %>',
				cssPath: '<%= options.svg.css %>'
			},
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
			css: {
				files: ['<%= options.less.base %>/*.less', '!<%= options.less.compiled %>', '!<%= options.css.concat %>'],
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
	grunt.registerTask('svg', ['clean:css', 'svg-sprites', 'concat:css', 'cssmin', 'legacssy', 'clean:tmp']);
	grunt.registerTask('css', ['clean:css', 'less', 'concat:css', 'cssmin', 'legacssy', 'clean:tmp']);
}