/**
 * Created by Dan on 6/5/15.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    sortDirection: 'asc',
    sortProperty: 'student_id.first_name',
    displayProperty: 'first_name',
    sortBy: function(){
        let sortProperty = this.get('sortProperty');
        let sortDirection = this.get('sortDirection');
        return [sortProperty+":"+sortDirection];
    }.property('sortDirection', 'sortProperty'),
    statusesSorted: Ember.computed.sort(
        'assignment.statuses', 'sortBy'),
    actions:{
        sortBy: function(property) {
            if (property === this.get('displayProperty')){
                if (this.get('sortDirection') === 'asc'){
                    this.set('sortDirection', 'desc');
                } else{
                    this.set('sortDirection', 'asc');
                }
            } else {
                if (property === "completed"){
                    this.set('sortProperty', 'completed');
                } else if (property === "seen"){
                    this.set('sortProperty', 'seen');
                } else{
                    this.set('sortProperty', 'student_id.'+property);
                }
                this.set('displayProperty', property);
            }
        },
        close: function(){
            this.sendAction('close');
        }
    }
});