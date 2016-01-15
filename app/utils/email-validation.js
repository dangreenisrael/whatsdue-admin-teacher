/**
 * Created by Dan on 10/11/2015.
 */
import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Object.create({
    validateRegex: function(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
    validateExistence: function(email){
        let url = ENV.accessNamespace+"/email/valid?email="+email;
        return new Ember.RSVP.Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = handler;
            xhr.responseType = 'json';
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();
            function handler() {
                if (this.readyState === this.DONE) {
                    if (this.response.valid) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }
            }
        });
    },
    validateNewEmail: function(email){
        let url = ENV.accessNamespace+"/email/new?email="+email;
        return new Ember.RSVP.Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = handler;
            xhr.responseType = 'json';
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();
            function handler() {
                if (this.readyState === this.DONE) {
                    if (this.response) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }
            }
        });
    },
    validateCommonDomains: function(email){
        let context = this;
        return new Ember.RSVP.Promise(function(resolve, reject){
            window.Mailcheck.run({
                email: email,
                empty: function() {
                    resolve(true);
                },
                suggested: function(suggestion){
                    context.validateExistence(suggestion.full).then(function(){
                        reject ({
                            message : "Did you mean "+suggestion.full+"?",
                            suggestion: suggestion.full
                        });
                    }, function(){
                        reject ({
                            message : "This email seems to not exist",
                            suggestion: null
                        });
                    });
                }
            });
        });
    },
    fullyValidate: function(email){
        let context = this;
        let response = {
            message:    null,
            status:     null,
            suggestion: null,
            existingUser:   false
        };
        return new Ember.RSVP.Promise(function(resolve, reject){
            /* Check Regex */
            if (context.validateRegex(email)){
                /* Check domain misspelling */
                context.validateCommonDomains(email).then(function(){
                    /* Check that the address isn't in our system */
                    context.validateNewEmail(email).then(function(){
                        /* Check that the address actually exists */
                        context.validateExistence(email).then(function(){
                            resolve();
                        }, function(){
                            response.status = "has-warning";
                            response.message = "This email seems to not exist";
                            reject(response);
                        });
                    }, function(){
                        response.status  = "has-error";
                        response.message = "You're already signed up.";
                        response.existingUser = "true";
                        reject(response);
                    });
                }, function(validateCommonDomainsResponse){
                    response.status     = "has-warning";
                    response.message    = validateCommonDomainsResponse.message;
                    response.suggestion = validateCommonDomainsResponse.suggestion;
                    reject(response);
                });
            } else{
                response.status     = "has-error";
                response.message    = "This is not a valid email address.";
                reject(response);
            }
        });

    }
});