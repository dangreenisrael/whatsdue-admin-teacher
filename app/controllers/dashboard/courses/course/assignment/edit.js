import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        save: function(data) {
            var assignment = this.get('model');
            assignment.set('assignment_name',   data.assignment_name);
            assignment.set('description',       data.description);
            assignment.set('due_date',          data.due_date);
            assignment.save();
            return true;
        },
        remove: function(){
            var model = this.get('model');
            model.destroyRecord();
            return true;
        },
        close: function(){
            this.get('model').rollback();
            return true;
        }
    }

});
