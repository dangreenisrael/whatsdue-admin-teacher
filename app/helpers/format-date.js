import Ember from "ember";

export default Ember.Helper.helper( function(params) {
    let formattedDate = params[0].format(params[1]);
    return Ember.String.htmlSafe(formattedDate);
});