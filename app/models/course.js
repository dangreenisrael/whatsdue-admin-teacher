import DS from 'ember-data';

export default DS.Model.extend({
    course_name:         DS.attr('string'),
    instructor_name:     DS.attr('string'),
    admin_id:            DS.attr('string'),
    course_code:         DS.attr('string'),
    consumer_ids:        DS.attr('string'),
    archived:            DS.attr('boolean'),
    sortOrder:           1000,
    assignments:         DS.hasMany('assignment'),
    totalSubscribers: function(){
        var users = JSON.parse(this.get('consumer_ids'));
        return Object.keys(users).length;
    }.property('consumer_ids')
});