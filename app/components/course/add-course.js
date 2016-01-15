import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    setUser: function(){
        let component = this;
        this.get('store').findAll('user').then(function(users){
             component.set('user', users.get('firstObject'));
        });
    }.on('init'),
    actions:{
        close: function(){
            window.history.back();
        },
        save: function() {
            let user = this.get('user');
            let courseName = this.get('course_name');
            let component = this;
            if (typeof courseName === 'undefined'|| courseName ===""){
                this.mixpanel.trackEvent('Course Added Failed',{
                    Reason: "No name given"
                });
                alert("You need to enter a course name");
                return false;
            } else{
                var userName = user.salutation + " " + user.first_name + " " + user.last_name;
                this.get('store').createRecord('course', {
                    course_name: this.get('course_name'),
                    instructor_name: userName
                }).save().then(function(course){
                    component.set('course_name', "");
                    component.sendAction('saved', course);
                });
                this.mixpanel.trackEvent('Course Added');
            }
        }
    }
});