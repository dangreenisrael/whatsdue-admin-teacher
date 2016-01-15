/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";
export default Ember.Component.extend({
    sortDirection: 'asc',
    sortProperty: 'timestamp',
    timestamp: 'sorting',
    sortBy: function(){
        let sortProperty = this.get('sortProperty');
        let sortDirection = this.get('sortDirection');
        return [sortProperty+":"+sortDirection];
    }.property('sortDirection', 'sortProperty'),
    assignmentsSorted: Ember.computed.sort(
        'assignmentsFiltered', 'sortBy'),
    assignmentsFiltered: Ember.computed('assignments.@each.situation','selectionMade', 'situation', function(){
        return this.get('assignments').filterBy('situation', this.get('situation'));
    }),
    bulkButton: Ember.computed('situation', function(){
       if (this.get('situation') === "deleted"){
           return "Un-delete";
       } else{
           return "Delete";
       }
    }),
    bulkButtonBackground: Ember.computed('situation', function(){
        if (this.get('situation') === "deleted"){
            return "btn-success";
        } else{
            return "btn-danger";
        }
    }),
    didInsertElement: function() {
        this.renderChildTooltips(); // Voila!
    },
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
        bulkAction: function(){
            if (this.get('situation') === "deleted"){
                this.get('selected').forEach(function(assignment) {
                    assignment.set('archived', false);
                    assignment.set('selected', false);
                    assignment.save();
                });
            } else {
                this.get('selected').forEach(function(assignment){
                    assignment.set('archived', true);
                    assignment.set('selected', false);
                    assignment.save();
                });
            }
            this.set('selectionMade', false);
        }
    }
});