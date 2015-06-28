import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: "application",
    user: Ember.computed.alias("controllers.application.user"),
    actions: {
        save: function() {
            var user = this.get('user');
            var userName = user.salutation + " " + user.first_name + " " + user.last_name;
            this.store.createRecord('course', {
                course_name: this.get('course_name'),
                instructor_name: userName
            }).save();

            Ember.$('#add-first-course').hide();
            this.set('course_name', "");
            return true;
        }
    }
});

