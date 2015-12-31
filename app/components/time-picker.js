/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    didInsertElement: function(){
        Ember.$('#timepicker').timepicker(
            {
                showInputs: false,
                disableFocus: true
            }
        );
    },
    actions: {
        toggleTime: function(){
            Ember.$('.js-switch').click();
        }
    },
    showPicker: function(){
        if (this.get('timepickerEnabled')){
            Ember.run.later(this, function(){
                Ember.$('#timepicker').timepicker(
                    {
                        showInputs: false,
                        disableFocus: true
                    }
                );
                Ember.$('#timepicker').click();
            },50);
        }
    }.observes('timepickerEnabled')
});