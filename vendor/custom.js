/**
 * Created by Dan on 9/23/14.
 */
/* Start Inspectlet */
window.__insp = window.__insp || [];

__insp.push(['wid', 2075519626]);
(function() {
    function __ldinsp(){var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); }
    if (window.attachEvent) window.attachEvent('onload', __ldinsp);
    else window.addEventListener('load', __ldinsp, false);
})();

/* End Inspectlet Embed Code */


/* Extend jQuery */
(function($){
    $.expr[':'].text = function(obj, index, meta, stack){
        return ($(obj).text() === meta[3])
    };
})(jQuery);


function trackEvent(event, firstOption, firstValue, secondOption, secondValue){
    firstOption = firstOption || null;
    firstValue = firstValue || null;
    secondOption = secondOption || null;
    secondValue = secondValue || null;

    var options = {};
    options['username'] = user.email;
    if (firstOption != null) {
        options[firstOption] = firstValue;
        if (secondOption != null) {
            options[secondOption] = secondValue;
        }
    }

    //ll('tagEvent', event, options);
}