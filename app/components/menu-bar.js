/**
 * Created by Dan on 29/10/2015.
 */
import Ember from "ember";

export default Ember.Component.extend({
    displayName:Ember.computed(function(){
        let user = this.get('user');
        if (user.get('first_name') !== " ") {
          return user.get('first_name')+" "+user.get('last_name');
        } else{
          return user.get('salutation')+" "+user.get('last_name');
        }
    }),
    actions: {
        toggleMenu: function () {
            this.sendAction('toggleMenu');
        },
        logout: function(){
            this.sendAction('logout');
        }
    }
});