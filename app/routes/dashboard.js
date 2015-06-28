import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({ outlet: 'main' });
        this.render('dashboard/courses/main', {
            into: 'dashboard',
            outlet: 'main',
            controller: 'dashboard/courses/main'
        });
    },
    model: function() {
        this.store.find('assignment');
        return this.store.find('course');
    }
});

