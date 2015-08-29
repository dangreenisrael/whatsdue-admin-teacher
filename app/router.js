import Ember from 'ember';


var Router = Ember.Router.extend({
    location: 'hash'
});

Router.map(function() {
    this.route('courses', {path: '/'}, function(){
        this.route('course', {path: 'course/:course_id'}, function(){
            this.route('edit');
            this.route('info');
            this.route('assignment', function(){
                this.route('new');
                this.route('edit',   {path:':assignment_id/edit'});
                this.route('status', {path:':assignment_id/status'})
            });
        });
        this.route('new');

    });

    this.route('message', function(){
        this.route('email', function(){
            this.route('invite');
        });
    });
    this.route('walkthrough', function(){
        this.route('add-course', function(){
        });
    });
    this.route('message', function(){
        this.route('email', function(){
            this.route('invite', function(){
            });
        });
    });
    this.route('user');
});

export default Router;
