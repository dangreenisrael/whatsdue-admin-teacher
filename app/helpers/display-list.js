import Ember from "ember";

export default Ember.Helper.helper( function(list) {
    list = list[0];
    var displayList = "";
    var length = list.length-1;
    for (var i = 0; i <= length; i++){
        if (i === 0){
            displayList += list[i];
        } else if (i === length){
            displayList += " and "+ list[i];
        } else{
            displayList += ", "+ list[i];
        }
    }
    return Ember.String.htmlSafe(displayList);
});