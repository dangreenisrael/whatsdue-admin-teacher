/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend(Ember.SortableMixin,{
    sort: "desc",
    time: "sorting",
    sortProperties: ['timestamp'],
    sortAscending: true,
    sorted : function(){
        return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
            sortProperties: ['timestamp'],
            sortAscending: true,
            content : this.get('assignments')
        });

    }.property('assignments'),
    actions: {
        sortBy: function(property) {
            this.get("sorted").set("sortProperties",[property]);
            this.get("sorted").toggleProperty('sortAscending');

            if (property === "assignment_name"){
                this.set('name', "sorting");
                this.set('time', "");

            } else{
                this.set('name',"");
                this.set('time',"sorting");
            }
            if (this.get("sorted").get('sortAscending') === true){
                this.set('sort', "desc");
            } else{
                this.set('sort', "asc");
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