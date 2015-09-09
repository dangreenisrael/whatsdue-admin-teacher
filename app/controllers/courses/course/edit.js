import Ember from 'ember';
/* global mixpanel */

export default Ember.Controller.extend({
    actions: {
        save: function() {
            this.get('model').save();
            mixpanel.track('Course Edited');
            return true;
        },
        remove: function(){
            var model = this.get('model');
            var courseName = model.get('course_name');
            var dialogue = confirm("Press OK to delete "+courseName);
            if (dialogue === true) {
                model.destroyRecord();
            }
            mixpanel.track('Course Removed');
            this.transitionToRoute('application');
            return true;
        },
        close: function(){
            mixpanel.track('Course Edit Canceled');
            this.get('model').rollbackAttributes();
            return true;
        }
    }
});