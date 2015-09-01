import Ember from 'ember';

/* global moment */
/* global mixpanel */
/* global __insp */

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
            var fullName = userData.first_name+" "+userData.last_name;

            window.Intercom('boot', {
                app_id:                 "kqf71wt5",
                email:                  userData.email,
                user_id:                userData.id,
                name:                   fullName,
                "Institution Name":     userData.institution_name,
                "Created At":           createdAt,
                "Total Courses":        userData.total_courses,
                "Total Assignments":    userData.total_assignments,
                "Unique Students":      userData.unique_students
            });

            mixpanel.identify(userData.id);
            mixpanel.people.set({
                "$email":               userData.email,
                "$created":             userData.signup_date,
                "$last_login":          new Date(),
                "$name":                fullName,
                "Institution Name":     userData.institution_name,
                "User ID":              userData.id,
                "Email":                userData.email,
                "Created At":           createdAt,
                "Total Courses":        userData.total_courses,
                "Total Assignments":    userData.total_assignments,
                "Unique Students":      userData.unique_students
            });
            mixpanel.track("Logged In");
            /*  */
            __insp.push(['identify',    fullName]);
            __insp.push(['tagSession', {
                id: userData.id,
                school: userData.institution_name
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