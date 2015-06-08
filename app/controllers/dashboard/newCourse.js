import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: "application",
    user: Ember.computed.alias("controllers.application.user"),
    actions: {
        save: function() {
            var user = this.get('user');
            var userName = user.salutation + " " + user.first_name + " " + user.last_name;
            var course = this.store.createRecord('course', {
                course_name: this.get('course_name'),
                instructor_name: userName
            }).save();

            $('#add-first-course').hide();
            trackEvent("Added Course");
            this.set('course_name', "");
            return true;
        }
    }
});

