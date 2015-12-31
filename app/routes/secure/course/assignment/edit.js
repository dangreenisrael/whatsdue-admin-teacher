import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    model: function(params) {
        return this.store.findRecord('assignment', params.assignment_id);
    }
});

