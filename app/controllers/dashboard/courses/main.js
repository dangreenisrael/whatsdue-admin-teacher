import Ember from 'ember';

export default Ember.Controller.extend({
    course: function(){
        return this.store.all('course').findBy('archived', false);
    }.property()
});