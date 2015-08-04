import Ember from 'ember';

/* global moment */


export default Ember.Controller.extend({
    user:{},
    mobileMenuToggle: false,
    mobileMenu: function(){
        if (this.get('mobileMenuToggle') === true){
            return 'mobileMenuVisible';
        } else{
            return 'mobileMenuHidden';
        }
    }.property('mobileMenuToggle'),
    init: function(){
        var controller = this;
        Ember.$.get("/api/teacher/user", function( data ) {
            var userData = data.user;
            var createdAt = moment(userData.signup_date).format('X');
            if (userData.signup_date === undefined){
                createdAt = 1429142400;
            }
            controller.set('user', data.user);
            window.Intercom('boot', {
                app_id: "kqf71wt5",
                name: userData.first_name+" "+userData.last_name,
                user_id: userData.id,
                email: userData.email,
                created_at: createdAt
            });
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