import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: "application",
    user: Ember.computed.alias("controllers.application.user"),
    actions: {
        save: function() {
            var user = this.get('user');
            var controller = this;
            var userName = user.salutation + " " + user.first_name + " " + user.last_name;
            this.store.createRecord('course', {
                course_name: this.get('course_name'),
                instructor_name: userName
            }).save().then(function(course){
                controller.transitionToRoute('dashboard.courses.course', course.get('id'));
            });
            this.set('course_name', "");
            return true;
        }
    }
});

