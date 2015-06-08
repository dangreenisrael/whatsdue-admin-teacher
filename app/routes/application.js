import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        modal: function(route, param){
            if (param === undefined){
                this.transitionTo(route);
            } else if (param.constructor === Array){
                if (param.length === 2){
                    console.log(param);
                    this.transitionTo(route, param[0], param[1]);
                }
            } else{
                this.transitionTo(route, param);
            }
            $('#Modal').modal('show')
        },
        save: function(){
            $('#Modal').modal('hide');
            this.transitionTo('courses');
        },
        close: function(){
            $('#Modal').modal('hide');
            this.transitionTo('courses');
        },
        remove: function(){
            console.log('remove');
            $('#Modal').modal('hide');
            this.transitionTo('courses');
        }
    }
});