import Ember from 'ember';
import Email from 'whatsdue-admin-teacher/utils/email-validation';

export default Ember.Component.extend({
    didInsertElement: function(){
        let element = this.get('element$');
        element
            .on('tokenfield:createtoken', function (e) {
                let email = e.attrs.value;
                let re = /\S+@\S+\.\S+/;
                let valid = re.test(email);
                if (!valid) {
                    return false;
                } else{
                    email = email.replace('<', "");
                    email = email.replace('>', "");
                    e.attrs.value = email;
                    e.attrs.label = email;
                }
            })
            .on('tokenfield:createdtoken', function (e) {
                let email = e.attrs.value;
                Email.validateCommonDomains(email).then(function(){
                        /* Check that the address actually exists */
                        Email.validateExistence(email).then(function(){
                            /* email is legit */
                            Ember.$(e.relatedTarget).addClass('valid');
                        }, function(){
                            /* email is not legit */
                            Ember.$(e.relatedTarget).addClass('invalid');
                            alert('"'+email+'"'+' is not an actual email address.');
                        });
                }, function(response){
                    Ember.$(e.relatedTarget).addClass('invalid');
                    if (response.suggestion){
                        alert("Did you mean to type "+response.suggestion+"?");
                    } else{
                        alert('"'+email+'"'+' is not an actual email address.');
                    }
                });
            });
    }
});