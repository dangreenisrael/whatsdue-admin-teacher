import Ember from 'ember';
/* global mixpanel */
export default Ember.Controller.extend({
    headingSeparator: function(){
        var selection = this.get('model').get('assignment_name');
        if ( (selection === "Homework") || (selection ==="Project")){
            return "due";
        }
    }.property('model.assignment_name'),

    actions: {
        save: function() {
            //var assignment = this.get('model');
            var controller = this;
            //assignment.set('assignment_name',   data.assignment_name);
            //assignment.set('description',       data.description);
            //assignment.set('due_date',          data.due_date);
            this.get('model').save().then(function(assignment){
                controller.transitionToRoute('courses.course', assignment.get('course_id').get('id'));
            });
            mixpanel.track('Assignment Edited');
            return true;
        },
        remove: function(){
            var model = this.get('model');
            this.transitionToRoute('courses.course', model.get('course_id').get('id'));
            model.set('archived', true);
            model.save();
            mixpanel.track('Assignment Removed');
            return true;
        },
        close: function(){
            this.get('model').rollbackAttributes();
            mixpanel.track('Assignment Edit Canceled');
            return true;
        }
    }

});
