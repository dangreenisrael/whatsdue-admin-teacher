import Ember from 'ember';

export default Ember.Component.extend({
    initialize: function() {
        let blank = '&nbsp',
            check = '<i class="fa fa-check"></i>';
        switch ( this.get('stage') ) {

            case 1:
                this.set('one', 1);
                this.set('two', blank);
                this.set('stage2', "white");
                this.set('three', blank);
                this.set('stage3', "white");
                this.set('four', blank);
                this.set('stage4', "white");

                break;
            case 2:
                this.set('one', check);
                this.set('two', 2);
                this.set('stage2', "solid");
                this.set('three', blank);
                this.set('stage3', "white");
                this.set('four', blank);
                this.set('stage4', "white");

                break;
            case 3:
                this.set('one', check);
                this.set('two', check);
                this.set('stage2', "solid");
                this.set('three', 3);
                this.set('stage3', "solid");
                this.set('four', blank);
                this.set('stage4', "white");
                break;
            case 4:
                this.set('one', check);
                this.set('two', check);
                this.set('stage2', "solid");
                this.set('three', check);
                this.set('stage3', "solid");
                this.set('four', 4);
                this.set('stage4', "solid");

                break;
        }

    }.on('init')
});