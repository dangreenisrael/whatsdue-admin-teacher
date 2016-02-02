import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.findRecord('course', params.course_id);
    },
    actions:{
        close: function(){
            this.transitionTo('secure');
        },
        send: function(){
            let route = this;
            let course = this.get('controller').get('model');
            let user = course.get('user_id');
            let message = "This is a place where you can add a personalized message to your students";
            var payload =
            {
                email: {
                    message:    message,
                    courses:    [course.get('id')],
                    email_list: [user.get('email')]
                }
            };
            Ember.$.ajax({
                type: "POST",
                url: ENV.namespace+"/emails/invites",
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function(){
                    route.mixpanel.trackEvent('Invited Self');
                },
                error: function(){
                    route.mixpanel.trackEvent('Invite Self', {
                        Reason: "Server Error"
                    });
                    alert("Woops, There seems to have been some sort of error sending the invites.");
                }
            });
            window.alert('Check your email for the invite, then come on back');
            //this.transitionTo('secure.walkthrough.send-invites');
        }
    }
});

