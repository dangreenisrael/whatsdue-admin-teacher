/**
 * Created by Dan on 6/9/15.
 */
import Ember from 'ember';

export default Ember.View.extend({
    testProperty: "timepicker test",
    didInsertElement: function(){
        console.log('inserted timepicker')
    },
    afterRender: function(){
        console.log('Timepicker rendered');
    }
});


