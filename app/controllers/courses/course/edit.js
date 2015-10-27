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
            let controller = this;
            var courseName = model.get('course_name');
            var dialogue = confirm("Press OK to delete "+courseName);
            if (dialogue === true) {
                controller.transitionToRoute('application');
                model.destroyRecord().then(function(){
                    mixpanel.track('Course Removed');
                });
                return true;
            }
        },
        close: function(){
            mixpanel.track('Course Edit Canceled');
            this.get('model').rollbackAttributes();
            return true;
        }
    }
});