import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['emailCount'],
    emails: null,
    actions: {
        close: function(){
            this.mixpanel.trackEvent("Invite Confirmed Closed");
            this.set('selectedClasses', []);
            this.transitionToRoute('secure.course', window.lastCourse);
        }
    }
});