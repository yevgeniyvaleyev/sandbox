module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash'),
        karma = require('karma');

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        /*bowerful: {
            dist: {
                store: '/app/components/',
                packages: '<%= pkg.bower.dependencies %>'
            }
        },*/
        regarde: {
            reload: {
                files: [
                    'app/**/*.*'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 3501,
                    middleware: function (connect) {
                        return [require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                            connect.static(require('path').resolve('app/')),
                            connect.directory(require('path').resolve('app/'))];
                    }
                }
            }
        },
        karma: {
            options: {
                basePath: '.',
                logLevel: 'LOG_INFO'
            },
            unit: {
                frameworks: ['jasmine'],
                autoWatch: true,
                files: {
                    src: [
                        //'app/components/jquery/jquery.min.js',
                        'app/components/angular-complete/angular.min.js',
                        'app/components/angular-complete/angular-resource.min.js',
                        'app/components/angular-complete/angular-sanitize.min.js',
                        'app/components/angular-complete/angular-mocks.js',

//                        'node_modules/karma/adapter/lib/mocha.js',
//                        'node_modules/karma/adapter/mocha.js',
                        'app/js/**/*.js',
                        'tests/**/*.js'
                    ]
                },
                runnerPort: 9999,
                singleRun: false,
                browsers: ['PhantomJS']
            }
        },
        jshint: {
            options: {
                jshintrc: 'build/jshint.conf.json'
            },
            files: [
                'Gruntfile.js',
                'app/js/**/*.js',
                'tests/**/*.js'
            ]
        }
    });

    /**
     * Special task was created due to some problems with grunt-karma and karma about 'files' field
     */
    grunt.registerMultiTask('karma', 'run karma.', function () {
        var done = this.async(),
            defaults = this.options(),
            config = this.data;
        
        _.extend(config, defaults);
        config.files = config.files.src;
        
        karma.server.start(config, function (code) {
            return done(code === 0);
        });
    });

    grunt.loadNpmTasks('grunt-regarde');
    //grunt.loadNpmTasks('grunt-bowerful');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);
    grunt.registerTask('test', ['jshint', 'karma']);
};
