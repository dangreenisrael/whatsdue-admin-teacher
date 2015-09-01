import Ember from 'ember';
/* global mixpanel */

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

                var descriptionLength = function () {
                    var descriptionWords = assignment.description.split(' ').length;
                    if (assignment.description.length < 1){
                        return "None";
                    } else if (descriptionWords < 10){
                        return "Under 10";
                    } else if (descriptionWords < 30){
                        return "10 to 30";
                    } else if (descriptionWords < 50){
                        return "30 to 50";
                    } else{
                        return "Over 50"
                    }
                };

                mixpanel.track('Assignment Added',{
                        "Description Length": descriptionLength(),
                        "Description Has Link": assignment.description.containsLink(),
                        "Assignment Has Time": assignment.time_visible
                    }
                );
                return true;
            } else{
                mixpanel.track('Assignment Added Failed', {
                        Reason: "Type not selected"
                    });
                alert ('Please select activity type');
            }
        },
        close: function(){
            mixpanel.track('Add Assignment Canceled');
            return true;
        }
    }
});

