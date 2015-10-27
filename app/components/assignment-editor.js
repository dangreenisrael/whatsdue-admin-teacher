/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
/* global moment */

export default Ember.Component.extend({
    assignment_name: "Homework",
    tomorrow: Ember.computed(function(){
       return moment().add(1, 'days').toDate();
    }),
    dueDateRaw: Ember.computed('dueDateMoment', function(){
        return this.get('dueDateMoment').toDate();
    }),
    updateMoment: function(){
        let time = moment(this.get('display_time'), "h:mm A");
        let hour = time.get('hour');
        let minute = time.get('minute');
        let momentDate = moment(this.get('dueDateRaw')).set('hour', hour).set('minute', minute);
        this.set('dueDateMoment',  momentDate);
    }.observes('dueDateRaw', 'display_time'),
    actions: {
        toggleTime: function(){
            Ember.$('.js-switch').click();
        },
        save: function() {
            this.sendAction('save');
        },
        close: function(){
            this.sendAction('close');
        },
        remove: function(){
            this.sendAction('remove');
        }
    },
    watchDateChange: function(){
            Ember.$('#assignmentDescription').focus();
    }.observes('due_date_raw','timepickerEnabled'),
    startUp: function(){
        setTimeout(function(){
            Ember.$('#assignmentDescription').focus();
        },500);
    }.on('init')
});