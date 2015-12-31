/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    init: function(){
        console.log('hi');
        Ember.run.later(this, function(){
            console.log("ran");
            Ember.$('#timepicker').timepicker(
                {
                    showInputs: false,
                    disableFocus: true
                }
            );
        }, 500);
    },
    didInsertElement: function(){
        Ember.$('#timepicker').timepicker(
            {
                showInputs: false,
                disableFocus: true
            }
        );
    }
});