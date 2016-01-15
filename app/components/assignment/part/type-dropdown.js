/**
 * Created by Dan on 6/5/15.
 */
import Ember from 'ember';
import DropdownComponentMixin from 'ember-rl-dropdown/mixins/rl-dropdown-component';

export default Ember.Component.extend(DropdownComponentMixin, {
    currentOption: "Homework",
    options: ["Homework", "Project", "Quiz", "Test"],
    custom: false,
    actions:{
        select: function(value){
            this.set('currentOption', value);
            this.set('selection', value);
            this.set('dropdownExpanded', false);
            if (value===""){
                this.set('custom', true);
                Ember.run.later(function(){
                    Ember.$('.assignmentCategory').focus();
                }, 100);
            } else{
                Ember.$('#assignmentDescription').focus();
            }
        }
    }
});