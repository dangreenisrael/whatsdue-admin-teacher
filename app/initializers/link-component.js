/**
 * Created by Dan on 8/7/15.
 */
import Ember from 'ember';

export default {
    initialize: function() {
        Ember.LinkComponent.reopen({
            attributeBindings: ['data-toggle']
        });
    }
};