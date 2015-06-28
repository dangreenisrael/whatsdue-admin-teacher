import Ember from 'ember';

export default Ember.Route.extend({
    checkLogin: function(){
        Ember.$.get("/api/teacher/user").fail(function(){
                alert('You have been logged out due to inactivity');
                window.location = "/login";
            });
    },
    actions: {
        modal: function(route, param){
            this.checkLogin();
            if (param === undefined){
                this.transitionTo(route);
            } else if (param.constructor === Array){
                if (param.length === 2){
                    this.transitionTo(route, param[0], param[1]);
                }
            } else{
                this.transitionTo(route, param);
            }
            Ember.$('#Modal').modal('show');
        },
        save: function(){
            Ember.$('#Modal').modal('hide');
            this.transitionTo('dashboard.courses.course');
        },
        close: function(){
            Ember.$('#Modal').modal('hide');
            this.transitionTo('dashboard.courses.course');
        },
        remove: function(){
            Ember.$('#Modal').modal('hide');
            this.transitionTo('dashboard.courses.course');
        },
        walkthrough: function(walkthrough){
            if (walkthrough === "intro" ){
                this.render('walkthrough/intro', {
                    into: 'application',
                    outlet: 'tooltips'
                });
            }
        },
        inviteUsers: function(){
            this.checkLogin();
            this.render('message/email/invite', {
                into: 'application',
                outlet: 'modal'
            });
            Ember.$('#Modal').modal('show');
        },
        toggleMenu: function() {
            this.controller.toggleProperty('mobileMenuToggle');
            return false;
        },
        hideMenu: function() {
            if (this.controller.get('mobileMenuToggle') === true){
                console.log('touched');
                //this.controller.set('mobileMenuToggle', false);
            }
        }
    }
});