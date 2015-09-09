import Ember from 'ember';
/* global mixpanel */

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
               })
            });
            var data ={
                course:{
                    id: courseId,
                    assignment: assignments
                }
            };
            var success = function(){
                controller.get('store').findAll('assignment');
                controller.transitionToRoute('courses.course',courseId);
            };
            $.ajax({
                type: "POST",
                url: '/api/teacher/assignments/bulks',
                data: JSON.stringify(data),
                success: success,
                contentType: 'json'
            });
            return false;
        },
        close: function(){
            mixpanel.track('Add Assignment Canceled');
            return true;
        }
    }
});

