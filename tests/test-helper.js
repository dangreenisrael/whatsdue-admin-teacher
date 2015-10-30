import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import 'selenium-webdriver';
/* global mocha, chai */
setResolver(resolver);

mocha.setup({
    timeout: 10000,
    slow: 2000
});

//var chaiWebdriver = require('chai-webdriver');
//console.log(chaiWebdriver);
console.log(chai);