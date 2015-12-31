import resolver from './helpers/resolver';
import registerSelectHelper from './helpers/register-select-helper';
registerSelectHelper();
import { setResolver } from 'ember-mocha';
/* global mocha, chai, require */
setResolver(resolver);

mocha.setup({
    timeout: 10000,
    slow: 2000
});
