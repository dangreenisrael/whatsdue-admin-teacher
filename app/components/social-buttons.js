/**
 * Created by Dan on 9/17/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    popup: function (url) {
        window.open(url,
            '_blank',
            'width=600, height=600');
    },
    actions:{
        tweet: function(id){
            var message = encodeURIComponent("My class loves that I use @whatsdue to help them keep track of their work. Sign up at: http://admin.whatsdueapp.com/referral/"+id);
            this.popup('https://twitter.com/home?status='+message);
        },
        share: function(id){
            this.popup('https://www.facebook.com/sharer/sharer.php?u=http://admin.whatsdueapp.com/referral/'+id);
        }
    }
});