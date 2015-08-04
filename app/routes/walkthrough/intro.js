import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        console.log('render');
        this.render({
            outlet: 'tooltips',
            into: 'application'
        });
    }
});