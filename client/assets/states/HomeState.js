var HomeState = {
    init: function(message) {
        this.message = message;
    },

    create: function() {
        var background = this.game.add.sprite(0,0,'logo');
        background.inputEnabled = true;

        background.events.onInputDown.add(function(){
            this.state.start('GameState');
            introLoop.stop();
        }, this);

        introLoop = self.game.add.audio('intro_loop');
        introLoop.loop = true;
        introLoop.play();


        var style = {font: '35px Arial', fill: '#fff'};
        this.game.add.text(30, this.game.world.centerY + 200, 'TOUCH TO START', style);

        if(this.message) {
            this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
        }
    }
}