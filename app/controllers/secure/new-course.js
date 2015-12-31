import Ember from 'ember';

export default Ember.Controller.extend({
    user: Ember.inject.controller('application'),
    actions: {
        save: function() {
            var user = this.get('user');
            var controller = this;
            var courseName = this.get('course_name');
            if (typeof courseName === 'undefined'|| courseName ===""){
                this.mixpanel.trackEvent('Course Added Failed',{
                    Reason: "No name given"
                });
                alert("You need to enter a course name");
                return false;
            } else{
                var userName = user.salutation + " " + user.first_name + " " + user.last_name;
                this.store.createRecord('course', {
                    course_name: this.get('course_name'),
                    instructor_name: userName
                }).save().then(function(course){
                    controller.transitionToRoute('secure.course.assignment.new', course.get('id'));
                });
                this.set('course_name', "");
                this.mixpanel.trackEvent('Course Added');
                return true;
            }
        }
    }
});

