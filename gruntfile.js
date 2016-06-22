/*jslint node: true */
module.exports = function(grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-list-page');
    grunt.loadNpmTasks('grunt-w3c-html-validation');  
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');

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
        csslint: {
          lax: {
            options: {
                csslintrc: '.csslintrc',
                'linting-option': false
            },
            src: ["html/css/*.css"]
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
                stoponerror: false,
                remotePath: '',
                doctype: 'HTML5',
                failHard: true,
                generateReport: false,
                relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta.","Element title must not be empty."]
            },
            files: {
                src: ['./html/*.html']
            }
        },
        'ftp-deploy': {
          build: {
            auth: {
              host: '127.0.0.1',
              port: 21,
              authKey: 'key1'
            },
            src: './html/',
            dest: '/gum/',
            exclusions: [
                './.ftppass', 
                './.git', 
                './.idea', 
                './node_modules',
                './gruntfile.js',
                './w3cErrors',
                './tpl',
                '.gitignore',
                'package.json',
                'validation-status.json'
            ]
          }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'html/js/*.js'],
                options: {
                    "curly": true,
                    "eqnull": true,
                    "eqeqeq": true,
                    "undef": true,
                    "devel": false,
                    "browser": true,
                    "asi": false,
                    "globals": {
                        "jQuery": false,
                        "$": false
                    }
                }
            }
        }
    });
    grunt.registerTask('default', ['connect', 'browserSync', 'watch']);
    grunt.registerTask('build', ['jshint', 'csslint:lax', 'includereplace:compile', 'validation', 'list_page','ftp-deploy']);
    grunt.registerTask('lint', ['csslint:lax', 'jshint', 'validation']);
};

