/**
 * Created by Dan on 8/30/15.
 */

/* Start Inspectlet */
window.__insp = window.__insp || [];


/* End Inspectlet Embed Code */


/* Add containsLink method to String */
String.prototype.containsLink = function() {
    return (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(this));
};

