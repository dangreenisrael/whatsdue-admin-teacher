/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

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
app.import('vendor/custom.js');

module.exports = app.toTree();
