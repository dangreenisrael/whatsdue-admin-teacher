import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'main',
            into: 'dashboard'
        });
    },
    model: function(params) {
        return this.store.find('course', params.course_id);
    }
});

