import Ember from 'ember';

export default Ember.Controller.extend({
    classes: function(){
        // this.get('model').filterBy('completed',false).filterBy('archived',false).filterBy('overdue',true).filterBy('hidden',false).sortBy('due_date');
        return this.get('model').filterBy('archived',false);
    }.property(),
    selectedClasses: function(){
        return [];
        return this.get('model').filterBy('archived',false);
    }.property(),
    emailMessage: function(){
        var message =
            "Hi Class, \nI am now putting all of your assignments on the WhatsDue app.\n" +
            "All the information you need to get started can be found in this email\n" +
            "Cheers, ";
        return message + " " + user.first_name + " " + user.last_name;
    }.property(),
    actions: {
        send: function() {
            var data = this.get('model');
            var payload =
            {email:
            {
                course_code: 	data.get('course_code'),
                course_name:	data.get('course_name'),
                email_list:     this.get('emailAddresses'),
                message:	    this.get('emailMessage')
            }
            };

            var context = this;
            $('#Picker').modal('hide');
            trackEvent("Invitation Email Sent");
            context.transitionToRoute('main');
            $.ajax({
                type: "POST",
                url: "api/teacher/emails/invites",
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function(response){
                    /*
                     * Display bad emails
                     */
                    var invalidEmails = response.emails_invalid;
                    console.log(invalidEmails);
                    if (invalidEmails.length > 0 ){
                        alert("The following email addresses aren't valid:\n" + invalidEmails.join(","))
                    }
                },
                error: function(){
                    alert("Woops, There seems to have been some sort of error.")
                    location.reload();
                }
            });

        },
        close: function(){
            return true;
        }
    }
});