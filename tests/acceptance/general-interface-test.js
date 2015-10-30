/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import Ember from 'ember';
import startApp from '../helpers/start-app';

describe('Acceptance: General Interface', function() {
  var application;

  beforeEach(function() {
    application = startApp();
    visit('/');
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  it('Can open the mobile menu', function(){
    click("#menu-toggle");
    andThen(function(){
      expect($(".main-content").hasClass("mobileMenuVisible")).to.be.ok;
    });
  });
});
