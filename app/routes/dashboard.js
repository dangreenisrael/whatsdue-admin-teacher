import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({ outlet: 'main' });
    },
    model: function() {
        this.store.find('assignment');
        return this.store.find('course');
    },
    afterModel: function(){
        initChooser();
        //var count = this.modelFor('courses').get('length');
        //if (count == 0){
        //    this.transitionTo('welcome');
        //}
    }
});

