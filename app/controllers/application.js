import Ember from 'ember';

/* global CustomFunctions */
export default Ember.Controller.extend({

    init: function(){
        moment.locale('en', {
            calendar : {
                lastDay : '[Yesterday]',
                sameDay : '[Today]',
                nextDay : '[Tomorrow]',
                lastWeek : '[last week]',
                nextWeek : 'dddd',
                sameElse : 'dddd MMM Do'
            }
        });

    }
});

