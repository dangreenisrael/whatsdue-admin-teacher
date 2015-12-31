import DS from 'ember-data';

export default DS.Model.extend({
    completed:      DS.attr('boolean', {defaultValue: false}),
    seen:           DS.attr('boolean', {defaultValue: false}),
    assignment_id:  DS.belongsTo('assignment'),
    student_id:     DS.belongsTo('student')
});