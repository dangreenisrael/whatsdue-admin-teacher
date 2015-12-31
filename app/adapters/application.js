/**
 * Created by dan on 2014-05-13.
 */

import DS from "ember-data";
import ENV from 'whatsdue-admin-teacher/config/environment';

export default DS.RESTAdapter.extend({
    namespace: ENV.namespace
});