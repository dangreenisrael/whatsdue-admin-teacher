/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    timepickerEnabled: false,
    assignment_name: "Homework",
    headingSeparator: function(){
        var selection = this.get('assignment_name');
        if ( (selection === "Homework") || (selection ==="Project")){
            return "due"
        }
    }.property('assignment_name'),
    tomorrow: function(){
        return moment().add(1, 'days').format();
    }.property(),
    due_date_raw: function(){
        return this.get('tomorrow');
    }.property(),
    due_date: function(){
        var day = moment(this.get('due_date_raw')).format('YYYY-MM-DD');
        var time = moment(this.get('display_time'), "H:mm A").format('HH:mm');
        return day+" "+time;
    }.property('due_date_raw', 'display_time'),
    due_day:function(){
        return moment(this.get('due_date_raw')).format('YYYY-MM-DD');
    }.property('due_date_raw'),
    due_date_human_readable: function(){
        return moment(this.get('due_date_raw')).calendar();
    }.property('due_date_raw'),
    actions: {
        toggleTime: function(){
            $('.js-switch').click();
        },
        save: function() {
            var data = {
                due_date:           this.get('due_date'),
                assignment_name:    this.get('assignment_name'),
                description:        this.get('description')
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
            },5)
        }
    }.observes('timepickerEnabled')
});