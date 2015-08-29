/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    didInsertElement: function(){
        Ember.$('#Modal').modal('show');
        setTimeout(function(){
            Ember.$('input.focus').focus();
        },500);
    },
    willDestroyElement: function () {
        Ember.$('#Modal').modal('hide');
    }
});