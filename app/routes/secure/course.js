import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        this.store.findAll('student');
        return this.store.findRecord('course', params.course_id);
    },
    afterModel: function(course){
        window.lastCourse = course.get('id');
        if ((typeof course === "undefined") || (course.get('archived') === true)){
            let route = this;
            this.transitionTo('application').then(function(){
                route.store.unloadRecord(course);
            });
        }
        this.store.query('status', {course: course.get('id')});
    }
});

