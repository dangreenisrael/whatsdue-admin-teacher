import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            this.get('model').save();
            return true;
        },
        remove: function(){
            var model = this.get('model');
            var courseName = model.get('course_name');
            var dialogue = confirm("Press OK to delete "+courseName);
            if (dialogue === true) {
                model.destroyRecord();
            }

            window.history.go(-2);
            return true;
        },
        close: function(){
            this.get('model').rollbackAttributes();
            return true;
        }
    }
});