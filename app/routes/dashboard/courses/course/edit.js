import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    model: function() {
        var course_id = this.paramsFor('dashboard.courses.course').course_id;
        return this.store.find('course', course_id);
    }
});
