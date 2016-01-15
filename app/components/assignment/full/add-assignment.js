import Ember from 'ember';
/* global moment */
export default Ember.Component.extend({
    store: Ember.inject.service(),
    assignmentName: "Homework",
    description: "",
    dueDateMoment: Ember.computed(function(){
        return moment().add(1, 'days').set('hour', 9).set('minute', 0);
    }),
    dueDateTitle: Ember.computed('dueDateMoment', function(){
        return this.get('dueDateMoment').calendar();
    }),
    dueTime: "9:00 AM",
    timeSet: false,
    actions: {
        close: function () {
            this.mixpanel.trackEvent('Add Assignment Canceled');
            this.get('router').transitionTo('secure.course', this.get('course'));
            return true;
        },
        save: function () {
            var controller = this;
            let name = this.get('assignmentName');
            let description = this.get('description');
            let timeVisible = this.get('timeSet');
            let dueDate = this.get('dueDateMoment').format('YYYY-MM-DD HH:mm');
            controller.set('description', "");
            controller.set('assignmentName', "Homework");
            if (name !== "") {
                this.get('store').createRecord('assignment', {
                    course_id: this.get('course'),
                    due_date: dueDate,
                    assignment_name: name,
                    description: description,
                    time_visible: timeVisible
                }).save();
                let descriptionLength = function () {
                    var descriptionWords = description.split(' ').length;
                    if (description.length < 1) {
                        return "None";
                    } else if (descriptionWords < 10) {
                        return "Under 10";
                    } else if (descriptionWords < 30) {
                        return "10 to 30";
                    } else if (descriptionWords < 50) {
                        return "30 to 50";
                    } else {
                        return "Over 50";
                    }
                };

                controller.mixpanel.trackEvent('Assignment Added', {
                        "Description Length": descriptionLength(),
                        "Description Has Link": description.containsLink(),
                        "Assignment Has Time": timeVisible
                    }
                );
                this.sendAction('saved', this.get('course'));
            } else {
                this.mixpanel.trackEvent('Assignment Added Failed', {
                    Reason: "Type not selected"
                });
                alert('Please select activity type');
            }
        }
    }
});
