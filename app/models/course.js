import DS from 'ember-data';

export default DS.Model.extend({
    course_name:         DS.attr('string'),
    instructor_name:     DS.attr('string'),
    admin_id:            DS.attr('string'),
    course_code:         DS.attr('string'),
    archived:            DS.attr('boolean'),
    device_ids:          DS.attr('string',  {defaultValue: "{}"}),
    assignments:         DS.hasMany('Assignment'),
    panelId: function(){
        return this.get('id')+"Panel";
    }.property('id'),
    totalSubscribers: function(){
        var users = JSON.parse(this.get('device_ids'));
        return Object.keys(users).length;
    }.property('device_ids')

});

