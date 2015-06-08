import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    model: function() {
        var id = this.modelFor('course').id;
        return this.store.find('message', {course_id:id});
    }
});

