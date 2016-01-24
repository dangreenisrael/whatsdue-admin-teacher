import Ember from 'ember';

var Router = Ember.Router.extend({
    location: 'history'
});

Router.map(function() {
    this.route('secure', function(){
        this.route('new-course');
        this.route('course', {path: 'course/:course_id'}, function(){
            this.route('edit');
            this.route('info');
            this.route('assignment', function(){
                this.route('edit',   {path:':assignment_id/edit'});
                this.route('status', {path:':assignment_id/status'});
                this.route('new', function(){
                    this.route('recurring');
                });
            });
        });
        this.route('message', function(){
            this.route('email', function(){
                this.route('invite', function(){
                    this.route('confirmation');
                });
            });
        });
        this.route('walkthrough', function(){
            this.route('welcome');
            this.route('add-course');
            this.route('add-assignment',{path: 'add-assignment/:course_id'});
            this.route('send-invites');
        });
    });
    this.route('access', {path: "/"} , function(){
        this.route('login', {path: "/"});
        this.route('register', {path: "/signup"});
    });
});

export default Router;
