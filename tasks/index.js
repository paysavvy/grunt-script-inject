module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('script-inject', 'Automatically injects script tags into a page.', function () {
        var htmlText;
        var scriptText;

        var sources = [];
        if (this.data.srcs) {
            var vector = grunt.file.expandMapping(this.data.srcs, '');
            for (var i = 1; i < vector.length; i++) {
                sources[i - 1] = vector[i].dest.replace("src/", "");
                grunt.log.ok("source: " + sources[i - 1]);
            }
        } else {
            grunt.log.error('Please specify the sources files to inject into the html.');
            return;
        }

        if (this.data.html) {
            htmlText = grunt.file.read(this.data.html);
            var content = "";
            for (var i = 0; i < sources.length; i++) {
                content += '    <script src="' + sources[i] + '"></script>\n';
            }
            grunt.file.write(this.data.html, htmlText.replace(/\<\!\-\-inject begin\-\-\>([\s\S]*?)\<\!\-\-inject end\-\-\>/, '<!--inject begin-->\n' + content + '    <!--inject end-->'));
            grunt.log.ok('injected'.blue + ' into ' + this.data.html);
        } else {
            grunt.log.error('Please specify a html file to be script tags injected.');
            return;
        }

    });
};