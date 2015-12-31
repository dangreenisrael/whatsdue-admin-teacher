import DS from 'ember-data';

export default DS.Model.extend({
    first_name:         DS.attr('string'),
    last_name:          DS.attr('string'),
    email:              DS.attr('string'),
    salutation:         DS.attr('string'),
    institution_name:   DS.attr('string'),
    signup_date:        DS.attr('string'),
    total_assignments:  DS.attr('number'),
    total_courses:      DS.attr('number'),
    unique_invitations: DS.attr('number'),
    unique_students:    DS.attr('number'),
    password:           DS.attr('string'),
    courses:            DS.hasMany('course')
});