import Ember from 'ember';

var Router = Ember.Router.extend({
  location: 'hash'
});

Router.map(function() {
    this.route('dashboard', {path: '/'}, function(){
        this.route('courses', function(){
            this.route('course', {path: 'course/:course_id'}, function(){
                this.route('edit');
                this.route('assignment', function(){
                    this.route('new');
                    this.route('edit', {path:':assignment_id'});
                });

            });
        });

        this.route('newCourse');
        this.route('message', function(){
            this.route('email', function(){
                this.route('invite');
            });
            this.route('push', function(){
                this.route('new');
                this.route('history');
            });
        });
    });
    this.route('walkthrough', function(){
        this.route('intro', function(){
        });
    });
    this.route('user');
});

export default Router;
