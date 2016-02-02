import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    actions:{
        close: function(){
            window.history.back();
        },
        saved: function(course) {
            console.log('Saved');
            this.transitionTo('secure.course.assignment.new', course.get('id'));
        }
    }
});