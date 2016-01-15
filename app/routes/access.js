import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function(){
        return this.store.findAll('user').then(function(user){
            if (user.length > 0){
                this.transitionTo('secure');
            }
        });
    }
});
