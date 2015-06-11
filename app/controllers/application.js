import Ember from 'ember';

/* global CustomFunctions */
export default Ember.Controller.extend({
    user:{},
    init: function(){
        var controller = this;
        Ember.$.get("/api/teacher/user", function( data ) {
            controller.set('user', data.user);
        });
        moment.locale('en', {
            calendar : {
                lastDay : '[Yesterday]',
                sameDay : '[Today]',
                nextDay : '[Tomorrow]',
                lastWeek : '[last week]',
                nextWeek : 'dddd',
                sameElse : 'dddd MMM Do'
            }
        });

    }
});

