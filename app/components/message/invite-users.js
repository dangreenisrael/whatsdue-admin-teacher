import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    courses: [],
    setCourses: function(){
        var context = this;
        this.get('store').findAll('course').then(function(courses){
            context.set('courses', courses);
        });
    }.on('init'),
    emails: null,
    tokenDelimiters: [" ",","],
    tokens: [],
    message: "",
    selectedClasses: function(){
        return [];
    }.property(),
    actions: {
        send: function() {
            let component = this;
            let emailTokens = this.get('emails');
            let emailList = [];
            if (emailTokens){
                for (let email of emailTokens){
                    emailList.push(email.value);
                }
            }
            let courseObjects = this.get('selectedClasses'),
                message = this.get('message'),
                courses = [];
            courseObjects.forEach(function (course) {
                courses.push(course.id);
            });
            if (Ember.$('.tokenfield').find('.invalid').length > 0){
                this.mixpanel.trackEvent('Invite Users Failed', {
                    Reason: "Wrong email address written"
                });
                alert('Please check all emails marked in red');
                return false;
            } else if (courseObjects.length < 1){
                this.mixpanel.trackEvent('Invite Users Failed', {
                    Reason: "No course chosen"
                });
                alert("You must choose at least one class");
                return false;
            } else if(!emailTokens){
                this.mixpanel.trackEvent('Invite Users Failed', {
                    Reason: "No emails given"
                });
                alert("Please enter at least one email");
                return false;
            }
            var payload =
            {
                email: {
                    message:    message,
                    courses:    courses,
                    email_list: emailList
                }
            };
            Ember.$.ajax({
                type: "POST",
                url: ENV.namespace+"/emails/invites",
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function(){
                    /*
                     * Display bad emails
                     */
                    let validCount = emailList.length;
                    component.mixpanel.trackEvent('Invited Users',{
                        "Total Courses":  courseObjects.length,
                        "Total Emails": validCount
                    });
                },
                error: function(){
                    component.mixpanel.trackEvent('Invite Users Failed', {
                        Reason: "Server Error"
                    });
                    alert("Woops, There seems to have been some sort of error sending the invites.");
                }
            });
            this.sendAction('sent', emailList.length);
        },
        close: function(){
            this.mixpanel.trackEvent("Invite Users Canceled");
            this.set('selectedClasses', []);
            this.sendAction('close');
        }
    }
});