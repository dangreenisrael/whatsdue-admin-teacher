/**
 * Created by Dan on 29/10/2015.
 */
import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        toggleMenu: function () {
            this.sendAction('toggleMenu');
        }
    }
});