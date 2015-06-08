import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        save: function() {
            console.log(this.get('model'));
            this.get('model').save();

            //if (validateAssignment() == true) {
            //    this.get('model').save();
            //}else{
            //    alert("Please double check that everything is filled out")
            //}
            return true;
        },
        remove: function(){
            var model = this.get('model');
            model.destroyRecord();
            return true;
        },
        close: function(){
           return true;
        }
    }

});
