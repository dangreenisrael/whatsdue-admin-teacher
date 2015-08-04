import DS from 'ember-data';
/* global moment */
export default DS.Model.extend({
    admin_id:            DS.attr('string'),
    assignment_name:     DS.attr('string'),
    description:         DS.attr('string'),
    due_date:            DS.attr('string'),
    time_of_day:         DS.attr('string',  {defaultValue: "Morning"}),
    archived:            DS.attr('boolean', {defaultValue: false}),
    time_visible:        DS.attr('boolean', {defaultValue: false}),
    course_id:           DS.belongsTo('course'),
    dueDate: function(){
        return moment(this.get('due_date')).format('ddd MMMM Do');
    }.property('due_date'),
    due_date_raw: function(){
        return moment(this.get('due_date')).format('');
    }.property('due_date'),
    timestamp: function(){
        return moment(this.get('due_date')).format('X');
    }.property('due_date'),
    due_time: function(){
        return moment(this.get('timestamp'), "X").format('h:mm A');
    }.property('timestamp'),
    hidden: function(){
        if (moment().isAfter(this.get('due_date')) === true){
            return "hidden";
        }else{
            return " ";
        }
    }.property('due_date')
});

