/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'message/invite-users',
  'Integration: MessageInviteUsersComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#message/invite-users}}
      //     template content
      //   {{/message/invite-users}}
      // `);

      this.render(hbs`{{message/invite-users}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
