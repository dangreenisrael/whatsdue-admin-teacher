import Ember from 'ember';
/* global mixpanel, moment */

export default Ember.Controller.extend({
    assignmentName: "Homework",
    dueDateMoment: Ember.computed(function(){
        return moment().add(1, 'days').set('hour', 9).set('minute', 0);
    }),
    dueTime: "9:00 AM",
    timeSet: false,
    actions: {
        save: function() {
            var course = this.get('model');
            var controller = this;
            let name = this.get('assignmentName');
            let description = this.get('description');
            let dueDate = this.get('dueDateMoment').format("YYYY-MM-DD HH:mm");
            let timeVisible = this.get('timeSet');
            if (name !== "") {
                this.store.createRecord('assignment', {
                    course_id:          course,
                    due_date:           dueDate,
                    assignment_name:    name,
                    description:        description,
                    time_visible:       timeVisible
                }).save().then( function(assignment){
                    controller.transitionToRoute('courses.course', assignment.get('course_id').get('id'));
                });

                let descriptionLength = function () {
                    var descriptionWords = description.split(' ').length;
                    if (description.length < 1){
                        return "None";
                    } else if (descriptionWords < 10){
                        return "Under 10";
                    } else if (descriptionWords < 30){
                        return "10 to 30";
                    } else if (descriptionWords < 50){
                        return "30 to 50";
                    } else{
                        return "Over 50";
                    }
                };

                mixpanel.track('Assignment Added',{
                        "Description Length": descriptionLength(),
                        "Description Has Link": description.containsLink(),
                        "Assignment Has Time": timeVisible
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

