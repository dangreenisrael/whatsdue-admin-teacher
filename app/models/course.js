import DS from 'ember-data';

export default DS.Model.extend({
    course_name:         DS.attr('string'),
    instructor_name:     DS.attr('string'),
    admin_id:            DS.attr('string'),
    course_code:         DS.attr('string'),
    archived:            DS.attr('boolean'),
    device_ids:          DS.attr('string',  {defaultValue: "{}"}),
    sortOrder:          1000,
    assignments:         DS.hasMany('Assignment'),
    totalSubscribers: function(){
        var users = JSON.parse(this.get('device_ids'));
        return Object.keys(users).length;
    }.property('device_ids')
});

