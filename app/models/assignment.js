import DS from 'ember-data';

export default DS.Model.extend({
    admin_id:            DS.attr('string'),
    assignment_name:     DS.attr('string'),
    description:         DS.attr('string'),
    due_date:            DS.attr('string'),
    archived:            DS.attr('boolean'),
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
    hidden: function(){
        if (moment().isAfter(this.get('due_date')) == true){
            return "hidden";
        }else{
            return " ";
        }
    }.property('due_date'),
    changed: function(){
        // Changed
    }.observes('description').on('init'),
    checked:            DS.attr('boolean', {defaultValue: false})
});

