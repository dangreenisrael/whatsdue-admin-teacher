import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            this.get('model').save();
            this.mixpanel.trackEvent('Course Edited');
            return true;
        },
        remove: function(){
            var model = this.get('model');
            let controller = this;
            var courseName = model.get('course_name');
            var dialogue = confirm("Press OK to delete "+courseName);
            if (dialogue === true) {
                model.destroyRecord().then(function(){
                    controller.transitionToRoute('secure');
                    controller.mixpanel.trackEvent('Course Removed');
                    return false;
                });
            }
        },
        close: function(){
            this.mixpanel.trackEvent('Course Edit Canceled');
            this.get('model').rollbackAttributes();
            return true;
        }
    }
});