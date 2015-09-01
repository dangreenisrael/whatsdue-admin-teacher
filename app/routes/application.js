import Ember from 'ember';
/* global __insp */
/* global mixpanel */
export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({ outlet: 'main' });
        if(this.store.peekAll('course').filterBy('archived', false).length < 1){
            mixpanel.track('New Signup');
            this.transitionTo('courses.new');

        }
    },
    didTransition: function() {
        __insp.push(["virtualPage"]);
    },
    model: function() {
        this.store.findAll('assignment');
        return this.store.findAll('course');
    },
    checkLogin: function(){
        Ember.$.get("/api/teacher/user").fail(function(){
                alert('You have been logged out due to inactivity');
                window.location = "/login";
            });
    },
    goBack: function(){
        var courseId = this.controllerFor('application').get('courseId');
        this.transitionTo('courses.course', courseId);
    },
    actions: {
        didTransition: function(){
            var router = this;
            Ember.$('#Modal').on('hide.bs.modal', function () {
                router.goBack();
            });
        },
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
        },
        tooltip: function(walkthrough){
            console.log('tooltip');
            this.render(walkthrough, {
                into: 'application',
                outlet: 'tooltips'
            });
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
                this.controller.set('mobileMenuToggle', false);
            }
        },
        close: function(){
            this.goBack();
        },
        save: function(){
            Ember.$.get("/api/teacher/user", function( data ) {
                var userData = data.user;
                window.Intercom('update', {
                    "Total Courses": userData.total_courses,
                    "Total Assignments": userData.total_assignments,
                    "Unique Students": userData.unique_students
                });

                mixpanel.people.set({
                    "Total Courses": userData.total_courses,
                    "Total Assignments": userData.total_assignments,
                    "Unique Students": userData.unique_students
                });
            });
            this.goBack();
        },
        remove: function() {
            window.history.back();
        },
        send: function(){
            this.goBack();
        }
    }
});