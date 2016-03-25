module.exports = function (grunt) {
    var compilerPackage = require('google-closure-compiler');

    compilerPackage.grunt(grunt);

    // Project configuration.
    grunt.initConfig({
        'closure-compiler': {
            my_target: {
                files: {
                    'build/output.min.js': ['js/**']
                },
                options: {
                    compilation_level: 'SIMPLE',
                    language_in: 'ECMASCRIPT5_STRICT',
                    create_source_map: 'build/output.min.js.map',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=output.min.js.map'
                }
            }
        }
    });

    grunt.registerTask('default', ['closure-compiler']);
};