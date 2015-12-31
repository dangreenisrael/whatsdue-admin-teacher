import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function(assignmentData, dueDates) {
            var controller = this;
            var courseId = this.get('model').get('id');
            var assignments = [];
            dueDates.forEach(function(dueDate){
               assignments.push({
                   "assignment_name": assignmentData.assignment_name,
                   "course_id": courseId,
                   "description": assignmentData.description,
                   "due_date": dueDate,
                   "time_visible": assignmentData.time_visible
               });
            });
            var data ={
                course:{
                    id: courseId,
                    assignment: assignments
                }
            };
            var success = function(){
                controller.get('store').findAll('assignment');
                controller.transitionToRoute('secure.course',courseId);
            };
            Ember.$.ajax({
                type: "POST",
                url: '/api/teacher/assignments/bulks',
                data: JSON.stringify(data),
                success: success,
                contentType: 'json'
            });
            return false;
        },
        close: function(){
            this.mixpanel.trackEvent('Add Assignment Canceled');
            return true;
        }
    }
});

