/**
 * Created by Dan on 6/5/15.
 */
import Ember from 'ember';
import DropdownComponentMixin from 'ember-rl-dropdown/mixins/rl-dropdown-component';

export default Ember.Component.extend(DropdownComponentMixin, {
    // Some additional custom behaviour
    dropdownVisibility: "visible",
    inputVisibility: "hidden",
    currentOption: "Homework",
    options: ["Homework", "Project", "Test", "Quiz"],
    actions:{
        select: function(value){
            this.set('currentOption', value);
            this.set('selection', value);
        },
        customize: function(){
            this.set('dropdownVisibility', "hidden");
            this.set('inputVisibility', "visible");
        }
    }
});