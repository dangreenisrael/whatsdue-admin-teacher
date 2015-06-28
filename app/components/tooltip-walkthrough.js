/**
 * Created by Dan on 6/5/15.
 */
import Ember from 'ember';

export default Ember.Component.extend( {
    launchJoyride: function(){
        Ember.$(document).foundation('joyride', 'start', {
            modal: false,
            template : { // HTML segments for tip layout
                link        : '<a href="#close" class="joyride-close-tip">&times;</a>',
                timer       : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                tip         : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
                wrapper     : '<div class="joyride-content-wrapper"></div>',
                button      : '<a href="#" class="btn btn-primary joyride-next-tip"></a>',
                prev_button : '<a href="#" class="btn btn-primary joyride-prev-tip"></a>'
            }
        });
    },
    didInsertElement: function(){
        this.launchJoyride();
    }
});