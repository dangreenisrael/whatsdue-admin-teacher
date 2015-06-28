import Ember from 'ember';

export default Ember.ArrayController.extend({
    model:[],
    needs: "application",
    user: Ember.computed.alias("controllers.application.user"),
    courseOrder: function(){
        var user = this.get('user');
        if (user.settings){
            return JSON.parse(user.settings).order;
        } else{
            return "";
        }
    }.property('user')
});