/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({

    actions: {
        modal: function (route, param) {
            this.sendAction('modal', route, param);
        }
    }
});