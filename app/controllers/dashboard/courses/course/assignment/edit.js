import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        save: function(data) {
            var assignment = this.get('model');
            var controller = this;
            assignment.set('assignment_name',   data.assignment_name);
            assignment.set('description',       data.description);
            assignment.set('due_date',          data.due_date);
            assignment.save().then(function(assignment){
                console.log(assignment);
                controller.transitionToRoute('dashboard.courses.course', assignment.get('course_id').get('id'));
            });

            return true;
        },
        remove: function(){
            var model = this.get('model');
            this.transitionToRoute('dashboard.courses.course', model.get('course_id').get('id'));
            model.destroyRecord();
            return true;
        },
        close: function(){
            this.get('model').rollback();
            this.transitionToRoute('dashboard.courses.course', this.get('model').get('course_id').get('id'));
            return true;
        }
    }

});
