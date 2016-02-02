import Ember from 'ember';
export default Ember.Route.extend({
    model: function(params) {
        return this.store.findRecord('course', params.course_id);
    },
    actions:{
        goToInvite: function(){
            let courseId = this.get('controller').get('model').get('id');
            this.transitionTo('secure.walkthrough.try-it-out', courseId);
        }
    }
});