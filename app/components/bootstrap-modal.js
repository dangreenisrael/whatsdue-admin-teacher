/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Component.extend({
    didInsertElement: function(){
        Ember.$.get(ENV.accessNamespace+"/users", response =>{
            if (!response.user){
                this.get('router').transitionTo('access.login');
            }
        });
        Ember.$('input.focus').focus();
    }
});