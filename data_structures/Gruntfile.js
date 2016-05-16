'use strict';

//
// XXX/mm This is still being tested, and does not work without making a full npm package!!!
//

if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'test';
}

if (process.env.CONSOLE_LOG === undefined ) {
    process.env.CONSOLE_LOG = 0;
}

module.exports = function (grunt) {

    var coverageDirectory = 'coverage';

    var srcFiles = ['*.js', 'lib/**/*.js'];
    var testFiles = ['test/**/*.js'];
    var allFiles = ['Gruntfile.js'];
    Array.prototype.push.apply(allFiles, srcFiles);
    Array.prototype.push.apply(allFiles, testFiles);

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-plato');

    grunt.initConfig({
        eslint: {
            options: {
                config: '.eslintrc',
                format: isFusion() ? 'checkstyle' : 'stylish',
                outputFile: isFusion() ? 'checkstyle.xml' : ''
            },
            module: [
                'apis/**/*.js',
                'lib/**/*.js',
                'test/**/*.js',
                'index.js'
            ]
        },
        mochacli: {
            src: testFiles,
            options: {
                timeout: 10000,
                ignoreLeaks: true,
                ui: 'bdd',
                reporter: isFusion() ? 'xunit-file' : 'spec',
                require: ['babel-register', 'babel-polyfill', 'module-babel']
            }
        }
    });

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', ['eslint']);
    // grunt.registerTask('build', ['test']);
    grunt.registerTask('test', ['lint', 'mochacli']);
};
