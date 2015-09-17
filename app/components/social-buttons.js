/**
 * Created by Dan on 9/17/15.
 */
import Ember from "ember";

export default Ember.Component.extend({
    popup: function (url) {
        window.open(url,
            '_blank',
            'width=800, height=400');
    },
    actions:{
        tweet: function(){
            var message = encodeURIComponent("Check out WhatsDue at http://whats.com");
            this.popup('https://twitter.com/home?status='+message);
        },
        share: function(){
            this.popup('https://www.facebook.com/sharer/sharer.php?u=http%3A//awesome.com');
        }
    }
});