import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function(route) {
        /* We're setting this for our application back button */
        this.controllerFor('application').set('courseId', route.get('model').id);
        this.render({
            outlet: 'main',
            into: 'application'
        });
    },
    model: function(params) {
        return this.store.findRecord('course', params.course_id);
    }
});

