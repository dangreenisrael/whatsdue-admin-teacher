import DS from 'ember-data';
/* global moment */
export default DS.Model.extend({
    completed:      DS.attr('boolean', {defaultValue: false}),
    student_id:     DS.belongsTo('student', {
        async: true
    })
});