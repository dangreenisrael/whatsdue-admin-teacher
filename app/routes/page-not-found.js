import Ember from 'ember';
import ENV from 'whatsdue-admin-teacher/config/environment';
/* global moment, __insp */

export default Ember.Route.extend({
    beforeModel: function(){
        this.transitionTo('secure');
    }
});
