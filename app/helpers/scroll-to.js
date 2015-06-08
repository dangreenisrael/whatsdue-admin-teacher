import Ember from "ember";
/* global linkifyCordova */

export default Ember.Handlebars.makeBoundHelper( function(id, name) {

    return new Ember.Handlebars.SafeString("<li id='" +id+ "Panel'><i class='fa fa-sort'></i><span onclick='scrollToId("+id+")'>"+name+"</span></li>");
});