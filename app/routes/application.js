import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({ outlet: 'main' });
        if(this.store.peekAll('course').filterBy('archived', false).length < 1){
            this.transitionTo('courses.new');
        }
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
            this.goBack();
        },
        remove: function(){
            this.goBack();
        },
        send: function(){
            this.goBack();
        }
    }
});