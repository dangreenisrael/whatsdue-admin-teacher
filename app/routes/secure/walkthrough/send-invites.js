import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function () {
        this.render({
            outlet: 'modal',
            into: 'application'
        });
    },
    actions: {
        sent: function (emailCount) {
            this.transitionTo('secure.message.email.invite.confirmation', {
                queryParams: {emailCount: emailCount}
            });
        },
        close: function(){
            this.transitionTo('secure.course', window.lastCourse);
        }
    }
});