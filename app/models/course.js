import DS from 'ember-data';

export default DS.Model.extend({
    course_name:         DS.attr('string'),
    instructor_name:     DS.attr('string'),
    course_code:         DS.attr('string'),
    archived:            DS.attr('boolean'),
    sortOrder:           1000,
    assignments:         DS.hasMany('assignment'),
    student_list:        DS.hasMany('student'),
    user_id:             DS.belongsTo('user'),
    totalStudents: function(){
        return this.get('student_list').get('length');
    }.property('student_list')
});