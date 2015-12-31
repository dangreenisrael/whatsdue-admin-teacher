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

describe('Acceptance: Existing User', function() {
  var application;
  beforeEach(function() {
    application = startApp();
    visit('/');
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  it('Opens properly', function() {
    expect(currentURL()).to.equal('/course/345');
  });

  it('Can add a blank assignment (ID: 12345)', function(){
    click('#add-assignment');
    andThen(function(){
      click("button.save");
      andThen(function(){
        expect($('#12345'), "Added assignment").to.exist;
      });
    });
  });

  it('Can cancel adding a blank assignment', function(){
    click('#add-assignment');
    andThen(function(){
      click("button.close");
      andThen(function(){
        expect(find('#Modal').is(':visible')).to.equal(false);
      });
    });
  });

});
