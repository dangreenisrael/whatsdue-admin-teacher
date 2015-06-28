import Ember from 'ember';

export default Ember.Controller.extend({
    setCourses: function(){
        //var context = this;
        //this.store.all('course').then(function(courses){
        //   context.set('classes', courses.get('content').filterBy("archived", false));
        //});
        console.log();

    }.on('init'),
    classes: function(){
        return this.store.all('course').filterBy('archived', false);
    }.property(),
    selectedClasses: function(){
        return [];
        //return this.get('model').filterBy('archived',false);
    }.property(),
    actions: {
        send: function() {
            var data = this.get('model');
            var payload =
            {
                email: {
                    course_code: 	data.get('course_code'),
                    course_name:	data.get('course_name'),
                    email_list:     this.get('emailAddresses'),
                    message:	    this.get('emailMessage')
                }
            };

            var context = this;
            context.transitionToRoute('main');
            Ember.$.ajax({
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
                        alert("The following email addresses aren't valid:\n" + invalidEmails.join(","));
                    }
                },
                error: function(){
                    alert("Woops, There seems to have been some sort of error.");
                    location.reload();
                }
            });

        },
        close: function(){
            this.set('selectedClasses', []);
            return true;
        }
    }
});