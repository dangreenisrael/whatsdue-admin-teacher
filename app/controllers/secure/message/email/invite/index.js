import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Controller.extend({
    setCourses: function(){
        var context = this;
        this.store.findAll('course').then(function(courses){
           context.set('classes', courses);
        });
    }.on('init'),
    tokenDelimiters: [" ",","],
    tokens: [],
    message: "",
    selectedClasses: function(){
        return [];
    }.property(),
    actions: {
        send: function() {
            let controller = this;
            //let email_list = this.get('emailAddresses'),
            let   courseObjects = this.get('selectedClasses'),
                message = this.get('message'),
                courses = [];

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
                alert("You must choose at least one course");
                return false;
            } else if(this.get('emails').length < 1){
                this.mixpanel.trackEvent('Invite Users Failed', {
                    Reason: "No emails given"
                });
                alert("You must enter at least one email address");
                return false;
            }
            courseObjects.forEach(function (course) {
                courses.push(course.id);
            });
            var payload =
            {
                email: {
                    message:    message,
                    courses:    courses,
                    email_list: this.get('emails')
                }
            };
            Ember.$.ajax({
                type: "POST",
                url: ENV.namespace+"/emails/invites",
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function(response){
                    /*
                     * Display bad emails
                     */
                    let validCount = response.emails_valid.length;
                    let invalidCount = response.emails_invalid.length;
                    controller.mixpanel.trackEvent('Invited Users',{
                        "Total Courses":  courseObjects.length,
                        "Total Valid Emails": validCount,
                        "Total Invalid Emails": invalidCount
                    });


                },
                error: function(){
                    controller.mixpanel.trackEvent('Invite Users Failed', {
                        Reason: "Server Error"
                    });
                    alert("Woops, There seems to have been some sort of error sending the invites.");
                }
            });
        },
        close: function(){
            this.mixpanel.trackEvent("Invite Users Canceled");
            this.set('selectedClasses', []);
            return true;
        }
    }
});