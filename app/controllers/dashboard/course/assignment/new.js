import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function(assignment) {
            var data = this.get('model');
            if (validateAssignment() == true) {
                this.store.createRecord('assignment', {
                    course_id:          data,
                    due_date:           assignment.due_date,
                    assignment_name:    assignment.assignment_name,
                    description:        assignment.description
                }).save();
                trackEvent("Added Assignment");
                return true;
            } else{
                alert ('Please fill everything out');
            }
        },
        close: function(){
            console.log('hi');
            return true;
        }
    }
});

