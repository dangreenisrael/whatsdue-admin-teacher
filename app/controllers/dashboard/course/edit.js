import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save: function() {
            this.get('model').save();
            return true;
        },
        remove: function(){
            this.get('model').destroyRecord();
            return true;
        },
        close: function(){
            this.get('model').rollback();
            return true;
        }
    }
});