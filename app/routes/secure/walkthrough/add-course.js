import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        close: function(){
            window.history.back();
        },
        saved: function(course) {
            console.log('Saved');
            this.transitionTo('secure.walkthrough.add-assignment', course.get('id'));
        }
    }
});