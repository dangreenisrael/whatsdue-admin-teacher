import DS from 'ember-data';
/* global moment */
export default DS.Model.extend({
    assignment_name:        DS.attr('string'),
    description:            DS.attr('string'),
    due_date:               DS.attr('string'),
    time_of_day:            DS.attr('string',  {defaultValue: "Morning"}),
    archived:               DS.attr('boolean', {defaultValue: false}),
    time_visible:           DS.attr('boolean', {defaultValue: false}),
    selected:               DS.attr('boolean', {defaultValue: false}),
    statuses:               DS.hasMany('status', {
        async: true
    }),
    course_id:              DS.belongsTo('course', {async: true}),
    dueDateMoment: function(){
        return moment(this.get('due_date'));
    }.property('due_date'),
    dueDate: function(){
        return this.get('dueDateMoment').format('ddd MMMM Do');
    }.property('due_date'),
    due_date_raw: function(){
        return this.get('dueDateMoment').format('');
    }.property('due_date'),
    timestamp: function(){
        return this.get('dueDateMoment').format('X');
    }.property('due_date'),
    due_time: function(){
        return this.get('dueDateMoment').format('h:mm A');
    }.property('timestamp'),
    currentAssignment: function(){
        let startDate = moment().subtract(2, 'days');
        return this.get('dueDateMoment').isAfter(startDate) && !this.get('archived');
    }.property()
});

