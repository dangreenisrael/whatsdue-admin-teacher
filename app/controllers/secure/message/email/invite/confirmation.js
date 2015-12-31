import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['validEmails', 'invalidEmails'],
    validEmails: null,
    invalidEmails: null
});