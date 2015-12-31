import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render({
            outlet: 'main',
            into: 'application'
        });
    },
    model: function(){
        let route = this;
        return this.store.findAll('user').then(function(user){
            route.store.findAll('assignment');
            return user.get('firstObject');
        });
    },
    afterModel: function(user){

        this.store.findAll('course').then(courses=>{
            courses = courses.filterBy('archived', false);
            if(courses.length < 1){
                this.transitionTo('secure.new-course');
            } else{
                var firstCourse = courses.get('firstObject').get('id');
                this.transitionTo('secure.course', firstCourse);
            }
        });

        var route       = this,
            createdAt           = moment(user.get('signup_date')).format('X'),
            signup_date         = user.get('signup_date'),
            userId              = user.get('id'),
            first_name          = user.get('first_name'),
            last_name           = user.get('last_name'),
            email               = user.get('email'),
            salutation          = user.get('salutation'),
            institution_name    = user.get('institution_name'),
            total_assignments   = user.get('total_assignments'),
            total_courses       = user.get('total_courses'),
            unique_invitations  = user.get('unique_invitations'),
            unique_students     = user.get('unique_students'),
            courses             = user.get('courses');

        var fullName = first_name+" "+last_name;
        window.Intercom('boot', {
            app_id:                 "kqf71wt5",
            email:                  email,
            user_id:                userId,
            name:                   first_name+" "+last_name,
            "Institution Name":     institution_name,
            "Created At":           createdAt,
            "Total Courses":        total_courses,
            "Total Assignments":    total_assignments,
            "Unique Students":      unique_students
        });
        route.mixpanel.identify(userId);
        route.mixpanel.peopleSet({
            "$email":               email,
            "$created":             signup_date,
            "$last_login":          new Date(),
            "$name":                fullName,
            "Institution Name":     institution_name,
            "User ID":              userId,
            "Email":                email,
            "Created At":           createdAt,
            "Total Courses":        total_courses,
            "Total Assignments":    total_assignments,
            "Unique Students":      unique_students
        });
        route.mixpanel.trackEvent("Logged In");
        /* Begin Inspectlet */
        if (ENV.environment === 'production') {
            window.__insp = window.__insp || [];
            __insp.push(['wid', 2075519626]);
            (function () {
                function ldinsp() {
                    if (typeof window.__inspld !== "undefined") {
                        return;
                    }
                    window.__inspld = 1;
                    var insp = document.createElement('script');
                    insp.type = 'text/javascript';
                    insp.async = true;
                    insp.id = "inspsync";
                    insp.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js';
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(insp, x);
                }
                setTimeout(ldinsp, 500);
                document.readyState !== "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
            })();
            __insp.push(['identify',    fullName]);
            __insp.push(['tagSession', {
                id: userId,
                school: institution_name
            }]);
            console.log('started inspectlet');
            /* End Inspectlet */
        }
        window.moment.locale('en', {
            calendar : {
                lastDay : '[Yesterday]',
                sameDay : '[Today]',
                nextDay : '[Tomorrow]',
                lastWeek : '[last week]',
                nextWeek : 'dddd',
                sameElse : 'dddd MMM Do'
            }
        });

        if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            alert(
                "Hi\n\n" +
                "Thanks for using WhatsDue. We're still " +
                "working on optimizing the mobile experience. " +
                "For now, we suggest using WhatsDue on desktop\n\n" +
                "Sorry for the inconvenience."
            );
        }
    },
    actions: {
        logout: function(){
            this.transitionTo('login');
            this.store.unloadAll();
            Ember.$.get(ENV.accessNamespace+"/logout");
        }
    }
});
