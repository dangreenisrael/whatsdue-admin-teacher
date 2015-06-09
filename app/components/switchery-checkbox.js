/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
/* global Switchery */

export default Ember.Component.extend({

    didInsertElement: function(){
        var elem = document.querySelector('.js-switch');
        var switchElement = new Switchery(elem);
        this.set('switchElement', switchElement);
    }
});