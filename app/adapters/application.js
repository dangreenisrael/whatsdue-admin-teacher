/**
 * Created by dan on 2014-05-13.
 */

import DS from "ember-data";

export default DS.RESTAdapter.extend({
    namespace: 'api/teacher',
    shouldReloadAll: function() {
        return true;
    },
    shouldBackgroundReloadRecord: function() {
        return true;
    }
});