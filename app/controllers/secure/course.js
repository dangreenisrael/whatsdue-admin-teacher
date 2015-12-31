import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['type'],
    type: 'current',
    assignments: function(){
        return this.get('model').get('assignment_list');
    }.property()
});