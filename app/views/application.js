/**
 * Created by Dan on 6/27/15.
 */
import Ember from 'ember';

export default Ember.View.extend({
    swipe: function (event) {
        console.log('swipe');
        this.get('controller').send('hideMenu');
        return false; // return `false` to stop bubbling
    },
    tap: function(){
        this.get('controller').send('hideMenu');
        return false;
    }
});