/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
/* global moment */

export default Ember.Component.extend({
    timepickerEnabled: false,
    assignment_name: "Homework",
    headingSeparator: function(){
        var selection = this.get('assignment_name');
        if ( (selection === "Homework") || (selection ==="Project")){
            return "due";
        }
    }.property('assignment_name'),
    tomorrow: function(){
        return moment().add(1, 'days').toDate();
    }.property(),
    due_date_raw: function(){
        return this.get('tomorrow');
    }.property(),
    due_date: function(){
        return this.get('due_day')+" "+this.get('due_time');
    }.property('due_date_raw', 'display_time', 'due_time'),
    due_day:function(){
        return moment(this.get('due_date_raw')).format('YYYY-MM-DD');
    }.property('due_date_raw'),
    due_time: function(){
        return moment(this.get('display_time'), "H:mm A").format('HH:mm');
    }.property('display_time'),
    due_date_human_readable: function(){
        return moment(this.get('due_day'), "YYYY-MM-DD").calendar();
    }.property('due_date_raw'),
    actions: {
        toggleTime: function(){
            Ember.$('.js-switch').click();
        },
        save: function() {
            var data = {
                due_date:           this.get('due_date'),
                assignment_name:    this.get('assignment_name'),
                description:        this.get('description'),
                time_visible:       this.get('timepickerEnabled')
            };
            this.sendAction('save', data);
        },
        close: function(){
            this.sendAction('close');
        },
        remove: function(){
            this.sendAction('remove');
        }
    },
    watchCheckbox: function() {
        if (this.get('timepickerEnabled')){
            setTimeout(function(){
                Ember.$('#timepicker').click();
            },5);
        }
    }.observes('timepickerEnabled'),
    watchDateChange: function(){
            Ember.$('#assignmentDescription').focus();
    }.observes('due_date_raw','timepickerEnabled'),
    startUp: function(){
        setTimeout(function(){
            Ember.$('#assignmentDescription').focus();
        },500);
    }.on('init')
});