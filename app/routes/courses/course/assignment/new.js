import Ember from 'ember';
/* global moment */
export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    model: function() {
        var course_id = this.paramsFor('courses.course').course_id;
        return this.store.findRecord('course', course_id);
    },
    resetController: function (controller, isExiting) {
        if (isExiting) {
            controller.set('dueTime', "9:00 AM");
            controller.set('timeSet', false);
            controller.set('dueDateMoment', moment().add(1, 'days').set('hour', 9).set('minute', 0));
        }
    }
});

