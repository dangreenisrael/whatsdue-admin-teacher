/**
 * Created by Dan on 8/6/15.
 */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        // Any other options
    });

    app.import('bower_components/moment/min/moment.min.js');
    app.import('bower_components/switchery/dist/switchery.js');
    app.import('bower_components/switchery/dist/switchery.css');

    app.import('vendor/external-vendors/bootstrap-timepicker/js/bootstrap-timepicker.js');
    app.import('vendor/external-vendors/bootstrap-timepicker/css/bootstrap-timepicker.css');

    app.import('vendor/external-vendors/foundation/css/foundation.css');
    app.import('vendor/external-vendors/foundation/js/foundation.js');
    app.import('vendor/external-vendors/foundation/js/foundation.joyride.js');

    app.import('vendor/template-vendors/theme-style.css');
    app.import('vendor/template-vendors/bootstrap-reset.css');
    app.import('vendor/external-vendors/ba-linkify.min.js');

    app.import('vendor/global-functions.js');

    return app.toTree();
};