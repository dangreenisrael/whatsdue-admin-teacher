/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    actions: {
        click: function (route, course, assignment) {
            this.sendAction('action', route, [course, assignment]);
        }
    }
});