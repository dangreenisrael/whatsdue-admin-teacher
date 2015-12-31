import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';
import Email from 'whatsdue-admin-teacher/utils/email-validation';

export default Ember.Component.extend({
    didInsertElement: function(){
        let element = this.get('element$');
        element
            .on('tokenfield:createtoken', function (e) {
                var data = e.attrs.value.split('|');
                var re = /\S+@\S+\.\S+/;
                var valid = re.test(data);
                if (!valid) {
                    return false;
                }
            })
            .on('tokenfield:createdtoken', function (e) {
                let email = e.attrs.value.split('|');
                Email.set('email',email);

                Email.validateExistence().then(function(){
                    console.log("Email exists");
                }, function(){
                    Ember.$(e.relatedTarget).addClass('invalid');
                    alert('"'+email+'"'+' is not an actual email address.');
                });
            });
    }
});