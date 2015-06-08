import Ember from 'ember';

/* global CustomFunctions */
export default Ember.ArrayController.extend({
    model:[],
    actions:{
        duplicate: function(oldCourse){
            var newCourse = this.store.createRecord('course', {
                course_name: oldCourse.get('course_name')+" COPY",
                instructor_name: oldCourse.get('instructor_name')
            });
            var context = this;
            newCourse.save().then(function(record){
                oldCourse.get('assignments').forEach(function(oldAssignment) {
                    if (oldAssignment.get('archived')==false){
                        var assignment = context.store.createRecord('assignment', {
                            course_id:          record,
                            due_date:           oldAssignment.get('due_date'),
                            assignment_name:    oldAssignment.get('assignment_name'),
                            description:        oldAssignment.get('description'),
                            admin_id:           username
                        });
                        assignment.save();
                    }
                });
            })

        }
    }
});

