/**
 * Created by Dan on 07/01/2016.
 */

// app/initializers/component-router-injector.js
export function initialize(application) {
    // Injects all Ember components with a router object:
    application.inject('component', 'router', 'router:main');
}

export default {
    name: 'component-router-injector',
    initialize: initialize
};