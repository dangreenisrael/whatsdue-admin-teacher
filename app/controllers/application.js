import Ember from 'ember';

/* global moment */

export default Ember.Controller.extend({
    user:{},
    mobileMenuToggle: false,
    mobileMenu: function(){
        if (this.get('mobileMenuToggle') === true){
            return 'mobileMenuVisible';
        } else{
            return 'mobileMenuHidden'
        }
    }.property('mobileMenuToggle'),
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