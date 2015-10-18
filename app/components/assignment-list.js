/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
//Ember.SortableMixin,
export default Ember.Component.extend({
    sortDirection: 'asc',
    sortProperty: 'timestamp',
    sortBy: function(){
        let sortProperty = this.get('sortProperty');
        let sortDirection = this.get('sortDirection');
        return [sortProperty+":"+sortDirection]
    }.property('sortDirection', 'sortProperty'),
    sorted: Ember.computed.sort('assignments', 'sortBy'),
    actions: {
        sortBy: function(property) {
            this.set('assignment_name', "");
            this.set('timestamp', "");
            this.set(property, "sorting");
            if (property === this.get('sortProperty')){
                if (this.get('sortDirection') === 'asc'){
                    this.set('sortDirection', 'desc');
                } else{
                    this.set('sortDirection', 'asc');
                }
            } else {
                this.set('sortProperty', property);
            }
        },
        click: function (route, course, assignment) {
            this.sendAction('modal', route, [course, assignment]);
        },
        select: function(assignment){
            assignment.toggleProperty('selected');
            var selected = this.get('assignments').filterBy('selected');
            this.set('selected', selected);
            this.set('selectionMade', (selected.length > 0));
        },
        bulkDelete: function(){
            this.get('selected').forEach(function(assignment){
                assignment.set('archived', true);
                assignment.set('selected', false);
                assignment.save();
            });
            this.set('selectionMade', false);
        }
    }
});