module.exports = function(grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-list-page');
    grunt.loadNpmTasks('grunt-w3c-html-validation');  


    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    base: './html',
                }
            }
        },
        includereplace: {
            dev: {
                options: {
                  globals: {
                    version: 1,
                    var2: 'two',
                    var3: 'three'
                  },
                },
                files: [
                  {
                        expand: true,
                        cwd: './tpl',
                        src: ['*.html'],
                        dest: './html/',
                        ext: '.html'
                    },
                ]
            },
            compile: {
                options: {
                  globals: {
                    version: new Date().getTime(),
                    var2: 'two',
                    var3: 'three'
                  },
                },
                files: [
                  {
                        expand: true,
                        cwd: './tpl',
                        src: ['*.html'],
                        dest: './html/',
                        ext: '.html'
                    },
                ]
            }
            
        },
        watch: {
          scripts: {
            files: ['tpl/*.html','tpl/inc/*.html'],
            tasks: ['includereplace:dev'],
            options: {
              spawn: false,
            },
          },
        },
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "css/*.css",
                        "*.html"
                    ]
                },
                options: {
                    baseDir: "./html/",
                    watchTask: true,
                    // logLevel: "debug",
                    logFileChanges: true,
                    files: "./html/**"
                }
            }
        },
        list_page: {
          default_options: {
            options: {
            },
            files: {
              'html/root.html': ['html/*.html']
            }
          }
        },
        'validation': { // Grunt w3c validation plugin
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: true,
                remotePath: '',
                doctype: 'HTML5',
                failHard: true,
                relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta.","Element title must not be empty."]
            },
            files: {
                src: ['./html/*.html']
            }
        },
    });
    grunt.registerTask('default', ['connect', 'browserSync', 'watch']);
    grunt.registerTask('build', ['includereplace:compile', 'list_page', 'validation']);
};

