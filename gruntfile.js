module.exports = function(grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-connect');
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
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('rebuild', ['includereplace:dev']);
    grunt.registerTask('compile', ['includereplace:compile']);
    grunt.registerTask('dev', ['connect', 'browserSync', 'watch']);

};

