import Ember from 'ember';

/* global moment */
/* global mixpanel */

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
    addCourseTooltip: function () {
        //this.send('tooltip', 'walkthrough.add-course');
    }.observes('model'),
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
                app_id:             "kqf71wt5",
                name:               userData.first_name+" "+userData.last_name,
                institution_name:   userData.institution_name,
                user_id:            userData.id,
                email:              userData.email,
                created_at:         createdAt,
                total_courses:      userData.total_courses,
                total_assignments:  userData.total_assignments,
                unique_students:    userData.unique_students
            });
            mixpanel.identify(userData.id);
            mixpanel.people.set({
                "$email":           userData.email,
                "$created":         userData.signup_date,
                "$last_login":      new Date(),
                name:               userData.first_name+" "+userData.last_name,
                institution_name:   userData.institution_name,
                user_id:            userData.id,
                email:              userData.email,
                created_at:         createdAt,
                total_courses:      userData.total_courses,
                total_assignments:  userData.total_assignments,
                unique_students:    userData.unique_students
            });
            /*  */
            __insp.push(['tagSession', {
                first_name: userData.first_name,
                last_name: userData.last_name,
                id: userData.id
            }]);

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

        var hash = window.location.hash.substr(1);
        if (hash === "" || hash === "/"){
            this.store.find('course').then(function(records){
                var courseId = records.filterBy('archived', false).get('firstObject').get('id');
                controller.transitionToRoute('courses.course', courseId);
            });
        }

        if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            alert(
                "Hi\n\n" +
                "Thanks for using WhatsDue. We're still " +
                "working on optimizing the mobile experience. " +
                "For now, we suggest using WhatsDue on desktop\n\n" +
                "Sorry for the inconvenience."
            );
        }

    }
});