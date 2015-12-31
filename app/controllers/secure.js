import Ember from 'ember';

export default Ember.Controller.extend({
    user:{},
    mobileMenuToggle: false,
    mobileMenu: function(){
        if (this.get('mobileMenuToggle') === true){
            return 'mobileMenuVisible';
        } else{
            return 'mobileMenuHidden';
        }
    }.property('mobileMenuToggle'),
    actions: {
        toggleMenu: function(){
            this.toggleProperty('mobileMenuToggle');
        }
    }
});