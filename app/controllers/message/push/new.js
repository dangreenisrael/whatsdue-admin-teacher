import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        save: function() {
            var data = this.get('model');
            this.store.createRecord('message', {
                course_id:          data,
                body:               data.body,
                title:              data.title
            }).save();
        }
    }
});

