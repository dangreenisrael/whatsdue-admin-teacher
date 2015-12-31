import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Controller.extend({
    username: "",
    password: "",
    actions: {
        login: function(){
            let controller = this;
            let data = {
                username: this.get('username'),
                password: this.get('password')
            };
            Ember.$.ajax({
                type: "POST",
                url: ENV.accessNamespace+"/logins",
                data: JSON.stringify(data),
                dataType: 'json'
            }).done(function (){
                controller.transitionToRoute('secure');
            }).fail(function(){
                alert('Try again');
            })
        }
    }
});