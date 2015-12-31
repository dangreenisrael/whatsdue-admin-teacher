import Ember from 'ember';
/* global __insp */
export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({ outlet: 'main' });
    },
    didTransition: function() {
        __insp.push(["virtualPage"]);
    },
    beforeModel: function() {
        Ember.$.get("/api/teacher/user",
            response => {
            if (!response.user){
                //this.transitionTo('login');
            } else{
                this.transitionTo('secure');
            }
        });
    },
    actions: {
        error: function(error){
          console.log(error);
        },
        modal: function(route, param){
            if (param === undefined){
                this.transitionTo(route);
            } else if (param.constructor === Array){
                if (param.length === 2){
                    this.transitionTo(route, param[0], param[1]);
                }
            } else{
                this.transitionTo(route, param);
            }
        },
        tooltip: function(walkthrough){
            console.log('tooltip');
            this.render(walkthrough, {
                into: 'application',
                outlet: 'tooltips'
            });
        },
        inviteUsers: function(){
            this.render('message/email/invite', {
                into: 'application',
                outlet: 'modal'
            });
        },
        toggleMenu: function() {
            this.controller.toggleProperty('mobileMenuToggle');
            return false;
        },
        hideMenu: function() {
            if (this.controller.get('mobileMenuToggle') === true){
                this.controller.set('mobileMenuToggle', false);
            }
        },
        close: function(){
            this.transitionTo('secure.course', window.lastCourse);
        },
        save: function(){
            let route = this;
            Ember.$.get("/api/teacher/user", function( data ) {
                var userData = data.user;
                window.Intercom('update', {
                    "Total Courses": userData.total_courses,
                    "Total Assignments": userData.total_assignments,
                    "Unique Students": userData.unique_students
                });

                route.mixpanel.peopleSet({
                    "Total Courses": userData.total_courses,
                    "Total Assignments": userData.total_assignments,
                    "Unique Students": userData.unique_students
                });
            });
            this.transitionTo('secure.course', window.lastCourse);
        },
        remove: function() {
            this.transitionTo('secure.course', window.lastCourse);
        },
        send: function(){
            this.transitionTo('secure.course', window.lastCourse);
        }
    }
});