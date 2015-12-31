import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';
import Email from 'whatsdue-admin-teacher/utils/email-validation';

export default Ember.Controller.extend({
    email:                  "dangreenisrael@gmail.com",
    password:               "123",
    confirmPassword:        "123",
    first_name:             "Dan",
    last_name:              "Green",
    salutation:             "Mr.",
    institution_name:       "IDC",
    emailSuggestion:        "",
    statuses:{
        email:              "",
        password:           "",
        first_name:         "",
        last_name:          "",
        salutation:         "",
        institution_name:   ""
    },
    actions: {
        validateEmailAction: function () {
            this.validateEmail();
        },
        setSuggestion: function () {
            let emailSuggestion = this.get('emailSuggestion');
            if (emailSuggestion) {
                this.set('email', emailSuggestion);
                this.set('emailSuggestion', null);
                this.set('emailStatusMessage', null);
                this.set('statuses.email', 'valid');
            }
        },
        recheckName: function () {
            if (this.get('nameStatusMessage')) {
                this.checkName();
            }
        },
        checkNameAction: function () {
            this.checkName();
        },
        checkInstitutionAction: function () {
            this.checkInstitution();
        },
        validatePasswordAction: function(){
          this.validatePassword();
        },
        selectedSalutation: function(selection, component) {
            if (selection) {
                this.set('selection', selection);
            } else {
                this.set('selection', component.get('default'));
            }
            return false;
        },
        registerAction: function(){
            let context = this;
            let nameValid = this.checkName();
            let institutionValid = this.checkInstitution();
            let passwordValid = this.validatePassword();
            let formValid = (nameValid && institutionValid && passwordValid);
            this.validateEmail().then(function(){
                if (formValid){
                    context.register();
                }
            });
        }
    },
    checkName: function(){
        let properties = ['first_name', 'last_name', 'salutation'];
        let hasError = false;
        properties.forEach(property=>{
            let status = "statuses."+property;
            if (this.get(property)){
                this.set(status, "valid");
            } else{
                this.set(status, "has-error");
                hasError = true;
            }
        });
        if (hasError){
            this.set("nameStatusMessage", "Please enter your full name with salutation");
            return false;
        } else{
            this.set("nameStatusMessage", null);
            return true;

        }
    },
    checkInstitution: function(){
        if (this.get('institution_name')){
            this.set("statuses.institution_name", "valid");
            this.set("institutionStatusMessage", null);
            return true;
        } else{
            this.set("statuses.institution_name", "has-error");
            this.set("institutionStatusMessage", "Please enter your school name");
            return false;
        }
    },
    validateEmail: function(){
        let context = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Email.fullyValidate(context.get('email')).then(function () {
                /* validation passed */
                context.set('emailStatusMessage', null);
                context.set('statuses.email', 'valid');
                context.set('suggestion', null);
                resolve();
            }, function (response) {
                context.set('emailStatusMessage', response.message);
                context.set('statuses.email', response.status);
                context.set('emailSuggestion', response.suggestion);
                reject();
            });
        });
    },
    validatePassword: function(){
        let valid = this.get('password')&&(this.get('password') === this.get('confirmPassword') );
        if (valid){
            this.set('statuses.password', 'valid');
            this.set('passwordStatusMessage', null);
            return true;

        } else{
            this.set('passwordStatusMessage', 'Please enter your password twice');
            this.set('statuses.password', 'has-error');
            return false;
        }
    },
    register: function(){
        let controller = this;
        let data = {
            email:              this.get('email'),
            password:           this.get('password'),
            first_name:         this.get('first_name'),
            last_name:          this.get('last_name'),
            salutation:         this.get('salutation'),
            institution_name:   this.get('institution_name')
        };
        this.store.createRecord('user', data).save().then(function(){
            let data = {
                username: controller.get('email'),
                password: controller.get('password')
            };
            Ember.$.ajax({
                type: "POST",
                url: ENV.accessNamespace+"/logins",
                data: JSON.stringify(data),
                dataType: 'json'
            }).done(function (){
                controller.transitionToRoute('secure');
            });
        });
    }
});