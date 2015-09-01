/**
 * Created by Dan on 8/30/15.
 */

/* Start Inspectlet */
window.__insp = window.__insp || [];

__insp.push(['wid', 2075519626]);
(function() {
    function __ldinsp(){var insp = document.createElement('script');
        insp.type = 'text/javascript';
        insp.async = true; insp.id = "inspsync";
        insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x);
    }
    if (window.attachEvent) {
        window.attachEvent('onload', __ldinsp);
    }
    else {
        window.addEventListener('load', __ldinsp, false);
    }
})();

/* End Inspectlet Embed Code */


/* Add containsLink method to String */
String.prototype.containsLink = function() {
    return (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(this));
};

