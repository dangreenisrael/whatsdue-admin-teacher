import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.find('course');
    },
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    }
});

