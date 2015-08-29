import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function(assignment) {
            var data = this.get('model');
            var controller = this;
            if (assignment.assignment_name !== "") {
                this.store.createRecord('assignment', {
                    course_id:          data,
                    due_date:           assignment.due_date,
                    assignment_name:    assignment.assignment_name,
                    description:        assignment.description,
                    time_visible:       assignment.time_visible
                }).save().then( function(assignment){
                    controller.transitionToRoute('courses.course', assignment.get('course_id').get('id'));
                });
                return true;
            } else{
                alert ('Please select an assignment category');
            }
        },
        close: function(){
            return true;
        }
    }
});

