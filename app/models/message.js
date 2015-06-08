import DS from 'ember-data';

export default DS.Model.extend({
    body:               DS.attr('string'),
    title:              DS.attr('string'),
    updated_at:         DS.attr('number'),
    course_id:          DS.belongsTo('course', {async:true}),
    date: function(){
        return moment(this.get('updated_at'),"X").format('MMM Do, hh:mm A');
    }.property('updated_at')
});

