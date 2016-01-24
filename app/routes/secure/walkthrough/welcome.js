import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        close: function(){
            this.get('router').transitionTo('secure');
        }
    }
});

