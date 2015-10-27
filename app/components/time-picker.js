/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        toggleTime: function(){
            Ember.$('.js-switch').click();
        }
    },
    showPicker: function(){
        if (this.get('timepickerEnabled')){
            setTimeout(function(){
                console.log('hi');
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