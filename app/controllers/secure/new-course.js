import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        saved: function(course) {
            console.log('Saved');
            this.transitionToRoute('secure.course.assignment.new', course.get('id'));
        }
    }
});