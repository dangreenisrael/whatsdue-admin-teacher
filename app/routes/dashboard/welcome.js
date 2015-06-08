import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    model: function(){
        return "";
    },
    afterModel: function(){
        showModal()
    },
    actions: {
        addCourse: function () {
            showModal();
            this.transitionTo('main.newCourse');
        }
    }
});

