/**
 * Created by Dan on 6/5/15.
 */
import Ember from "ember";

export default Ember.Component.extend(Ember.SortableMixin,{
    sort: "desc",
    time: "sorting",
    sorted : function(){
        return Ember.ArrayController.create({
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
            this.sendAction('action', route, [course, assignment]);
        }
    }
});