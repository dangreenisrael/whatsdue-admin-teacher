/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    dueDay: Ember.computed('dueDateMoment',function(){
        return this.get('dueDateMoment').calendar();
    }),
    dueTime: Ember.computed('dueDateMoment', function(){
        return this.get('dueDateMoment').format('h:mm A');
    }),
    cardColour: Ember.computed('dueDay', function(){
        if (this.get('dueDay') === "Tomorrow"){
            return "orange";
        } else{
            return "white";
        }
    })
});