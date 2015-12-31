/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'whatsdue-admin-teacher',
    environment: environment,
    baseURL: '/secure/',
    contentSecurityPolicy: {
        'default-src': "*",
        'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
        'font-src': "'self'",
        'connect-src': "*",
        'img-src': "*",
        'style-src': "'self' 'unsafe-inline' "
    },
    social: {
      google: {
        clientId: '220312012516-vvvhrdkdaea1l2phj0h5hfjd38eu2880.apps.googleusercontent.com',
        apiKey: 'abc' // optional
        // if you want to load the library yourself with the `googleContactService.load()`,
        // set this to false. If not set or truthy, it'll automatically load with your application
        // autoLoad: true
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    mixpanel: {
      enabled: true,
      LOG_EVENT_TRACKING: false,
      token: 'd2678f7dc9eb34a65ba2cd7b56cc7623',
      disable_auto_tracking: true // default: false
    }
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.baseURL = '/secure/';
    ENV.namespace = "/app_dev.php/api/teacher";
    ENV.accessNamespace = "/app_dev.php/api/access";

  } else{
    ENV.namespace = "/api/teacher";
    ENV.accessNamespace = "/api/access";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/secure/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = 'body';
  }

  if (environment === 'production') {

  }

  return ENV;
};
