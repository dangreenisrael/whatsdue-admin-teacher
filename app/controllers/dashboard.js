import Ember from 'ember';

export default Ember.ArrayController.extend({
    model:[],
    needs: "application",
    user: Ember.computed.alias("controllers.application.user"),
    courseOrder: function(){
        if (user.settings){
            var order =  JSON.parse(user.settings).order;
            return order;
        } else{
            return "";
        }
    }.property('user')
});