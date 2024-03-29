import Ember from 'ember';
/* global mixpanel */

export default Ember.Controller.extend({
    setCourses: function(){
        //var context = this;
        //this.store.all('course').then(function(courses){
        //   context.set('classes', courses.get('content').filterBy("archived", false));
        //});
        console.log();

    }.on('init'),
    classes: function(){
        return this.get('model').filterBy('archived', false);
    }.property(),
    selectedClasses: function(){
        return [];
        //return this.get('model').filterBy('archived',false);
    }.property(),
    actions: {
        send: function() {
            var email_list = this.get('emailAddresses'),
                courseObjects = this.get('selectedClasses'),
                courses = [];

            if (courseObjects.length < 1){
                mixpanel.track('Invite Users Failed', {
                    Reason: "No course chosen"
                });
                alert("You must choose at least one course");
                return false;
            } else if(!email_list){
                mixpanel.track('Invite Users Failed', {
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
                    message:    "",
                    courses:    courses,
                    email_list: email_list
                }
            };
            Ember.$.ajax({
                type: "POST",
                url: "/api/teacher/emails/invites",
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function(response){
                    /*
                     * Display bad emails
                     */
                    mixpanel.track('Invited Users',{
                        "Total Courses":  courseObjects.length,
                        "Total Valid Emails": response.emails_valid.length,
                        "Total Invalid Emails": response.emails_invalid.length
                    });
                    var invalidEmails = response.emails_invalid;
                    if (invalidEmails.length > 0 ){
                        alert("The following email addresses aren't valid:\n" + invalidEmails.join(","));
                    }
                },
                error: function(){
                    mixpanel.track('Invite Users Failed', {
                        Reason: "Server Error"
                    });
                    alert("Woops, There seems to have been some sort of error sending the invites.");
                    location.reload();
                }
            });
            return true;
        },
        close: function(){
            mixpanel.track("Invite Users Canceled");
            this.set('selectedClasses', []);
            return true;
        }
    }
});