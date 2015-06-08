import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        save: function() {
            if (validateAssignment() == true) {
                var data = this.get('model');
                var message = this.store.createRecord('message', {
                    course_id:          data,
                    body:               data.body,
                    title:              data.title
                });
                save(message, this);
                save(this.get('model'));
                trackEvent("Sent Message");
                this.transitionToRoute('main');
            } else{
                alert ('Please fill everything out');
            }
        },
        close: function(){
            this.get('model').rollback();
            this.transitionToRoute('main');
        }
    }
});

