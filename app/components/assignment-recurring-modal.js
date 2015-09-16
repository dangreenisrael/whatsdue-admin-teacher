/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
/* global moment */

export default Ember.Component.extend({
    sunday:     false,
    monday:     false,
    tuesday:    false,
    wednesday:  false,
    thursday:   false,
    friday:     false,
    saturday:   false,
    timepickerEnabled: false,
    saving: false,
    display_time: "9:00 AM",
    assignment_name: "Homework",
    today: function(){
      return moment().toDate();
    }.property(),
    startDateRaw: function(){
        return moment().add(1, 'days').toDate();
    }.property(),
    endDateRaw: function(){
        return moment().add(1, 'months').toDate();
    }.property(),
    endDate: function(){
        return moment(this.get('endDateRaw')).calendar();
    }.property('endDateRaw'),
    dayList: function(){
        var days = {
            Sunday:     this.get('sunday'),
            Monday:     this.get('monday'),
            Tuesday:    this.get('tuesday'),
            Wednesday:  this.get('wednesday'),
            Thursday:   this.get('thursday'),
            Friday:     this.get('friday'),
            Saturday:   this.get('saturday')
        };
        var dayList = [];
        for (var day in days){
            if (days.hasOwnProperty(day)) {
                if(days[day] === true){
                    dayList.push(day);
                }
            }
        }
        return dayList;
    }.property('sunday,monday,tuesday,wednesday,thursday,friday,saturday'),
    getDueDates: function(){
        var startDate   = this.get('startDateRaw');
        var endDate     = moment(this.get('endDateRaw'));
        var dayRange    = endDate.diff(startDate, 'days');
        var dueDates    = [];
        var time        = moment(this.get('display_time'), "h:mm A");
        var minute      = time.minutes();
        var hour        = time.hours();


        /* Find all the dates in the range of weeks given for days of the week */
        this.get('dayList').forEach(function(day){
            var eachDay = moment(startDate).day(day).minute(minute).hour(hour);
            if (!eachDay.isAfter(endDate) && !eachDay.isBefore(startDate)){
               dueDates.push(eachDay.format('YYYY-MM-DD HH:mm'));
            }
            for (var i = 0; i <= dayRange; i+=7){
                eachDay.add(7, 'days');
                if (!eachDay.isAfter(endDate) && !eachDay.isBefore(startDate)){
                    dueDates.push(eachDay.format('YYYY-MM-DD HH:mm'));
                }
            }
        });
        return dueDates;
    },
    actions: {
        toggleTime: function(){
            Ember.$('.js-switch').click();
        },
        save: function() {
            var data = {
                assignment_name:    this.get('assignment_name'),
                description:        this.get('description'),
                time_visible:       this.get('timepickerEnabled')
            };
            var dueDates = this.getDueDates();
            if(dueDates.length > 15){
                var confirm = window.confirm("You are about to add "+dueDates.length+" assignments.\n\n" +
                    "This may cause in app performance issues.\n\n" +
                    "Press 'OK' to do add them anyway.");
                if (confirm) {
                    this.sendAction('save', data, dueDates);
                    this.set('saving', true);
                }
            } else{
                this.sendAction('save', data, dueDates);
                this.set('saving', true);
            }
        },
        close: function() {
            this.sendAction('close');
        },
        toggle: function(day){
            this.toggleProperty(day);
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