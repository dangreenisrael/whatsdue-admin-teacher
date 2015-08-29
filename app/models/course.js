import DS from 'ember-data';

export default DS.Model.extend({
    course_name:         DS.attr('string'),
    instructor_name:     DS.attr('string'),
    course_code:         DS.attr('string'),
    consumer_ids:        DS.attr('string'),
    archived:            DS.attr('boolean'),
    sortOrder:           1000,
    assignment_list:     DS.hasMany('assignment', {
        async: true
    }),
    student_list:       DS.hasMany('student', {
        async: true
    }),
    totalStudents: function(){
        return this.get('student_list').get('length');
    }.property('student_list')
});