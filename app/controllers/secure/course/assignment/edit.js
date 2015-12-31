import Ember from 'ember';

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
                controller.transitionToRoute('secure.course', assignment.get('course_id').get('id'));
            });
            this.mixpanel.trackEvent('Assignment Edited');
            return true;
        },
        remove: function(){
            var model = this.get('model');
            this.transitionToRoute('secure.course', model.get('course_id').get('id'));
            model.set('archived', true);
            model.save();
            this.mixpanel.trackEvent('Assignment Removed');
            return true;
        },
        close: function(){
            this.get('model').rollbackAttributes();
            this.mixpanel.trackEvent('Assignment Edit Canceled');
            return true;
        }
    }

});
