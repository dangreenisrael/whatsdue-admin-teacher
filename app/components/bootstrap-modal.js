/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    didInsertElement: function(){
        Ember.$('#Modal').modal({
            show: true,
            backdrop: false,
            keyboard: false
        });
        setTimeout(function(){
            Ember.$('input.focus').focus();
        },500);
    }
});