/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    selection: "Homework",
    headingSeparator: function(){
        var selection = this.get('selection');
        if ( (selection === "Homework") || (selection ==="Project")){
            return "due"
        }
    }.property('selection'),
    tomorrow: function(){
        return moment().add(1, 'days').format();
    }.property(),
    due_date_raw: function(){
        return this.get('tomorrow');
    }.property(),
    due_date: function(){
        console.log('due_date');
        return moment(this.get('due_date_raw')).format('YYYY-MM-DD 08:00');
    }.property('due_date_raw'),
    due_date_human_readable: function(){
        console.log('due_date_readable');
        return moment(this.get('due_date_raw')).calendar();
    }.property('due_date_raw'),
    actions: {
        save: function() {
            var data = {
                due_date:           this.get('due_date'),
                assignment_name:    this.get('selection'),
                description:        this.get('description')
            };
            this.sendAction('save', data);
        },
        close: function(){
            this.sendAction('close');
        }
    }
});