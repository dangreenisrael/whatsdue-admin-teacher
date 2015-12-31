import DS from 'ember-data';
import Ember from 'ember';

/* global moment */
export default DS.Model.extend({
    assignment_name:        DS.attr('string'),
    description:            DS.attr('string'),
    due_date:               DS.attr('string'),
    time_of_day:            DS.attr('string',  {defaultValue: "Morning"}),
    archived:               DS.attr('boolean', {defaultValue: false}),
    time_visible:           DS.attr('boolean', {defaultValue: false}),
    selected:               DS.attr('boolean', {defaultValue: false}),
    statuses:               DS.hasMany('status'),
    course_id:              DS.belongsTo('course'),
    dueDateMoment: function(){
        return moment(this.get('due_date'));
    }.property('due_date'),
    watchMoment: function(){
        let dueDate = this.get('dueDateMoment').format("YYYY-MM-DD HH:mm");
        this.set('due_date', dueDate);
    }.observes('dueDateMoment'),
    //dueDate: function(){
    //    return this.get('dueDateMoment').format('ddd MMMM Do');
    //}.property('due_date','dueDateMoment'),
    //due_date_raw: function(){
    //    return this.get('dueDateMoment').toDate();
    //}.property('due_date'),
    timestamp: Ember.computed('dueDateMoment', function(){
        return this.get('dueDateMoment').format('X');
    }),
    display_time:  Ember.computed('dueDateMoment', function(){
        return this.get('dueDateMoment').format('h:mm A');
    }),
    situation: function(){
        let yesterday = moment().subtract(2, 'days');
        if (this.get('dueDateMoment').isAfter(yesterday) && !this.get('archived')){
            return "current";
        } else if(this.get('archived')){
            return "deleted";
        } else{
            return "past";
        }
    }.property('archived')
});