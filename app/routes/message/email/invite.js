import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        Ember.$.get("/api/teacher/user").fail(function(){
            alert('You have been logged out due to inactivity');
            window.location = "/login";
        });
        this.render({
            outlet: 'modal',
            into: 'application'
        });
       // Ember.$('#Modal').modal('show');
    },
    model: function(){
        return this.store.findAll('course');
    }
});

