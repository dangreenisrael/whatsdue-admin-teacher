/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    didInsertElement: function(){
        Ember.$('#timepicker').timepicker(
            {'showInputs': false}
        );
    }
});