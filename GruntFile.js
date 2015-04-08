module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            production: {
                options: {
                    paths: ["less"],
                    cleancss: true
                },
                files: {
                    "dist/css/style.css": ["less/*.less", "less/*.css"]
                }
            }
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                },
                transform: ['6to5ify', 'reactify']
            },
            client: {
                src: [
                    "views/*.js",
                    "views/**/*.js",
                    "client-main.js"
                ],
                dest: 'dist/js/main.js'
            }
        },
        watch: {
            scripts: {
                files: [
                    "views/*.js",
                    "views/**/*.js"
                ],
                tasks: ['browserify'],
                options: {
                    spawn: true
                }
            },
            css: {
                files: ['less/*.less', 'less/*.css'],
                tasks: ['less'],
                options: {
                    spawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('travis', ['less', 'browserify']);
    grunt.registerTask('default', ['travis']);

};
