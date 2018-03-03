
var HomeState = {
    init: function(message) {
        this.message = message;
    },

    create: function() {
        var background = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo_no_background');
        background.anchor.setTo(0.5);
        this.stage.backgroundColor = "#370b1b";

        introLoop = self.game.add.audio('intro_loop');
        introLoop.loop = true;
        introLoop.play();

        var style = {font: '35px Arial', fill: '#fff'};
        this.game.add.text(this.game.world.centerX -150, 50, 'TOUCH TO START', style);

        if(this.message) {
            this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
        }

        background.events.onInputDown.add(function(){
            introLoop.stop();
            this.state.start('SelectorState');
        }, this);

        game.input.onTap.add(function(){
            introLoop.stop();
            this.state.start('SelectorState');
        }, this);
    }
}