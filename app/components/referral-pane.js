import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function() {
        this.renderChildTooltips(); // Voila!
    },
    popup: function (url) {
        window.open(url,
            '_blank',
            'width=800, height=400');
    }
});