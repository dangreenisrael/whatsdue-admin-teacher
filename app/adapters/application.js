/**
 * Created by dan on 2014-05-13.
 */

import Ember from "ember";
import DS from "ember-data";

export default DS.RESTAdapter.extend({
    namespace: 'api/teacher',
    host: "https://test.whatsdueapp.com/app_dev.php"
});